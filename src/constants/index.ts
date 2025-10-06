import { SVGIcons } from '@src/assets';
import { Theme } from '@src/utils';
import { LocationErrorCode } from 'react-native-get-location';

export * from './config';
export * from './platform';
export * from './storageKeys';

export const getLocationErrorMessage = (
  code: LocationErrorCode | undefined
): string | undefined => {
  if (!code) {
    return undefined;
  }

  switch (code) {
    case 'UNAUTHORIZED':
      return 'Location permission is required to use this feature. Please go to your device settings and grant access.';
    case 'UNAVAILABLE':
      return 'Location services are currently disabled on your device. Please enable them in your device settings.';
    case 'TIMEOUT':
      return "We couldn't determine your location in time. Please check your signal or try again.";
    case 'CANCELLED':
      return 'The location request was interrupted. Please try again.';
    default:
      return 'An unknown error occurred while trying to get your location.';
  }
};

export const weatherIconsMap = (
  theme: Theme = 'light',
  code: string
): SVGIcons => {
  // Define the icon maps inside the function (or outside as constants)
  const darkIcons = {
    '01d': SVGIcons.CLEAR_SKY_DAY_DARK,
    '01n': SVGIcons.CLEAR_SKY_NIGHT_DARK,
    '02d': SVGIcons.FEW_CLOUDS_DAY_DARK,
    '02n': SVGIcons.FEW_CLOUDS_NIGHT_DARK,
    '03d': SVGIcons.SCATTERED_CLOUDS_DAY_DARK,
    '03n': SVGIcons.SCATTERED_CLOUDS_NIGHT_DARK,
    '04d': SVGIcons.BROKEN_CLOUDS_DAY_DARK,
    '04n': SVGIcons.BROKEN_CLOUDS_NIGHT_DARK,
    '09d': SVGIcons.SHOWER_RAIN_DAY_DARK,
    '09n': SVGIcons.SHOWER_RAIN_NIGHT_DARK,
    '10d': SVGIcons.RAIN_DAY_DARK,
    '10n': SVGIcons.RAIN_NIGHT_DARK,
    '11d': SVGIcons.THUNDER_STORM_DAY_DARK,
    '11n': SVGIcons.THUNDER_STORM_NIGHT_DARK,
    '13d': SVGIcons.SNOW_DAY_DARK,
    '13n': SVGIcons.SNOW_NIGHT_DARK,
    '50d': SVGIcons.MIST_DAY_DARK,
    '50n': SVGIcons.MIST_NIGHT_DARK,
  };

  const lightIcons = {
    '01d': SVGIcons.CLEAR_SKY_DAY_LIGHT,
    '01n': SVGIcons.CLEAR_SKY_NIGHT_LIGHT,
    '02d': SVGIcons.FEW_CLOUDS_DAY_LIGHT,
    '02n': SVGIcons.FEW_CLOUDS_NIGHT_LIGHT,
    '03d': SVGIcons.SCATTERED_CLOUDS_DAY_LIGHT,
    '03n': SVGIcons.SCATTERED_CLOUDS_NIGHT_LIGHT,
    '04d': SVGIcons.BROKEN_CLOUDS_DAY_LIGHT,
    '04n': SVGIcons.BROKEN_CLOUDS_NIGHT_LIGHT,
    '09d': SVGIcons.SHOWER_RAIN_DAY_LIGHT,
    '09n': SVGIcons.SHOWER_RAIN_NIGHT_LIGHT,
    '10d': SVGIcons.RAIN_DAY_LIGHT,
    '10n': SVGIcons.RAIN_NIGHT_LIGHT,
    '11d': SVGIcons.THUNDER_STORM_DAY_LIGHT,
    '11n': SVGIcons.THUNDER_STORM_NIGHT_LIGHT,
    '13d': SVGIcons.SNOW_DAY_LIGHT,
    '13n': SVGIcons.SNOW_NIGHT_LIGHT,
    '50d': SVGIcons.MIST_DAY_LIGHT,
    '50n': SVGIcons.MIST_NIGHT_LIGHT,
  };

  // Determine which map to use
  const iconMap = theme === 'dark' ? darkIcons : lightIcons;

  // Return the specific icon for the provided 'code'
  return iconMap[code as keyof typeof iconMap];
};
