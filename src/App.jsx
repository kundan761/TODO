import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./Redux/store";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import { setDarkMode } from "./Redux/action";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Typography, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import backgroundImage from "./assets/background.avif"

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', }}>
        <TodoApp />
      </div>
    </Provider>
  );
}

function TodoApp() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      text: {
        primary: darkMode ? "#0c82a1 " : "#000",
      },
    },
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <div style={{display:"flex", gap:"84.7%", paddingBottom:"15px"}}>
          <Typography variant="h3" align="center" sx={{ mb: 2 }}>
            TODO
          </Typography>
          <IconButton onClick={handleToggleDarkMode} sx={{ mb: 2 }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
          <AddTodo />
          <TodoList />
          <Filter />
      </Container>
    </ThemeProvider>
  );
}

export default App;
