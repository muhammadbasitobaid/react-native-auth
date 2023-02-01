import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import Update from './components/Update';
import {Provider, useSelector} from 'react-redux';
import store, {persistor} from './store';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

function App() {
  const storeState = useSelector(state => state);
  const authState = storeState.auth;
  const isAuthenticated = authState.authenticated;

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Update" component={Update} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
