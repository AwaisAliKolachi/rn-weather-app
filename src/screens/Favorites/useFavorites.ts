import { useAppContext } from '@src/context';

import { FavoritesStyles } from './Favorites.style';
import { StorageKeys } from '@src/constants';
import { useEffect, useState } from 'react';
import { FavsItem } from './types';
import { Screen } from '../../navigation/appNavigation.type';

const useFavorites = () => {
  const { color, navigation, storage } = useAppContext();

  const [favoritesData, setFavoritesData] = useState<FavsItem[]>([]);

  const loadCachedData = async () => {
    const cachedFavorites = await storage.getData(StorageKeys.FAVORITES);
    if (cachedFavorites) setFavoritesData(cachedFavorites);
  };

  useEffect(() => {
    loadCachedData();
  }, []);

  const onPress = (item: FavsItem) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: Screen.HOME,
          params: { location: item },
        },
      ],
    });
  };
  const onPressDelete = (item: FavsItem) => {
    const updatedFavorites = favoritesData.filter(
      fav => fav.latitude !== item.latitude || fav.longitude !== item.longitude
    );
    setFavoritesData(updatedFavorites);
    storage.setData(StorageKeys.FAVORITES, updatedFavorites);
  };

  return {
    color,
    navigation,
    styles: FavoritesStyles(color),
    favoritesData,
    onPress,
    onPressDelete,
  };
};

export default useFavorites;
