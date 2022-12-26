import React, {Children, useState} from 'react';
import {Modal, View, Text, StyleSheet, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {disableNewTaskModal, disableUpdateTaskModal} from '../redux/actions';
import {Button} from '@rneui/base';
import {Formik, Form, ErrorMessage} from 'formik';
import * as yup from 'yup';
import {addTask} from '../redux/actions';

function UpdateTaskModal({children}) {
  const storeState = useSelector(state => state);
  const tasksState = storeState.task;
  const tasks = tasksState.tasks;

  const isUpdateTaskModalEnable = tasksState.isUpdateTaskModalEnable;

  const dispatch = useDispatch();

  const initialValues = {title: ''};
  const validationSchema = yup.object().shape({
    title: yup.string().required('Task Title is Required!'),
  });
  return (
    <Modal transparent visible={isUpdateTaskModalEnable}>
      <View style={styles.modalBackGround}>
        <View style={styles.modalContainer}>
          {children}
          <Button
            onPress={() => dispatch(disableUpdateTaskModal())}
            title="Cancel"></Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    padding: 30,
    // backgroundColor: 'white',
  },
  container: {
    // flex: 1,
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

export default UpdateTaskModal;
