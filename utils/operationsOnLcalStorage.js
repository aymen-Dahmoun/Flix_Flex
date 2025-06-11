import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites_list';

export const getFavorites = async () => {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
};

export const addFavorite = async (item) => {
  const favorites = await getFavorites();
  const updated = [...favorites, item];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const removeFavorite = async (itemId) => {
  const favorites = await getFavorites();
  const updated = favorites.filter(item => item.id !== itemId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const isFavorite = async (itemId) => {
  const favorites = await getFavorites();
  return favorites.some(item => item.id === itemId);
};