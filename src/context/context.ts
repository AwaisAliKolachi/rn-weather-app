import { loader } from '@src/utils';

import { storage } from './storage';
import { useColor } from './ThemeContext';
import { AppNavigationProp } from '../navigation/appNavigation.type';
import {
  useWithNavigation,
  WithNavigation,
} from '../navigation/withNavigation';
import { appServices } from '../services/appServices';

export const useAppContextOnly = () => {
  const color = useColor();

  return {
    loader: loader,
    storage,
    services: appServices,
    ...color,
  };
};

export type AppContextType = ReturnType<typeof useAppContextOnly>;

export const useAppContext = (): WithNavigation<
  AppNavigationProp,
  AppContextType
> => {
  return useWithNavigation<AppNavigationProp, AppContextType>(
    useAppContextOnly()
  );
};
