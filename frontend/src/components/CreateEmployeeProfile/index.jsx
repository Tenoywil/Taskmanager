import React from "react";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import "./CreateProfile.scss";
import ProfileNetwork from "../../helpers/profile/network";
import {
  getToken,
  setTriggerTaskReload,
  setDisplay,
  setNotification,
} from "../../globals/auth";
import { getProfile } from "../../globals/profile";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

/**
 * @param profile
 */
const defaultFormvalues = (profile) => ({
  position: profile.position || "",
  department: profile.department || "",
});
const schema = object().shape({
  position: string().required(" Please enter your position"),
  department: string().required("Please enter your department"),
});
const Index = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const history = useHistory();
  const profile = useSelector(getProfile);

  const handleSubmit = async (values) => {
    try {
      const createProfile = await ProfileNetwork.createProfile(
        token,
        values.department,
        values.position
      );
      if (createProfile) {
        dispatch(setTriggerTaskReload(true));
        history.push("/tasks");
        dispatch(
          setNotification({
            message: "SUCCESS!",
            type: "SUCCESS",
          })
        );
        dispatch(setDisplay(true));
      }
    } catch (e) {
      dispatch(
        setNotification({
          message: "Enter all field data correctly.",
          type: "FAIL",
        })
      );
      dispatch(setDisplay(true));
    }
  };
  return (
    <div className="profile-main">
      <Formik
        initialValues={defaultFormvalues(profile)}
        onSubmit={handleSubmit}
        validationSchema={schema}
        enableReinitialize
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form>
            <h1>
              {profile ? "Update Your Profile" : "Create Employee Your Profile"}
            </h1>
            <>
              <label>
                <p>Department:</p>
                <Field
                  type="text"
                  name="department"
                  className={"field"}
                  guide={false}
                />
              </label>
            </>
            {touched.department && errors.department && (
              <div className="error" style={{ marginTop: "-20px" }}>
                {errors.department}
              </div>
            )}
            <>
              <label>
                <p>Position:</p>
                <Field
                  type="text"
                  name="position"
                  className={"field"}
                  guide={false}
                  minLength={6}
                />
              </label>
            </>
            {touched.position && errors.position && (
              <div className="error" style={{ marginTop: "-20px" }}>
                {errors.position}
              </div>
            )}
            <button type="submit">{profile ? "Update" : "Create"}</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Index;
