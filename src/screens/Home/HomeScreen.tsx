import React from 'react';
import { FlatList, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@app/blueprints';
import useHome from './useHome';
import {
  BaseLayout,
  ForecastItem,
  HeaderHome,
  Icon,
  SearchInput,
  SvgIcon,
} from '@src/components';
import { scaled } from '@src/utils';
import { weatherIconsMap } from '@src/constants';
import moment from 'moment';
import { Icons } from '@src/assets';

const HomeScreen = () => {
  const {
    color,
    styles,
    appTheme,
    toggleTheme,
    weatherData,
    forecastData,
    onSearchSelect,
    isFetchingLocation,
    isFetchingWeather,
    isFavorite,
    onPressFavorite,
  } = useHome();

  const renderWeatherIcon = (size: number) => {
    const iconName = weatherIconsMap(
      appTheme,
      weatherData?.weather?.[0]?.icon ?? ''
    );
    return iconName ? <SvgIcon icon={iconName} {...scaled(size)} /> : null;
  };

  return (
    <BaseLayout>
      <HeaderHome
        title={moment().format('ddd, MMM D')}
        toggleTheme={toggleTheme}
      />
      <View style={styles.searchWrapper}>
        <SearchInput
          placeholder="Search By City"
          onSelect={onSearchSelect}
          disabled={isFetchingLocation || isFetchingWeather}
        />
      </View>
      {isFetchingLocation || isFetchingWeather ? (
        <View style={{}}>
          <Text preset="small">Loading...</Text>
        </View>
      ) : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text preset="h1">{forecastData?.location?.name}</Text>
              <Text preset="h3">{forecastData?.location?.country}</Text>
            </View>
            <TouchableOpacity onPress={onPressFavorite}>
              <Icon
                icon={
                  isFavorite()
                    ? appTheme === 'light'
                      ? Icons.FAV_ACTIVE_DARK_ICONS
                      : Icons.FAV_ACTIVE_LIGHT_ICONS
                    : appTheme === 'light'
                      ? Icons.FAV_INACTIVE_DARK_ICONS
                      : Icons.FAV_INACTIVE_LIGHT_ICONS
                }
                style={{ ...scaled(20) }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.weatherRow}>
            {renderWeatherIcon(100)}
            <View style={styles.weatherInfo}>
              {weatherData?.main.temp && (
                <Text style={styles.tempText}>
                  {Math.round(weatherData.main.temp)}
                  °C
                </Text>
              )}
              <Text preset="h4" style={styles.weatherDesc}>
                {weatherData?.weather?.[0]?.description.toLocaleUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.forecastContainer}>
            <FlatList
              data={forecastData?.forecast?.forecastday}
              renderItem={({ item }) => (
                <ForecastItem item={item} color={color} />
              )}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default React.memo(HomeScreen);
