# TODO App

This is a simple TODO application built with React and Redux. It allows users to manage their tasks more effectively.

## Features

- Add new tasks
- Mark tasks as completed
- Edit existing tasks
- Delete tasks
- Filter tasks by their status (All, Active, Completed)
- Toggle between dark and light mode

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/kundan761/TODO.git
    ```

2. Navigate into the project directory:
    ```
    cd Todo
    ```

3. Install the dependencies:
    ```
    npm install
    ```

4. Start the application:
    ```
    npm start
    ```

5. Start the Server:
    ```
    npm run server
    ```
6. Deployed Link:
   ```
   https://todo-9muzvvbpp-kundan-kumar-surajs-projects.vercel.app/
   ```
## Folder Structure:
  ```
├── public/
│   ├── favicon.ico
├── src/
│   ├── components/
│   │   ├── AddTodo.jsx
│   │   ├── TodoList.jsx
│   │   ├── Filter.jsx
│   │   ├── TodoItem.jsx
│   ├── assets/
│   │   └── background.avif
│   │   └── react.svg
│   ├── Redux/
│   │   ├── action.js
│   │   ├── darkMode.js
│   │   ├── filter.reducer.js
│   │   ├── reducers.js
│   │   ├── store.js
│   ├── App.jsx
│   ├── url.js
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
├── .eslintric.cjs
├── .gitignore
├── db.json
├── index.html
├── package.json
├── vite.config.js
└── README.md

  ```
## Usage

To use the application, simply type your task into the input field and click "Add". Your task will appear in the list below. You can mark tasks as completed, edit their titles, or delete them using the buttons next to each task.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
