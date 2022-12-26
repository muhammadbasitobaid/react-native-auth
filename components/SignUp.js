import {Button} from '@rneui/base';
import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import * as yup from 'yup';

import {ErrorMessage, Formik} from 'formik';
import {Link} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {authenticate} from '../redux/auth/actions';
import {Dialog} from '@rneui/themed';

function SignUp({navigation}) {
  const initialValues = {
    email: '',
    password: '',
    confirmationPassword: '',
  };
  const dispatch = useDispatch();
  const storeState = useSelector(state => state);
  const authError = storeState.auth.error;
  const isAuthenticating = storeState.auth.isAuthenticating;

  const validationSchema = yup.object().shape({
    email: yup.string().required('Required').email('enter valid email'),
    password: yup.string().required('Required'),
    confirmationPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.signUpFormContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, {resetForm}) => {
            const formValues = {
              email: values.email,
              password: values.password,
              requestType: 'Signup',
            };
            console.log(formValues);
            resetForm();
            dispatch(authenticate(formValues));
          }}
          validationSchema={validationSchema}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <Text>Email: </Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
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
                style={styles.inputField}
              />
              <Text style={styles.error}>
                <ErrorMessage name="password" />
              </Text>
              <Text>Re-enter Password: </Text>
              <TextInput
                onChangeText={handleChange('confirmationPassword')}
                onBlur={handleBlur('confirmationPassword')}
                value={values.confirmationPassword}
                style={styles.inputField}
              />
              <Text style={styles.error}>
                <ErrorMessage name="confirmationPassword" />
              </Text>

              <Button onPress={handleSubmit} title="Create Account" />
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
          Already Have an Account?{' '}
          <Link to={{screen: 'Login'}} style={styles.signupLink}>
            Login!
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  titleContainer: {
    padding: 30,
  },
  title: {
    fontFamily: 'Nunito-Light',
    // fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  signUpFormContainer: {
    backgroundColor: 'white',
    marginVertical: 20,
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
  signupLink: {
    color: '#0d6efd',
  },
});
export default SignUp;
