import React, { useEffect, useState } from "react";
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
  const [fetch, setShouldFetch] = useState(false);

  const getAProfile = async () => {
    const profile = await ProfileNetwork.getCurrentUser(token);
    if (profile) {
      dispatch(setProfile(profile));
    }
  };

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
  useEffect(() => {
    if (!fetch) {
      getAProfile();
    }
  }, [fetch]);
  return (
    <div className="main-wrapper">
      <h1>Your Profile</h1>
      {Object.keys(profile).length !== 0 ? (
        <>
          <div className="profileOne-container">
            <div>
              Employee name: <p>{profile?.user?.name}</p>
            </div>
            <div>
              Employee email: <p>{profile?.user?.email}</p>
            </div>
            <div>
              Employee id: <p>{profile?.user?.idNum}</p>
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
