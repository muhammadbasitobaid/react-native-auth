import {Button} from '@rneui/base';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Modal} from 'react-native';
import {Formik, Form, ErrorMessage} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  disableNewTaskModal,
  disableUpdateTaskModal,
  updateTasks,
} from '../redux/actions';
import {CheckBox} from '@rneui/themed';

function Update() {
  let isDone = false;
  const validationSchema = yup.object().shape({
    title: yup.string().required('Task Title is Required!'),
  });
  const dispatch = useDispatch();
  const storeState = useSelector(state => state);
  const tasksState = storeState.task;
  const tasks = tasksState.tasks;
  const idToBeUpdate = tasksState.idToBeUpdate;

  const task = tasks.filter(item => item.id === idToBeUpdate)[0];

  const [isChecked, setIsChecked] = useState(task.isDone);
  const initialValues = {title: task.title};
  const updateTask = updatedTask => {
    const targetIndex = tasks.findIndex(item => item.id === task.id);
    const tempTask = [...tasks];
    tempTask[targetIndex] = updatedTask;
    dispatch(updateTasks(tempTask));
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            const newTask = {
              id: task.id,
              isDone: isChecked,
              title: values.title,
            };
            updateTask(newTask);
            dispatch(disableUpdateTaskModal());
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
              <CheckBox
                center
                title="is it Done?"
                checked={isChecked}
                onPress={() => {
                  setIsChecked(prevState => !prevState);
                }}
              />
              <Text style={styles.errorMessage}>
                <ErrorMessage name="title" />
              </Text>

              <Button onPress={handleSubmit} title="Update" />
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
  formBody: {},

  input: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
  },
  checkbox: {
    marginBottom: 10,
  },
});
export default Update;
