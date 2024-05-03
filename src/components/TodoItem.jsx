/* eslint-disable react/prop-types */
import { styled } from "@mui/system";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../Redux/action';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
// Style your TodoItem component
const StyledTodoItem = styled('div')({
  display: 'flex',
  justifyContent: 'space-between', // Push items to the ends
  alignItems: 'center',
  backgroundColor: '#f8f8f8',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#e8e8e8',
  },
});

const StyledButton = styled('button')({
  backgroundColor: '#ccc',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  '& button': {
    marginLeft: '10px',
  },
});

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const dispatch = useDispatch();

  const handleEdit = e => {
    e.preventDefault();
    if (newTitle.trim()) {
      dispatch(editTodo(todo.id, newTitle));
      setIsEditing(false);
    }
  };
  
  return (
    <StyledTodoItem>
      <div>
        <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id, todo.completed))} />
        {isEditing ? (
          <form onSubmit={handleEdit}>
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <StyledButton type="submit">Save</StyledButton>
          </form>
        ) : (
          <span onDoubleClick={() => setIsEditing(true)}>{todo.title}</span>
        )}
      </div>
      <ButtonContainer>
        <StyledButton onClick={() => setIsEditing(true)}><EditNoteOutlinedIcon sx={{fontSize:"small"}} /></StyledButton>
        <StyledButton onClick={() => dispatch(deleteTodo(todo.id))}>Delete</StyledButton>
      </ButtonContainer>
    </StyledTodoItem>
  );
}

export default TodoItem;
