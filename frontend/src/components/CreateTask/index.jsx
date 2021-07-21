import React from "react";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import "./CreateTask.scss";
import { getProfiles } from "../../globals/profile";
import { useSelector, useDispatch } from "react-redux";
import TaskNetwork from "../../helpers/task/network";
import { useHistory } from "react-router-dom";
import {
  getToken,
  setTriggerTaskReload,
  setDisplay,
  setNotification,
} from "../../globals/auth";

const defaultFormvalues = {
  description: "",
  duedate: "",
  assignee: "",
};
const schema = object().shape({
  description: string().required("A description is required."),
  duedate: string().required("Must choose a Due date."),
  assignee: string().required("An assignee is required."),
});
const Index = () => {
  const profiles = useSelector(getProfiles);
  const token = useSelector(getToken);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (values, errors) => {
    console.log(values, errors);
    try {
      const profile = profiles.filter(
        (prof) => values.assignee === prof.user.name
      );
      if (profile) {
        console.log(values.duedate);
        let create = await TaskNetwork.createTask(
          token,
          values.description,
          values.duedate
        );
        const { _id } = create;
        if (Object.keys(create)?.length > 0) {
          let assign = await TaskNetwork.assignTask(
            token,
            profile[0]?.user._id,
            _id
          );
          if (assign) {
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
        }
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
        initialValues={defaultFormvalues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ errors, touched }) => (
          <Form>
            <h1>Create a Task</h1>
            <>
              <label>
                <p>Task Description:</p>
                <Field
                  as="textarea"
                  name="description"
                  className={"field"}
                  guide={false}
                />
              </label>
            </>
            {touched.description && errors.description && (
              <div className="error" style={{ marginTop: "-20px" }}>
                {errors.description}
              </div>
            )}
            <>
              <label>
                <p>Due Date:</p>
                <Field type="date" name="duedate" className={"field"} />
              </label>
            </>
            {touched.duedate && errors.duedate && (
              <div className="error" style={{ marginTop: "-20px" }}>
                {errors.duedate}
              </div>
            )}
            <>
              <label>
                <p>Assign to:</p>
                <Field as="select" name="assignee" className={"field"}>
                  <option value="" disabled hidden></option>
                  {profiles?.map((profile, i) => (
                    <option key={i} value={`${profile.user.name}`}>
                      {profile.user.name}
                    </option>
                  ))}
                </Field>
              </label>
            </>
            {touched.assignee && errors.assignee && (
              <div className="error" style={{ marginTop: "-20px" }}>
                {errors.assignee}
              </div>
            )}
            <button type="submit">Create</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Index;
