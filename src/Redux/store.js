import { combineReducers } from 'redux';
import todos from './reducer';
import visibilityFilter from './filter.reducer';
import darkMode from './darkMode';

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  darkMode
});

export default rootReducer;