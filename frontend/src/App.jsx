import "./App.scss";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CreateEmployeeProfile from "./components/CreateEmployeeProfile";
import CreateTask from "./components/CreateTask";
import Register from "./components/Register";
import Employees from "./components/Employees";
import EmployeeProfile from "./components/EmployeeProfile";
import AllTask from "./components/AllTask";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Login from "./components/Login";
import {
  getToken,
  getTriggerTaskReload,
  setTriggerTaskReload,
  getDisplay,
  getNotification,
} from "./globals/auth/index";
import { parse, differenceInDays } from "date-fns";
import moment from "moment";
import ProfileNetwork from "./helpers/profile/network";
import TaskNetwork from "./helpers/task/network";
import { setTasks, setProfiles } from "./globals/profile/index";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const token = useSelector(getToken);
  const triggerReload = useSelector(getTriggerTaskReload);
  const dispatch = useDispatch();
  const display = useSelector(getDisplay);
  const notification = useSelector(getNotification);
  const getProfile = async () => {
    const _profiles = await ProfileNetwork.getAllProfiles(token);
    if (_profiles) {
      dispatch(setProfiles(_profiles));
    }
  };
  const getTasks_all = async () => {
    //loads all tasks
    const getAllTasks = await TaskNetwork.getAllTasks(token);

    if (getAllTasks) {
      //automatically making the task past due
      let status = "Pass Due";
      getAllTasks.map(async (task) => {
        const now = new Date();
        const convertedDate = moment(task?.dueDate).format("L");
        console.log(convertedDate);
        const dueDate = parse(convertedDate, "MM/dd/yyyy", now);
        console.log(dueDate);
        let dayDifference = differenceInDays(now, dueDate);
        console.log(dayDifference > 1);
        if (dayDifference > 1) {
          const update = await TaskNetwork.changeTaskStatus(task._id, status);
        }
      });

      dispatch(setTasks(getAllTasks));
    }
  };
  useEffect(() => {
    if (triggerReload) {
      getTasks_all();
      getProfile();
    }
    return () => {
      dispatch(setTriggerTaskReload(false));
    };
  }, [triggerReload]);
  console.log(notification);
  return (
    <div className="App">
      <Router>
        <Navbar />
        {display && (
          <Notification
            message={notification?.message}
            type={notification?.type}
          />
        )}
        <div className="main">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            {token !== "" && (
              <Route
                path="/create-employee-profile"
                component={CreateEmployeeProfile}
              />
            )}
            {token !== "" && <Route path="/tasks" component={AllTask} />}
            {token !== "" && <Route path="/employees" component={Employees} />}
            {token !== "" && (
              <Route path="/profile" component={EmployeeProfile} />
            )}
            {token !== "" && (
              <Route path="/create-task" component={CreateTask} />
            )}
            {token === "" && <Redirect to="/" />}
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
