import React from 'react';
import { FlatList, View } from 'react-native';
import useFavorites from './useFavorites';
import { BaseLayout, FavListItem, HeaderCommon } from '@src/components';
import { Text } from '@app/blueprints';
import { FavsItem } from './types';

const FavoritesScreen = () => {
  const { color, styles, favoritesData, onPress, onPressDelete } =
    useFavorites();

  const renderFavItem = ({ item }: { item: FavsItem }) => (
    <FavListItem
      item={item}
      color={color}
      onPress={onPress}
      onPressDelete={onPressDelete}
    />
  );

  return (
    <BaseLayout>
      <HeaderCommon title="Favorites" />
      <View style={styles.container}>
        <View style={styles.favoritesContainer}>
          <FlatList
            data={favoritesData}
            renderItem={renderFavItem}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyListContainer}>
                <Text preset="h3">No favorites yet!</Text>
              </View>
            )}
          />
        </View>
      </View>
    </BaseLayout>
  );
};

export default React.memo(FavoritesScreen);
