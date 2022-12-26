import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/auth/actions';
import {clearAll} from '../redux/api/tokenHandling';

function Header() {
  const storeState = useSelector(state => state);
  const authState = storeState.auth;
  const isAuthenticated = authState.authenticated;
  const dispatch = useDispatch();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>All Tasks</Text>
      <View style={styles.logout}>
        <Pressable
          onPress={() => {
            dispatch(logout());
            clearAll();
          }}>
          <Feather name={'log-out'} size={24} color="grey" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingLeft: 64,
  },
  headerText: {
    textAlign: 'center',
    // backgroundColor: 'white',
    // fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Nunito-Light',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    // margin: 10,
    marginRight: 30,
    // marginLeft: 0,
    // paddingLeft: 0,
  },
});
export default Header;
