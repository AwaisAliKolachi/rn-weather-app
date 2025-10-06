import React from 'react';
import { IndicatorView } from '@app/blueprints';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context';
import { AppNavigation, navigationRef } from './navigation/AppNavigation';
import { loader } from './utils';

export const MainApp = () => {
  return (
    <ThemeProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigation />
        <IndicatorView isLoading={false} ref={loader} />
      </NavigationContainer>
    </ThemeProvider>
  );
};
