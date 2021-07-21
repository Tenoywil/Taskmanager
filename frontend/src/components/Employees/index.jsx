import React from "react";
import { getProfiles } from "../../globals/profile/index";
import { useSelector } from "react-redux";

import "./Employees.scss";
const Index = () => {
  const profiles = useSelector(getProfiles);

  return (
    <div className="main-wrapper">
      <h1>All Employees Registered</h1>
      {profiles.length !== 0 ? (
        profiles?.map((profile) => (
          <div className="profile-container">
            <div>
              Employee name: <p>{profile.user.name}</p>
            </div>
            <div>
              Employee email: <p>{profile.user.email}</p>
            </div>
            <div>
              Employee id: <p>{profile.user.idNum}</p>
            </div>
            <div>
              Department: <p>{profile.department}</p>
            </div>
            <div>
              Position: <p>{profile.position}</p>
            </div>
          </div>
        ))
      ) : (
        <div> No Employee Profile was created </div>
      )}
    </div>
  );
};

export default Index;
