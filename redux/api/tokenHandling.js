import AsyncStorage from '@react-native-async-storage/async-storage';
export const setStringValue = async value => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // save error
  }
};

export const getMyStringValue = async () => {
  z;
  try {
    const token = await AsyncStorage.getItem('@token');
    console.log('token in token handling', token);

    // const value = await token;
    return JSON.parse(token);
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
