import { styled } from "@mui/system";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, clearCompleted } from '../Redux/action';
import TodoItem from './TodoItem';

// Style your TodoList component
const StyledTodoList = styled('div')({
  marginBottom: '20px',
  '& li': {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
});

const StyledButton = styled('button')({
  marginTop: '20px',
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

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const completedCount = todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0);

  return (
    <StyledTodoList>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <div style={{display:"flex", gap:"83.8%", alignItems:"baseline", fontSize:"small"}}>
      <div>{todos.length} items left</div>
      <StyledButton disabled={completedCount === 0} onClick={() => dispatch(clearCompleted())}>Clear Completed</StyledButton>
      </div>

    </StyledTodoList>
  );
}

export default TodoList;
