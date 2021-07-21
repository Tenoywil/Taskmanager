import React from "react";
import {
  getProfile,
  setDefault,
  setProfile,
} from "../../globals/profile/index";
import { useSelector, useDispatch } from "react-redux";
import ProfileNetwork from "../../helpers/profile/network";
import { useHistory } from "react-router-dom";
import {
  getToken,
  logout,
  setDisplay,
  setNotification,
} from "../../globals/auth";
import "./EmployeeProfile.scss";
const Index = () => {
  const profile = useSelector(getProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(getToken);

  const deleteProfile = async () => {
    const deleteUser = await ProfileNetwork.deleteCurrentUser(token);
    if (deleteUser) {
      dispatch(setDefault());
      dispatch(logout());
      history.push("/login");
      dispatch(
        setNotification({
          message: "SUCCESS!",
          type: "SUCCESS",
        })
      );
      dispatch(setDisplay(true));
    }
  };

  return (
    <div className="main-wrapper">
      <h1>Your Profile</h1>
      {Object.keys(profile).length !== 0 ? (
        <>
          <div className="profileOne-container">
            <div>
              Employee Name: <p>{profile?.user?.name}</p>
            </div>
            <div>
              Employee Email: <p>{profile?.user?.email}</p>
            </div>
            <div>
              Employee Id: <p>{profile?.user?.idNum}</p>
            </div>
            <div>
              Department: <p>{profile?.department}</p>
            </div>
            <div>
              Position: <p>{profile?.position}</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-delete"
            onClick={() => deleteProfile()}
          >
            Delete Profile
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => history.push("/create-employee-profile")}
        >
          Click to create profile
        </button>
      )}
    </div>
  );
};

export default Index;
