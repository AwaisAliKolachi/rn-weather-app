import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAppContext, useColor } from '@src/context';
import { Palette, scaledSize } from '@src/utils';
import { Text } from '@app/blueprints';
import { Icon } from '../AppIcon/AppIcon';
import { Icons } from '@src/assets';

export type HeaderCommonProps = React.PropsWithChildren & {
  title?: string;
  showBack?: boolean;
  onPressBack?: () => void;
  headerRightComponent?: () => React.ReactNode;
  onPressRight?: () => void;
};

export const HeaderCommon = React.memo(
  ({
    title = '',
    showBack = true,
    onPressBack,
    headerRightComponent,
    onPressRight,
  }: HeaderCommonProps) => {
    const { navigation, appTheme } = useAppContext();
    const { color } = useColor();
    const styles = HeaderCommonStyles(color);

    return (
      <View style={styles.container}>
        {showBack ? (
          <TouchableOpacity
            style={styles.leftButton}
            onPress={onPressBack ? onPressBack : () => navigation?.goBack()}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
            <Icon
              icon={
                appTheme === 'dark'
                  ? Icons.BACK_LIGHT_ICONS
                  : Icons.BACK_DARK_ICONS
              }
              style={styles.backIcon}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.noBackContainer} />
        )}
        <View style={styles.titleContainer}>
          <Text preset="h2" style={[styles.title]}>
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.headerRightContainer}
          onPress={onPressRight ? onPressRight : () => {}}>
          {headerRightComponent && headerRightComponent()}
        </TouchableOpacity>
      </View>
    );
  }
);

export const HeaderCommonStyles = ({ backgroundColor }: Palette) =>
  StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
      height: 60,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    leftButton: {
      paddingHorizontal: 10,
    },
    backIcon: {
      width: scaledSize(24),
      height: scaledSize(24),
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {},
    noBackContainer: {
      paddingHorizontal: 10,
    },
    headerRightContainer: {
      padding: 15,
    },
  });
