import React from "react";
import "./App.css";
import SideNav from "./SideNav";
import Header from "./Header";
import Main from "./Main";
import Posts from "./Posts";
import SignUp from "./SignUp";
import useFetch from "./useFetch";
import CreatePost from "./CreatePost";
import UserLogin from "./Login";
import OnePost from "./OnePost";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Login() {
  // const fetchData = async (id) => {
  //   return await fetch(`https://reddit-backend-clone.herokuapp.com/api/v1/posts/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "Authorization": `Bearer ${localStorage.getItem("token")}`
  //     }
  //   }).then(res => res.json())
  //     .then(data => console.log(data))
  // }
  // console.log(fetchData(localStorage.getItem("postId")))
  return (
    <div className="App container w-100 p-3 mt-0">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/create">
            <CreatePost />
          </Route>
          <Route exact path="/signin">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <UserLogin />
          </Route>
          <Route exact path="/view">
            <OnePost />

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Login;
