import { StyleSheet } from 'react-native';
import { scaledSize } from '@src/utils';
import { Palette } from '@src/utils';

export const HomeStyles = ({ backgroundColor }: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor,
      marginHorizontal: scaledSize(20),
    },
    searchWrapper: {
      width: '100%',
    },
    loaderWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    weatherRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingVertical: 20,
    },
    weatherInfo: {
      alignItems: 'flex-start',
      padding: 10,
    },
    tempText: {
      fontSize: scaledSize(60),
      fontWeight: 'bold',
    },
    weatherDesc: {
      maxWidth: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    forecastContainer: {
      flex: 1,
    },
  });
