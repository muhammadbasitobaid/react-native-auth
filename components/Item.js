import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Dimensions, TouchableHighlight} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateTasks} from '../redux/actions';

function Item({task}) {
  const storeState = useSelector(state => state);
  const tasksState = storeState.task;
  const tasks = tasksState.tasks;
  const dispatch = useDispatch();
  const {id, title, isDone} = task;
  const updateTask = updatedTask => {
    const targetIndex = tasks.findIndex(item => item.id === id);
    const tempTask = [...tasks];
    tempTask[targetIndex] = updatedTask;
    dispatch(updateTasks(tempTask));
  };

  const setStatus = isChecked => {
    updateTask({
      id,
      title,
      isDone: isChecked,
    });
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        {isDone ? (
          <Text style={styles.crossedText}>{title}</Text>
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </View>
      <View style={styles.statusContainer}>
        <BouncyCheckbox
          size={24}
          fillColor="green"
          unfillColor="#FFFFFF"
          iconStyle={{borderColor: 'green'}}
          innerIconStyle={{borderWidth: 2}}
          isChecked={isDone}
          onPress={isChecked => {
            setStatus(isChecked);
          }}
          style={styles.statusCheckBox}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    paddingHorizontal: 15,
    paddingRight: 0,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  text: {
    fontSize: 18,
  },
  crossedText: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },

  statusContainer: {},
  statusCheckBox: {},
});
export default Item;
