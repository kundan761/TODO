import { SET_DARK_MODE } from '../Redux/action';

const initialState = false;

function darkMode(state = initialState, action) {
  switch (action.type) {
    case SET_DARK_MODE:
      return action.isDarkMode;
    default:
      return state;
  }
}

export default darkMode;
