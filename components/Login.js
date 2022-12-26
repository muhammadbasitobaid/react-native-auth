import {ErrorMessage, Formik} from 'formik';
import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authenticate} from '../redux/auth/actions';
import {Link} from '@react-navigation/native';
import * as yup from 'yup';
import {Dialog} from '@rneui/themed';
function Login() {
  const dispatch = useDispatch();
  const storeState = useSelector(state => state);
  const authError = storeState.auth.error;

  const isAuthenticating = storeState.auth.isAuthenticating;

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    email: yup.string().required('Required').email('enter valid email'),
    password: yup.string().required('Required'),
  });
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.loginFormContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, {resetForm}) => {
            dispatch(authenticate(values));
            resetForm();
          }}
          validationSchema={validationSchema}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <Text>Email: </Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Enter You email"
                style={styles.inputField}
              />
              <Text style={styles.error}>
                <ErrorMessage name="email" />
              </Text>
              <Text>Password: </Text>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Enter You password"
                style={styles.inputField}
              />
              <Text style={styles.error}>
                <ErrorMessage name="password" />
              </Text>

              <Button onPress={handleSubmit} title="Login" />
              {authError && (
                <View>
                  <Text style={styles.error}>{authError}!</Text>
                </View>
              )}
              {isAuthenticating && (
                <View style={styles.authLoaderContainer}>
                  <Dialog.Loading />
                  <Text style={styles.loaderText}>Authenticating</Text>
                </View>
              )}
            </View>
          )}
        </Formik>
      </View>
      <View>
        <Text>
          Don't Have an Account?{' '}
          <Link to={{screen: 'SignUp'}} style={styles.signupLink}>
            SignUp
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    backgroundColor: 'white',
    padding: 30,
  },
  title: {
    fontFamily: 'Nunito-Light',
    // fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    backgroundColor: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginFormContainer: {
    marginVertical: 20,
    backgroundColor: 'white',
    padding: 30,
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  inputField: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  error: {
    marginVertical: 5,
    color: 'red',
  },
  authLoaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    marginLeft: 20,
    fontWeight: 'bold',
  },
  signupLink: {
    color: '#0d6efd',
  },
});

export default Login;
