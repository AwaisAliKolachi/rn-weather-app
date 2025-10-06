import { StyleSheet } from 'react-native';

import { Palette, scaledSize } from '@src/utils';

export const FavoritesStyles = ({}: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: scaledSize(20),
    },
    favoritesContainer: {
      flex: 1,
    },
    emptyListContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: scaledSize(50),
    },
  });
