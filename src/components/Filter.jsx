import { styled } from "@mui/system";
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveTodos, fetchAllTodos, fetchCompletedTodos, setFilter } from '../Redux/action';

// Style your Filter component
const StyledFilter = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
});

const StyledButton = styled('button')({
  padding: '10px',
  backgroundColor: '#ccc',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:disabled': {
    backgroundColor: '#eee',
    cursor: 'not-allowed',
  },
});

function Filter() {
  const dispatch = useDispatch();
  const visibilityFilter = useSelector(state => state.visibilityFilter);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
    switch (filter) {
      case 'ALL':
        dispatch(fetchAllTodos());
        break;
      case 'ACTIVE':
        dispatch(fetchActiveTodos());
        break;
      case 'COMPLETED':
        dispatch(fetchCompletedTodos());
        break;
      default:
        break;
    }
  };

  return (
    <StyledFilter>
      <StyledButton disabled={visibilityFilter === 'ALL'} onClick={() => handleFilterChange('ALL')}>All</StyledButton>
      <StyledButton disabled={visibilityFilter === 'ACTIVE'} onClick={() => handleFilterChange('ACTIVE')}>Active</StyledButton>
      <StyledButton disabled={visibilityFilter === 'COMPLETED'} onClick={() => handleFilterChange('COMPLETED')}>Completed</StyledButton>
    </StyledFilter>
  );
}

export default Filter;
