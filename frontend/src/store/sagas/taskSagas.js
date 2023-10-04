import {takeLatest, call, put, fork, all} from 'redux-saga/effects'
import * as types from '../actions/taskActions'
import {updateTaskApi, fetchTaskApi, createTaskApi, deleteTaskApi} from "../../api/tasks"

function* updateTask({payload}){
  try {
    const task = yield call(updateTaskApi, payload)
    yield put(types.updateTaskSucceeded({data: task}))
  } catch(e){
    yield put(types.updateTaskFailed({ message: e.message }))
  }
}

function* fetchTask({payload}){
  try {
    const task = yield call(fetchTaskApi, payload)
    yield put(types.fetchTaskSucceeded({data: task}))
  } catch(e){
    yield put(types.fetchTaskFailed({ message: e.message }))
  }
}

function* addTask({payload}){
  try {
    const newTask = yield call(createTaskApi, payload)
    yield put(types.addTaskSucceeded(newTask))
  } catch (e) {
    yield put(types.addTaskFailed(e))
  }
}

function* deleteTask({payload}){
  try {
    const id = yield call(deleteTaskApi, payload)
    yield put(types.deleteTaskSucceeded(id))
  } catch (e) {
    yield put(types.deleteTaskFailed(e))
  }
}

function* onUpdateTask(){
  yield takeLatest(types.TASK_UPDATE_REQUESTED, updateTask)
}

function* onFetchTask(){
  yield takeLatest(types.TASK_FETCH_REQUESTED, fetchTask)
}

function* onAddTask(){
  yield takeLatest(types.TASK_ADD_REQUESTED, addTask)
}

function* onDeleteTask(){
  yield takeLatest(types.TASK_DELETE_REQUESTED, deleteTask)
}

export default function* rootTaskSaga() {
  yield all([
    fork(onUpdateTask),
    fork(onFetchTask),
    fork(onAddTask),
    fork(onDeleteTask)
  ])
}
