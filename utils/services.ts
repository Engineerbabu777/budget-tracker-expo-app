import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Stores a value in AsyncStorage.
 * @param key The key under which the value is stored.
 * @param value The value to be stored (must be serializable).
 */
export const setLocalStorage = async (key: string, value: object | string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing data with key "${key}":`, error);
  }
};

/**
 * Retrieves a value from AsyncStorage.
 * @param key The key to retrieve the value for.
 * @returns The parsed value if found, otherwise null.
 */
export const getLocalStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error(`Error retrieving data with key "${key}":`, error);
    return null;
  }
};

/**
 * Removes a value from AsyncStorage.
 * @param key The key to remove from storage.
 */
export const removeLocalStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data with key "${key}":`, error);
  }
};