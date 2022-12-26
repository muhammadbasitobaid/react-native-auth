import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Header from './Header';
import Item from './Item';
import {FAB} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import NewTaskModalPopUp from './NewTaskModalPopUp';
import {useEffect, useState} from 'react';
import {
  enableNewTaskModal,
  enableUpdateTaskModal,
  updateTasks,
} from '../redux/actions';
import {SwipeListView} from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddNewTask from './AddNewTask';
import Update from './Update';
import UpdateTaskModal from './UpdateTaskModal';
import {getMyStringValue} from '../redux/api/tokenHandling';
import {fetchProducts} from '../redux/products/actions';

function Home({navigation}) {
  const storeState = useSelector(state => state);
  const tasksState = storeState.task;
  const tasks = tasksState.tasks;
  const isNewTaskModalEnable = tasksState.isNewTaskModalEnable;
  const isUpdateTaskModalEnable = tasksState.isUpdateTaskModalEnable;
  const StoreStyle = ['color: red', 'font-weight : bold'];

  const dispatch = useDispatch();
  // const getToken = async () => {
  //   return await getMyStringValue();
  // };
  let token = getMyStringValue();

  const deleteTask = delTask => {
    const finalTaskList = tasks.filter(task => task.id != delTask.id);
    dispatch(updateTasks(finalTaskList));
  };
  const handleUpdate = item => {
    dispatch(enableUpdateTaskModal(item.id));
  };
  useEffect(() => {
    dispatch(fetchProducts());
  });

  return (
    <View style={styles.container}>
      <NewTaskModalPopUp enable={isNewTaskModalEnable}>
        <AddNewTask />
      </NewTaskModalPopUp>
      <UpdateTaskModal enable={isUpdateTaskModalEnable}>
        <Update></Update>
      </UpdateTaskModal>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.body}>
        <View style={styles.taskList}>
          <SwipeListView
            data={tasks}
            renderItem={(data, rowMap) => (
              <View style={styles.rowFront}>
                <TouchableHighlight>
                  <Item task={data.item} />
                </TouchableHighlight>
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                <Pressable
                  onPress={() => {
                    deleteTask(data.item);
                  }}
                  style={styles.delete}>
                  <View style={styles.deleteText}>
                    <FontAwesome5 name={'trash'} size={20} color="white" />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    handleUpdate(data.item);

                    rowMap[data.item.id].closeRow();
                  }}
                  style={styles.update}>
                  <View style={styles.deleteText}>
                    <FontAwesome5 name={'pen'} size={20} color="white" />
                  </View>
                </Pressable>
              </View>
            )}
            leftOpenValue={60}
            rightOpenValue={-60}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <FAB
        visible={true}
        icon={{
          name: `add`,
          color: 'white',
        }}
        color="green"
        placement="left"
        style={styles.fabStyle}
        onPress={() => {
          dispatch(enableNewTaskModal());

          // navigation.navigate('AddNewTask');
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: 'white',
  },
  header: {
    // backgroundColor: 'pink',
    // padding: 20,
    marginTop: 10,
  },
  body: {
    flex: 1,

    // padding: 20,
  },
  taskList: {
    // flex: 1,
    padding: 20,
    marginBottom: 60,
  },
  fabStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  delete: {
    padding: 10,
    flex: 1,
    backgroundColor: 'red',
    color: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  update: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'green',
    alignItems: 'flex-end',
  },
  deleteText: {
    color: 'white',
  },
});
export default Home;
