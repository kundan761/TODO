import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  GET_TODOS,
  SET_TODOS,
  EDIT_TODO,
  CLEAR_COMPLETED,
} from "./action";
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { id: uuidv4(), title: action.title, completed: false },
      ];
    case TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case GET_TODOS:
      return state;
    case SET_TODOS:
      return action.todos;
    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, title: action.title } : todo
      );
    case CLEAR_COMPLETED:
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
}

export default todos;

// reducer for all part except darkmode and filter
