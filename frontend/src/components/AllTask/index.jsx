import React, { useEffect, useState } from "react";
import {
  getToken,
  setTriggerTaskReload,
  setDisplay,
  setNotification,
} from "../../globals/auth";
import { getTasks, getTask, setTask } from "../../globals/profile/index";
import { useSelector, useDispatch } from "react-redux";
import TaskNetwork from "../../helpers/task/network";
import checkMark from "../../img/check-icn-black.svg";
import { getProfiles } from "../../globals/profile";
import Checkbox from "react-custom-checkbox";
import { useHistory } from "react-router";
import closer from "../../img/closer.svg";
import Moment from "react-moment";

import "./AllTask.scss";

const Index = () => {
  const tasks = useSelector(getTasks);
  const task = useSelector(getTask);
  const token = useSelector(getToken);
  const history = useHistory();
  const dispatch = useDispatch();

  const markComplete = async (token, id, completed) => {
    if (completed) {
      let status = "";
      const check = await TaskNetwork.markTaskIncomplete(token, id);
      const update = await TaskNetwork.changeTaskStatus(id, status);
      if (check) {
        dispatch(setTriggerTaskReload(true));
        dispatch(setTask({}));
      }
    } else {
      let status = "Completed";
      const check = await TaskNetwork.markTaskComplete(token, id);
      const update = await TaskNetwork.changeTaskStatus(id, status);
      if (check) {
        dispatch(setTriggerTaskReload(true));
        dispatch(setTask({}));
      }
    }
  };
  const closeWindow = () => {
    dispatch(setTask({}));
  };
  useEffect(() => {
    dispatch(setTriggerTaskReload(true));
    return () => {
      dispatch(setTriggerTaskReload(false));
    };
  }, []);
  const deleteTask = async (id) => {
    const _deleteTask = await TaskNetwork.deleteTask(id);
    if (_deleteTask) {
      dispatch(setTriggerTaskReload(true));
      dispatch(setTask({}));
      dispatch(
        setNotification({
          message: "SUCCESS!",
          type: "SUCCESS",
        })
      );
      dispatch(setDisplay(true));
    }
  };
  const updateStatus = async (token, id, status) => {
    if (status === "Completed") {
      const check = await TaskNetwork.markTaskComplete(token, id);
      const update = await TaskNetwork.changeTaskStatus(id, status);
      dispatch(setTriggerTaskReload(true));
      dispatch(setTask({}));
    } else {
      const checks = await TaskNetwork.markTaskIncomplete(token, id);
      const update = await TaskNetwork.changeTaskStatus(id, status);
      if (update) {
        dispatch(setTask({}));
        dispatch(setTriggerTaskReload(true));
      }
    }
  };

  return (
    <div className="task-main">
      <div className="top-section">
        {Object.keys(task).length !== 0 && (
          <ViewTask
            task={task}
            markComplete={markComplete}
            token={token}
            deleteTask={deleteTask}
            updateStatus={updateStatus}
            closeWindow={closeWindow}
          />
        )}

        <h1>All Tasks</h1>
        <button type="button" onClick={() => history.push("/create-task")}>
          Create Task
        </button>
      </div>
      <div className="main">
        <div className="top-main">
          <div
            className="inner-top-main"
            style={{ color: "#89cff0", marginLeft: "0px" }}
          >
            <p>Not yet Started</p>
          </div>
          <div
            className="inner-top-main"
            style={{ color: "orange", marginLeft: "-10px" }}
          >
            <p>Inprogress</p>
          </div>
          <div
            className="inner-top-main"
            style={{ color: "#04aa6d", marginLeft: "-10px" }}
          >
            <p>Complete</p>
          </div>
          <div
            className="inner-top-main"
            style={{ color: "red", marginLeft: "-10px" }}
          >
            <p>Pass due *</p>
          </div>
        </div>
        <div className="Bottom-main">
          <div className="inner-Bottom-main">
            {tasks?.map((task, i) =>
              task.status === "Not yet Started" || task.status === "" ? (
                <TaskBox
                  key={i}
                  markComplete={markComplete}
                  token={token}
                  task={task}
                />
              ) : (
                ""
              )
            )}
          </div>
          <div className="inner-Bottom-main">
            {tasks?.map((task, i) =>
              task.status === "Inprogress" ? (
                <TaskBox
                  key={i}
                  markComplete={markComplete}
                  token={token}
                  task={task}
                />
              ) : (
                ""
              )
            )}
          </div>
          <div className="inner-Bottom-main">
            {tasks?.map((task, i) =>
              task.status === "Completed" || task.completed ? (
                <TaskBox
                  key={i}
                  markComplete={markComplete}
                  token={token}
                  task={task}
                />
              ) : (
                ""
              )
            )}
          </div>
          <div className="inner-Bottom-main">
            {tasks?.map((task, i) => {
              return task.status === "Pass Due" ? (
                <TaskBox
                  key={i}
                  text={task.text}
                  completed={task.completed}
                  markComplete={markComplete}
                  id={task._id}
                  token={token}
                  task={task}
                />
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskBox = ({
  task: { text, completed, _id },
  token,
  markComplete,
  task,
  status,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`box`}
      style={{
        display: "flex",
        borderRadius: "7px",
        backgroundColor: "#c4c4c4",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingRight: "20px",
        paddingLeft: "20px",
        marginBottom: "10px",
        justifyContent: "space-between",
        alignItems: "center",
        height: "114px",
        maxWidth: "329px",
      }}
    >
      <div
        onClick={() => {
          dispatch(setTask(task));
        }}
      >
        <div className="card-text">{text}</div>
      </div>
      <Checkbox
        checked={completed}
        onChange={(value) => markComplete(token, _id, completed)}
        icon={
          <img
            src={checkMark}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#8598DB",
              borderRadius: "5px",
              padding: "3px",
            }}
            alt=""
          />
        }
        borderColor="#8598DB"
        borderRadius={7}
        size={30}
        label=""
      />
    </div>
  );
};

const ViewTask = ({
  task: {
    name,
    text,
    createdAt,
    completedAt,
    dueDate,
    status,
    _id,
    completed,
    assignee,
  },
  markComplete,
  token,
  deleteTask,
  updateStatus,
  closeWindow,
}) => {
  const [willChange, setWillChange] = useState(false);
  const [statusState, setStatus] = useState("");
  const profiles = useSelector(getProfiles);

  const findAssignee = (assignee) => {
    const profile = profiles?.filter((prof) => prof.user._id === assignee);
    return `${profile[0]?.user?.name}`;
  };
  return (
    <div className="task-view">
      <div className="task-view-main">
        <div className="inner-view">
          <div>
            <p>Assigner:</p> {name}
          </div>
          <div>
            <p>Assignee:</p> {findAssignee(assignee)}
          </div>
          <div>
            <p>Description:</p>
            {text}
          </div>
          <div>
            <p>Date created:</p>
            <Moment format="MM/DD/YYYY">{createdAt}</Moment>
          </div>
          <div>
            <p>Due date:</p>

            <Moment format="MM/DD/YYYY">{dueDate}</Moment>
          </div>
          <div>
            <p>Status:</p>

            {status && !willChange ? (
              <>
                {status}
                <small onClick={() => setWillChange(true)}>Change</small>
              </>
            ) : (
              <div
                onChange={(e) => {
                  setStatus(e.target.value);
                  setWillChange(true);
                }}
                className="status-selection"
              >
                <label>
                  <input type="radio" value="Not yet Started" name="status" />
                  Not yet Started
                </label>

                <label>
                  <input type="radio" value="Completed" name="status" />{" "}
                  Completed
                </label>
                <label>
                  <input type="radio" value="Inprogress" name="status" />
                  Inprogress
                </label>
              </div>
            )}
          </div>
        </div>
        {!willChange ? (
          <div className="btn-group">
            <button
              type="button"
              className="btn-delete"
              onClick={() => deleteTask(_id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn-complete"
              onClick={() => markComplete(token, _id, completed)}
            >
              Complete
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-complete"
            onClick={() => {
              updateStatus(token, _id, statusState);
              setWillChange(false);
            }}
          >
            Update
          </button>
        )}
        <img
          src={closer}
          alt=""
          className="closer"
          onClick={() => closeWindow()}
        />
      </div>
    </div>
  );
};
export default Index;
