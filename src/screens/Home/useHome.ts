import { useAppContext } from '@src/context';
import { HomeStyles } from './Home.style';
import useLocation from '@src/hooks/useLocation';
import {
  WeatherResult,
  ForecastResult,
  WeatherUnits,
  WeatherParams,
  ForecastParams,
  SearchResult,
} from '@src/services/models';
import { AppConfig, StorageKeys } from '@src/constants';
import { useState, useEffect } from 'react';
import { Location } from 'react-native-get-location';
import { FavsItem } from '../Favorites/types';
import { useRoute } from '@react-navigation/native';
import { HomeRoute } from '../../navigation/appNavigation.type';

const useHome = () => {
  const { color, navigation, appTheme, setAppTheme, services, storage } =
    useAppContext();
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

  const toggleTheme = () => {
    setAppTheme(appTheme === 'light' ? 'dark' : 'light');
  };

  const loadCachedData = async () => {
    const cachedWeather = await storage.getData(StorageKeys.WEATHER_CACHE);
    const cachedForecast = await storage.getData(StorageKeys.FORECAST_CACHE);
    const cachedFavorites = await storage.getData(StorageKeys.FAVORITES);

    if (cachedWeather) setWeatherData(cachedWeather);
    if (cachedForecast) setForecastData(cachedForecast);
    if (cachedFavorites) setFavoritesData(cachedFavorites);
  };

  const fetchAllWeatherData = async (currentLocation: Location) => {
    if (!currentLocation?.latitude || !currentLocation?.longitude) return;

    setIsFetchingWeather(true);

    const commonParams: WeatherParams = {
      lat: currentLocation.latitude,
      lon: currentLocation.longitude,
      units: WeatherUnits.METRIC,
      appId: AppConfig.OPEN_WEATHER_API_KEY,
    };
    const forecastParams: ForecastParams = {
      q: `${currentLocation.latitude},${currentLocation.longitude}`,
      days: 8,
      aqi: 'no',
      alerts: 'no',
      key: AppConfig.WEATHER_API_KEY,
    };

    const weatherPromise = services
      .getWeather(commonParams)
      .then(async res => {
        setWeatherData(res);
        await storage.setData(StorageKeys.WEATHER_CACHE, res);
      })
      .catch(err => {
        console.error('Current Weather Fetch Error:', err);
      });

    const forecastPromise = services
      .getForecast(forecastParams)
      .then(async res => {
        if (res?.forecast?.forecastday?.length) {
          res.forecast.forecastday = res.forecast.forecastday.slice(1); // omit 0 index bcz same day
        }
        setForecastData(res);
        await storage.setData(StorageKeys.FORECAST_CACHE, res);
      })
      .catch(err => {
        console.error('Forecast Fetch Error:', err);
      });

    Promise.allSettled([weatherPromise, forecastPromise]).finally(() => {
      setIsFetchingWeather(false);
    });
  };

  useEffect(() => {
    loadCachedData();
  }, []);

  useEffect(() => {
    if (location) {
      fetchAllWeatherData(location);
    }
  }, [location, services]);

  const onSearchSelect = (city: SearchResult) => {
    navigation.setParams({ location: undefined });
    const params = {
      latitude: city.lat,
      longitude: city.lon,
    };
    setLocation(params as Location);
  };

  const isFavorite = () => {
    if (!location) return false;

    return favoritesData.some(
      fav =>
        fav.latitude === location.latitude &&
        fav.longitude === location.longitude
    );
  };

  const onPressFavorite = async () => {
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

    let updatedFavorites: FavsItem[];
    if (exists) {
      updatedFavorites = favoritesData.filter(
        fav =>
          fav.latitude !== payload.latitude ||
          fav.longitude !== payload.longitude
      );
    } else {
      updatedFavorites = [...favoritesData, payload];
    }

    setFavoritesData(updatedFavorites);
    await storage.setData(StorageKeys.FAVORITES, updatedFavorites);
  };

  return {
    color,
    navigation,
    styles: HomeStyles(color),
    appTheme,
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
