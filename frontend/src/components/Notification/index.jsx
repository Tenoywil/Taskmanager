import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDisplay } from "../../globals/auth";
import "./Notification.scss";
const Index = ({ type, message }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setDisplay(false));
    }, 2000);
  }, []);
  return (
    <div
      className={`notif-container ${type === "SUCCESS" ? "success" : "fail"}`}
    >
      <h2>{message}</h2>
    </div>
  );
};

export default Index;
