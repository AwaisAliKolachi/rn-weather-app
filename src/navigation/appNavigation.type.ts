import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FavsItem } from '@src/screens/Favorites/types';

export enum Screen {
  HOME = 'HOME',
  FAVORITES = 'FAVORITES',
}

export type NavStackParams = {
  [Screen.HOME]: HomeParams;
  [Screen.FAVORITES]: undefined;
};

export type HomeParams = {
  location?: FavsItem;
};

export type HomeRoute = RouteProp<NavStackParams, Screen.HOME>;

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;
