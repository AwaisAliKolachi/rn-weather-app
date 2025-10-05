import AsyncStorage from '@react-native-async-storage/async-storage';

import type { STORAGES_KEY } from '@src/constants';
import { logger } from '@src/utils';

export const getData = async (key: STORAGES_KEY) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      if (data === 'true' || data === 'false') {
        return data === 'true';
      }
      if (!isNaN(Number(data)) && String(Number(data)) === data) {
        return Number(data);
      }
      try {
        const parseData = JSON.parse(data);
        return parseData;
      } catch (e) {
        return data;
      }
    }
    return undefined;
  } catch (error) {
    logger('storage getData', error);
    return undefined;
  }
};

export const setData = async (key: STORAGES_KEY, value: any) => {
  try {
    let valueToStore: string;

    if (typeof value === 'boolean' || typeof value === 'number') {
      valueToStore = String(value);
    } else if (typeof value === 'string') {
      valueToStore = value;
    } else {
      valueToStore = JSON.stringify(value);
    }

    await AsyncStorage.setItem(key, valueToStore);
  } catch (error) {
    logger('storage setData', error);
  }
};

export const getStorageKey = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    logger('storage getStorageKey', error);
    return [];
  }
};

export const deleteStorage = async (key: STORAGES_KEY) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    logger('storage deleteStorage', error);
    return false;
  }
};

export const storage = {
  deleteStorage,
  getData,
  getStorageKey,
  setData,
};

export type Storage = typeof storage;
