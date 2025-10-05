import { useAppContext } from '@src/context';
import { HomeStyles } from './Home.style';
import useLocation from '@src/hooks/useLocation';
import {
  WeatherResult,
  ForecastResult,
  WeatherUnits,
  SearchResult,
} from '@src/services/models';
import { AppConfig, StorageKeys } from '@src/constants';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Location } from 'react-native-get-location';
import { FavsItem } from '../Favorites/types';
import { useRoute } from '@react-navigation/native';
import { HomeRoute } from '../../navigation/appNavigation.type';

const useHome = () => {
  const {
    color,
    navigation,
    appTheme,
    setAppTheme,
    services,
    storage,
    isLight,
    loader,
  } = useAppContext();
  const route = useRoute<HomeRoute>();
  const routeLocation = route?.params?.location;
  const {
    location,
    setLocation,
    isFetchingLocation,
    locationError,
    getLocation,
  } = useLocation(routeLocation);

  const [weatherData, setWeatherData] = useState<WeatherResult>();
  const [forecastData, setForecastData] = useState<ForecastResult>();
  const [favoritesData, setFavoritesData] = useState<FavsItem[]>([]);
  const [isFetchingWeather, setIsFetchingWeather] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setAppTheme(isLight ? 'dark' : 'light');
  }, [isLight, setAppTheme]);

  const loadCachedData = useCallback(async () => {
    const [cachedWeather, cachedForecast, cachedFavorites] = await Promise.all([
      storage.getData(StorageKeys.WEATHER_CACHE),
      storage.getData(StorageKeys.FORECAST_CACHE),
      storage.getData(StorageKeys.FAVORITES),
    ]);

    if (cachedWeather) setWeatherData(cachedWeather);
    if (cachedForecast) setForecastData(cachedForecast);
    if (cachedFavorites) setFavoritesData(cachedFavorites);
  }, [storage]);

  const fetchAllWeatherData = useCallback(
    async (currentLocation: Location) => {
      if (!currentLocation?.latitude || !currentLocation?.longitude) return;

      setIsFetchingWeather(true);

      const [weatherRes, forecastRes] = await Promise.allSettled([
        services.getWeather({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
          units: WeatherUnits.METRIC,
          appId: AppConfig.OPEN_WEATHER_API_KEY,
        }),
        services.getForecast({
          q: `${currentLocation.latitude},${currentLocation.longitude}`,
          days: 8,
          aqi: 'no',
          alerts: 'no',
          key: AppConfig.WEATHER_API_KEY,
        }),
      ]);

      if (weatherRes.status === 'fulfilled') {
        setWeatherData(weatherRes.value);
        storage.setData(StorageKeys.WEATHER_CACHE, weatherRes.value);
      }

      if (forecastRes.status === 'fulfilled') {
        const res = forecastRes.value;
        if (res?.forecast?.forecastday?.length)
          res.forecast.forecastday = res.forecast.forecastday.slice(1); // Remove 0 index, cuz its same day
        setForecastData(res);
        storage.setData(StorageKeys.FORECAST_CACHE, res);
      }

      setIsFetchingWeather(false);
    },
    [services]
  );

  useEffect(() => {
    loadCachedData();
  }, []);

  useEffect(() => {
    if (location) {
      fetchAllWeatherData(location);
    }
  }, [location, services]);

  useEffect(() => {
    if (isFetchingLocation || isFetchingWeather) {
      loader.current?.show();
    } else {
      loader.current?.hide();
    }
  }, [isFetchingLocation, isFetchingWeather]);

  const onSearchSelect = useCallback(
    (city: SearchResult) => {
      navigation.setParams({ location: undefined });
      const params = {
        latitude: city.lat,
        longitude: city.lon,
      };
      setLocation(params as Location);
    },
    [navigation, setLocation]
  );

  const isFavorite = useMemo(() => {
    if (!location) return false;
    return favoritesData.some(
      fav =>
        fav.latitude === location.latitude &&
        fav.longitude === location.longitude
    );
  }, [favoritesData, location]);

  const onPressFavorite = useCallback(async () => {
    if (!location || !forecastData?.location?.name) return;

    const payload: FavsItem = {
      latitude: location.latitude,
      longitude: location.longitude,
      city: forecastData.location.name,
      country: forecastData.location.country,
    };

    const exists = favoritesData.some(
      fav =>
        fav.latitude === payload.latitude && fav.longitude === payload.longitude
    );

    const updatedFavorites = exists
      ? favoritesData.filter(
          fav =>
            fav.latitude !== payload.latitude ||
            fav.longitude !== payload.longitude
        )
      : [...favoritesData, payload];

    setFavoritesData(updatedFavorites);
    await storage.setData(StorageKeys.FAVORITES, updatedFavorites);
  }, [favoritesData, forecastData, location, storage]);

  return {
    color,
    navigation,
    styles: HomeStyles(color),
    appTheme,
    isLight,
    toggleTheme,
    location,
    isFetchingLocation,
    locationError,
    getLocation,
    fetchWeather: fetchAllWeatherData,
    isFetchingWeather,
    weatherData,
    forecastData,
    onSearchSelect,
    isFavorite,
    onPressFavorite,
  };
};

export default useHome;
