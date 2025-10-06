import { Icons } from '@src/assets';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../AppIcon/AppIcon';
import { Palette, scaled } from '@src/utils';
import { useAppContext, useColor } from '@src/context';
import { Text } from '@app/blueprints';
import { Screen } from '../../navigation/appNavigation.type';

interface HeaderHomeProps {
  title?: string;
  toggleTheme?: () => void;
  onPressFavorites?: () => void;
}

export const HeaderHome: React.FC<HeaderHomeProps> = ({
  title = 'Home',
  toggleTheme,
}) => {
  const { color, isDark } = useColor();
  const { navigation } = useAppContext();
  const styles = HeaderHomeStyles(color);
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text preset="h2">{title}</Text>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => navigation.navigate(Screen.FAVORITES)}>
          <Icon
            icon={isDark ? Icons.FAVS_LIGHT_ICONS : Icons.FAVS_DARK_ICONS}
            style={styles.iconFav}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme}>
          <Icon
            icon={isDark ? Icons.LIGHT_MODE_ICONS : Icons.DARK_MODE_ICONS}
            style={styles.iconTheme}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HeaderHomeStyles = ({ backgroundColor, borderColor }: Palette) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 6,
      backgroundColor: backgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      paddingHorizontal: 20,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    iconTheme: {
      ...scaled(28),
    },
    iconFav: {
      ...scaled(22),
    },
  });
