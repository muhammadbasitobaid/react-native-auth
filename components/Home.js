import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
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
  fetchTasks,
  updateTasks,
  deleteTask,
} from '../redux/actions';
import {SwipeListView} from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddNewTask from './AddNewTask';
import Update from './Update';
import UpdateTaskModal from './UpdateTaskModal';

function Home({navigation}) {
  const {
    isLoading,
    tasks,
    error,
    isNewTaskModalEnable,
    isUpdateTaskModalEnable,
    idToBeUpdate,
    isMoreLoading,
    isListEnd,
  } = useSelector(state => state).task;
  // const tasks = tasksState.tasks;
  // const currentPage = tasksState.currentPage;
  // const isNewTaskModalEnable = tasksState.isNewTaskModalEnable;
  // const isUpdateTaskModalEnable = tasksState.isUpdateTaskModalEnable;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    if (!isListEnd && !isMoreLoading) {
      setPage(page + 1);
    }
  };
  const renderFooter = () => {
    return (
      <View>
        {isMoreLoading && <ActivityIndicator />}
        {isListEnd && <Text>No more todo at the moment</Text>}
      </View>
    );
  };
  const handleUpdate = item => {
    dispatch(enableUpdateTaskModal(item.id));
  };
  const requestApi = () => {
    dispatch(fetchTasks(page));
  };

  // useEffect(() => {
  //   dispatch(fetchTasks(page));
  // }, []);

  useEffect(() => {
    requestApi();
  }, [page]);

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
                    dispatch(deleteTask(data.item));
                    setPage(1);
                    dispatch(fetchTasks(page));
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
            onEndReached={() => fetchMoreData()}
            ListFooterComponent={renderFooter}
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
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 10,
  },
  body: {
    flex: 1,
  },
  taskList: {
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
