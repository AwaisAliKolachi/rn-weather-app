import { ColorSchemeName } from 'react-native';

const commonColors = {
  overlay: '#00000040',
  daySky: '#87CEEB', // Sky Blue
  nightSky: '#1B2735', // Deep Night Blue
  placeholder: '#8e95a3ff', // Cloudy Gray
};

export const color = {
  light: {
    ...commonColors,
    backgroundColor: '#EAF6FF',
    primaryColor: '#4A90E2',
    secondaryColor: '#D0E4F5',
    textColor: '#1C1C1C',
    textFieldBg: '#FFFFFF',
    borderColor: '#BFD6E8',
  },
  dark: {
    ...commonColors,
    backgroundColor: '#0D1B2A',
    primaryColor: '#64B5F6',
    secondaryColor: '#1E2A38',
    textColor: '#E3F2FD',
    textFieldBg: '#1A2634',
    borderColor: '#2F3C4C',
  },
};

export type Palette = (typeof color)[keyof typeof color];
export type Theme = ColorSchemeName | keyof typeof color;
