import { SET_FILTER } from '../Redux/action';

const initialState = 'ALL';

function visibilityFilter(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export default visibilityFilter;
