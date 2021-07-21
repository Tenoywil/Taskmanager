import React from "react";
import { Link } from "react-router-dom";
import { logout, getToken } from "../../globals/auth/index";
import { setDefault, setTasks } from "../../globals/profile/index";
import { useSelector, useDispatch } from "react-redux";
import TaskNetwork from "../../helpers/task/network";
import "./Navbar.scss";

const Index = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const getTasks_all = async () => {
    const getAllTasks = await TaskNetwork.getAllTasks(token);

    if (getAllTasks) {
      dispatch(setTasks(getAllTasks));
    }
  };
  return (
    <div className="nav-container">
      <h1>
        Task<span>Manager</span>
      </h1>
      {token !== "" ? (
        <div className="internal-nav">
          <Link to="/tasks" onClick={() => getTasks_all()}>
            Tasks
          </Link>
          <Link to="/employees">Employees</Link>
          <Link to="/create-employee-profile">Create Employee</Link>
          <Link to="/profile">Profile</Link>
          <Link
            to="/"
            onClick={() => {
              dispatch(setDefault());
              dispatch(logout());
            }}
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="internal-nav">
          <Link to="/">
            <p>Login</p>
          </Link>
          <Link to="/register">
            {" "}
            <p>Register</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
