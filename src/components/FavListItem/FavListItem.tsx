import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@app/blueprints';
import { FavsItem } from '@src/screens/Favorites/types';
import { Icon } from '../AppIcon/AppIcon';
import { Icons } from '@src/assets';
import { Palette, scaledSize } from '@src/utils';

interface FavListItemProps {
  item: FavsItem;
  color: any;
  onPress: (item: FavsItem) => void;
  onPressDelete: (item: FavsItem) => void;
}

export const FavListItem: React.FC<FavListItemProps> = ({
  item,
  color,
  onPress,
  onPressDelete,
}) => {
  const styles = FavListItemStyles(color);
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[
        styles.favItem,
        {
          backgroundColor: color.secondaryColor,
        },
      ]}>
      <View style={styles.favCityCountryContainer}>
        <Text preset="h3">{item.city}</Text>
        <Text preset="h5">{item.country}</Text>
      </View>

      <TouchableOpacity
        onPress={() => onPressDelete(item)}
        style={styles.deleteContainer}>
        <Icon icon={Icons.DELETE_ICONS} style={styles.iconDelete} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const FavListItemStyles = ({}: Palette) =>
  StyleSheet.create({
    favItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      borderRadius: scaledSize(12),
      padding: 10,
    },
    favCityCountryContainer: {
      flex: 1,
    },
    forecastIconWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    deleteContainer: {
      marginRight: 10,
    },
    iconDelete: {
      width: scaledSize(24),
      height: scaledSize(24),
    },
  });
