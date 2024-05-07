import axios from 'axios';
import { url } from '../url';
import { v4 as uuidv4 } from 'uuid';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const GET_TODOS = 'GET_TODOS';
export const SET_TODOS = 'SET_TODOS';
export const EDIT_TODO = 'EDIT_TODO';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// Action Creators
export const setTodos = todos => ({ type: SET_TODOS, todos });


export const getTodos = (query = '') => async (dispatch) => {
  try {
    const Url = query ? `${url}?${query}` : url;
    const response = await axios.get(Url);
    dispatch(setTodos(response.data));
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

export const addTodo = (title) => async (dispatch) => {
  try {
    const todo = { id: uuidv4(), title, completed: false };
    await axios.post(url, todo);
    dispatch({ type: ADD_TODO, title });
    dispatch(getTodos());
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

export const toggleTodo = (id, completed) => async (dispatch) => {
  try {
    await axios.patch(`${url}/${id}`, { completed: !completed });
    dispatch(getTodos());
    dispatch({ type: TOGGLE_TODO, id, completed: !completed });
  } catch (error) {
    console.error('Error toggling todo:', error);
  }
};

export const editTodo = (id, title) => async (dispatch) => {
  try {
    await axios.put(`${url}/${id}`, { title });
    dispatch({ type: EDIT_TODO, id, title });
  } catch (error) {
    console.error('Error editing todo:', error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/${id}`);
    dispatch({ type: DELETE_TODO, id });
    dispatch(getTodos()); // Fetch updated todos after deletion
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

export const clearCompleted = () => async (dispatch, getState) => {
  try {
    const { todos } = getState();
    const completedTodos = todos.filter((todo) => todo.completed);
    await Promise.all(
      completedTodos.map((todo) => axios.delete(`${url}/${todo.id}`))
    );
    dispatch({ type: CLEAR_COMPLETED });
  } catch (error) {
    console.error('Error clearing completed todos:', error);
  }
};

// Filter actions...
export const SET_FILTER = 'SET_FILTER';
export const FETCH_ALL_TODOS = 'FETCH_ALL_TODOS';
export const FETCH_ACTIVE_TODOS = 'FETCH_ACTIVE_TODOS';
export const FETCH_COMPLETED_TODOS = 'FETCH_COMPLETED_TODOS';

export const setFilter = (filter) => ({ type: SET_FILTER, filter });

export const fetchAllTodos = () => async (dispatch) => {
  try {
    const response = await axios.get(url);
    dispatch({ type: SET_TODOS, todos: response.data });
  } catch (error) {
    console.error('Error fetching all todos:', error);
  }
};

export const fetchActiveTodos = () => async (dispatch) => {
  try {
    const response = await axios.get(url);
    const activeTodos = response.data.filter((todo) => !todo.completed);
    dispatch({ type: SET_TODOS, todos: activeTodos });
  } catch (error) {
    console.error('Error fetching active todos:', error);
  }
};

export const fetchCompletedTodos = () => async (dispatch) => {
  try {
    const response = await axios.get(url);
    const completedTodos = response.data.filter((todo) => todo.completed);
    dispatch({ type: SET_TODOS, todos: completedTodos });
  } catch (error) {
    console.error('Error fetching completed todos:', error);
  }
};

// DarkMode action
export const SET_DARK_MODE = 'SET_DARK_MODE';

export const setDarkMode = (isDarkMode) => ({ type: SET_DARK_MODE, isDarkMode });
