import AsyncStorage from '@react-native-async-storage/async-storage';
export const setStringValue = async value => {
  try {
    await AsyncStorage.setItem('@token', value);
  } catch (e) {
    // save error
  }
};

export const getMyStringValue = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    // const value = await token;
    return token;
    if (token !== null) {
    }
    // return
  } catch (e) {
    // read error
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};
