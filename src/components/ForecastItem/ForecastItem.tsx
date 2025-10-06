import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import moment from 'moment';
import { ForecastDayItem } from '@src/services/models';
import { Palette, scaledSize } from '@src/utils';
import { Icon } from '../AppIcon/AppIcon';
import { Icons } from '@src/assets';

interface ForecastItemProps {
  item: ForecastDayItem;
  color: any;
}

export const ForecastItem: React.FC<ForecastItemProps> = ({ item, color }) => {
  const styles = ForecastItemStyles(color);
  const formatTemp = (temp: number) => {
    const [intPart, decPart] = temp.toFixed(1).split('.');
    const padded =
      intPart?.length === 1
        ? `  ${intPart}.${decPart}`
        : `${intPart}.${decPart}`;
    return `${padded} °C`;
  };
  return (
    <View
      style={[
        styles.forecastItem,
        {
          backgroundColor: color.secondaryColor,
        },
      ]}>
      <View style={styles.forecastDay}>
        <Text preset="h4">{moment(item.date).format('dddd')}</Text>
        <Text preset="h5">{moment(item.date).format('MMM D')}</Text>
      </View>

      <View style={styles.forecastIconWrapper}>
        <View style={styles.forecastIcon}>
          <Image
            source={{ uri: 'https:' + item.day.condition.icon }}
            style={styles.forecastImage}
          />
          <Text preset="h5">{item.day.condition.text}</Text>
        </View>
      </View>

      <View style={styles.forecastTemp}>
        <View style={styles.forecastTempRow}>
          <Icon icon={Icons.TEMP_MAX_ICONS} style={styles.forecastTempIcon} />
          <Text preset="h5">{formatTemp(item.day.maxtemp_c)}</Text>
        </View>
        <View style={styles.forecastTempRow}>
          <Icon icon={Icons.TEMP_MIN_ICONS} style={styles.forecastTempIcon} />
          <Text preset="h5">{formatTemp(item.day.mintemp_c)}</Text>
        </View>
      </View>
    </View>
  );
};

const ForecastItemStyles = ({}: Palette) =>
  StyleSheet.create({
    forecastItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      borderRadius: scaledSize(12),
      padding: 10,
    },
    forecastDay: {
      flex: 1,
    },
    forecastIconWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    forecastIcon: {
      alignItems: 'center',
    },
    forecastImage: {
      width: scaledSize(30),
      height: scaledSize(30),
    },
    forecastTemp: {
      alignItems: 'flex-start',
      flex: 1,
      gap: 10,
    },
    forecastTempRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 6,
    },
    forecastTempIcon: {
      width: scaledSize(8),
      height: scaledSize(8),
    },
  });
