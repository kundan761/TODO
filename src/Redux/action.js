/* eslint-disable no-unused-vars */
import {url} from "../url"

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const GET_TODOS = 'GET_TODOS';
export const SET_TODOS = 'SET_TODOS';
export const EDIT_TODO = 'EDIT_TODO';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';


// Action CREATORS

export const addTodo = title => async dispatch => {
  const todo = { id: Date.now(), title, completed: false };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  // eslint-disable-next-line no-unused-vars
  const data = await response.json();
  dispatch({ type: ADD_TODO, title });
};

// export const toggleTodo = id => ({ type: TOGGLE_TODO, id });
export const toggleTodo = (id, completed) => async dispatch => {
  const response = await fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed: !completed })
  });
  const data = await response.json();
  dispatch({ type: TOGGLE_TODO, id, completed: !completed });
};



export const deleteTodo = id => async dispatch => {
  await fetch(`${url}/${id}`, {
    method: 'DELETE'
  });
  dispatch({ type: DELETE_TODO, id });
};

export const setTodos = todos => ({ type: SET_TODOS, todos });


export const editTodo = (id, title) => async dispatch => {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });
  const data = await response.json();
  dispatch({ type: EDIT_TODO, id, title: data.title });
};


export const clearCompleted = () => async (dispatch, getState) => {
  const { todos } = getState();
  const completedTodos = todos.filter(todo => todo.completed);

  await Promise.all(completedTodos.map(todo =>
    fetch(`${url}/${todo.id}`, {
      method: 'DELETE'
    })
  ));

  dispatch({ type: CLEAR_COMPLETED });
};


export const getTodos = (query = '') => async dispatch => {
  const Url = query ? `${url}?${query}` : url;
  const response = await fetch(Url);
  const todos = await response.json();
  if (Array.isArray(todos)) {
    dispatch(setTodos(todos));
  } else {
    console.error('No todos received from API');
  }
};



//filter
export const SET_FILTER = 'SET_FILTER';
export const FETCH_ALL_TODOS = 'FETCH_ALL_TODOS';
export const FETCH_ACTIVE_TODOS = 'FETCH_ACTIVE_TODOS';
export const FETCH_COMPLETED_TODOS = 'FETCH_COMPLETED_TODOS';

export const setFilter = filter => ({ type: SET_FILTER, filter });
// export const fetchAllTodos = () => ({ type: FETCH_ALL_TODOS });
export const fetchAllTodos = () => async dispatch => {
  try {
    const response = await fetch(url);
    const todos = await response.json();
    dispatch({ type: SET_TODOS, todos });
  } catch (error) {
    console.error("Error fetching all todos:", error);
  }
};


// export const fetchActiveTodos = () => ({ type: FETCH_ACTIVE_TODOS });
export const fetchActiveTodos = () => async dispatch => {
  try {
    const response = await fetch(`${url}`);
    const todos = await response.json();
    const activeTodos = todos.filter(todo => !todo.completed);
    dispatch({ type: SET_TODOS, todos: activeTodos });
  } catch (error) {
    console.error("Error fetching active todos:", error);
  }
};

// export const fetchCompletedTodos = () => ({ type: FETCH_COMPLETED_TODOS });
export const fetchCompletedTodos = () => async dispatch => {
  try {
    const response = await fetch(`${url}`);
    const todos = await response.json();
    const completedTodos = todos.filter(todo => todo.completed);
    dispatch({ type: SET_TODOS, todos: completedTodos });
  } catch (error) {
    console.error("Error fetching completed todos:", error);
  }
};


//DarkMode
export const SET_DARK_MODE = 'SET_DARK_MODE';

export const setDarkMode = isDarkMode => ({ type: SET_DARK_MODE, isDarkMode });


