import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import moment from 'moment';
import { ForecastDayItem } from '@src/services/models';
import { Palette, scaledSize } from '@src/utils';

interface ForecastItemProps {
  item: ForecastDayItem;
  color: any;
}

export const ForecastItem: React.FC<ForecastItemProps> = ({ item, color }) => {
  const styles = ForecastItemStyles(color);
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
        <Text preset="h5">{item.day.maxtemp_c} °C</Text>
        <Text preset="h5">{item.day.mintemp_c} °C</Text>
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
      alignItems: 'flex-end',
      flex: 1,
      gap: 10,
    },
  });
