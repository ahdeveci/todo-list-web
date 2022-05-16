import React from 'react';
import {RouteObject, useRoutes, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Login from "./layout/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import Status404 from "./layout/Status404";
import {RecoilRoot} from "recoil";

import ActiveTodoList from "./layout/ActiveTodoList";
import CompletedTodoList from "./layout/CompletedTodoList";
import GroupManagement from "./layout/GroupManagement";


function App() {
  return (
      <RecoilRoot>
        <Router>
          <TodoApp />
        </Router>
      </RecoilRoot>
  );
}


const TodoApp: React.FC = () => {
  let routes: RouteObject[] = [
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {path: '/', element: <ActiveTodoList/>},
        {path: '/active-todo-list', element: <ActiveTodoList/>},
        {path: '/completed-todo-list', element: <CompletedTodoList/>},
        {path: '/group-management', element: <GroupManagement/>},
      ]
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '*', element: <Status404/>
    }
  ];
  let element = useRoutes(routes);

  return element;
}


export default App;
