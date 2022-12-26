import {Button} from '@rneui/base';
import React from 'react';
import {StyleSheet, Text, View, TextInput, Modal} from 'react-native';
import {Formik, Form, ErrorMessage} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, disableNewTaskModal} from '../redux/actions';
function AddNewTask({navigation}) {
  let isDone = false;
  const initialValues = {title: ''};
  const validationSchema = yup.object().shape({
    title: yup.string().required('Task Title is Required!'),
  });
  const dispatch = useDispatch();
  const storeState = useSelector(state => state);
  const tasksState = storeState.task;
  const tasks = tasksState.tasks;
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            const newTask = {...values, isDone: false};
            dispatch(addTask(newTask));
            dispatch(disableNewTaskModal());
          }}
          validationSchema={validationSchema}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formBody}>
              <TextInput
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                style={styles.input}
                placeholder="Enter Task Title"
              />
              <Text style={styles.errorMessage}>
                <ErrorMessage name="title" />
              </Text>

              <Button onPress={handleSubmit} title="Create New Task" />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  body: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  formBody: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginBottom: 10,
    maxWidth: '90%',
  },
  errorMessage: {
    color: 'red',
  },
  checkbox: {
    marginBottom: 10,
  },
});

export default AddNewTask;
