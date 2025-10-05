import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { StorageKeys } from '@src/constants';
import { color, Palette, Theme } from '@src/utils';
import { storage } from './storage';

export interface AppThemeContextType {
  appTheme: Theme;
  setAppTheme: (theme: Theme) => void;
  color: Palette;
}

export const AppThemeContext = createContext<AppThemeContextType | undefined>(
  undefined
);

export const useColor = () => {
  const context = useContext(AppThemeContext);
  if (!context) throw Error('useColor must be used inside AppThemeContext');
  return context;
};

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const colorScheme = useColorScheme();

  const [appTheme, setTheme] = useState<Theme>(colorScheme);

  const setAppTheme = useCallback((theme: Theme) => {
    storage.setData(StorageKeys.APP_THEME, theme);
    setTheme(theme);
  }, []);

  const value: AppThemeContextType = useMemo(() => {
    return {
      appTheme,
      color: color[appTheme || 'light'],
      setAppTheme,
    };
  }, [appTheme, setAppTheme]);

  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const storedTheme = await storage.getData(StorageKeys.APP_THEME);
        if (storedTheme) {
          setTheme(storedTheme as Theme);
        } else {
          setTheme(colorScheme);
        }
      } catch (error) {
        console.error('Error loading theme from storage:', error);
        setTheme(colorScheme);
      }
    };

    loadThemeFromStorage();
  }, [colorScheme]);

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};
