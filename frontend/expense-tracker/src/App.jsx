import React from 'react'

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Home from "./page/Dashboard/Home";
import Income from './page/Dashboard/Income';
import Expense from "./page/Dashboard/Expense";
import UserProvider from './context/UserContext';
import {Toaster} from "react-hot-toast";


const App = () => {
  return (
    <UserProvider>
   <div>
    <Router>
      <Routes>
        <Route path="/"  element={<Root />} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/signUp" exact element={<SignUp/>} />
        <Route path="/dashboard" exact element={<Home/>} />
        <Route path="/income" exact element={<Income/>} />
        <Route path="/expense" exact element={<Expense/>} />
        </Routes>
        </Router>
   </div>

   <Toaster 
        toastOptions={{
          className:"",
          style:{
            fontSize:'13px'
          },
        }}
        />
   </UserProvider>
  )
}

export default App


const Root =() =>{
  //Check if token exits in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
   return isAuthenticated?(
    <Navigate to="/dashboard"/>
   ):(
    <Navigate to="/login" />
   );
};