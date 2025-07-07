import React from "react";
import "./input.css";
import Home from "./Components/Home";
import Courses from "./Components/Courses";
import Plans from "./Components/Plan";
import Main from "./Components/Main";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Contact from "./Components/Contact";
import CourseDetail from "./Courses/CourseDetail";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <div>
      <Routes>
  <Route path="/" element={<Home />}>
    <Route index element={<Main />} />
    <Route path="courses" element={<Courses />} />
    <Route path="plans" element={<Plans />} />
    <Route path="contact" element={<Contact />} />
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
  </Route>
  <Route
    path="/courses/:slug"
    element={
      <PrivateRoute>
        <CourseDetail />
      </PrivateRoute>
    }
  />
</Routes>

    </div>
  );
};

export default App;
