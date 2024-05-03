import { styled } from "@mui/system";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../Redux/action';

// Style your AddTodo component
const StyledForm = styled('form')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

const StyledInput = styled('input')({
  flex: '1',
  marginRight: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
});

const StyledButton = styled('button')({
  padding: '10px',
  backgroundColor: '#ccc',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

function AddTodo() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo(title));
      setTitle('');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Create a new todo..." />
      <StyledButton type="submit">Add</StyledButton>
    </StyledForm>
  );
}

export default AddTodo;
