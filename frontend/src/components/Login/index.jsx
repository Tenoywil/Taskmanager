import React from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import AuthNetwork from "../../helpers/auth/network";
import TaskNetwork from "../../helpers/task/network";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setToken, setNotification, setDisplay } from "../../globals/auth";
import { setTasks } from "../../globals/profile";
import "./Login.scss";

const defaultFormvalues = {
  email: "",
  password: "",
};
const schema = object().shape({
  email: string()
    .required("Please enter a vaild email address")
    .trim("")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Please enter a valid Email Address"
    ),
  password: string().required(" Please Enter your password."),
});
const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const response = await AuthNetwork.login(values.email, values.password);
      if (response) {
        dispatch(setToken(response.token));
        dispatch(
          setNotification({
            message: "Success!",
            type: "SUCCESS",
          })
        );
        dispatch(setDisplay(true));
      }
      const getAllTasks = await TaskNetwork.getAllTasks(response.token);

      if (getAllTasks) {
        dispatch(setTasks(getAllTasks));
      }
      if (response.token) {
        history.push("/tasks");
      }
    } catch (e) {
      dispatch(
        setNotification({
          message: "Your credentials are incorrect!",
          type: "FAIL",
        })
      );
      dispatch(setDisplay(true));
    }
  };
  return (
    <div className="login-main">
      <Formik
        initialValues={defaultFormvalues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form>
            <h1>Login</h1>
            <>
              <label>
                <p>Email:</p>
                <Field
                  type="text"
                  name="email"
                  className={"field"}
                  guide={false}
                />
              </label>
            </>
            {touched.email && errors.email && (
              <div className="error">{errors.email}</div>
            )}
            <>
              <label>
                <p>Password:</p>
                <Field
                  type="password"
                  name="password"
                  className={"field"}
                  guide={false}
                  minLength={6}
                />
                <p className="info-message">
                  if you do not already have an account{" "}
                  <Link to="/register">Register here</Link>!
                </p>
              </label>
            </>
            {touched.password && errors.password && (
              <div className="error">{errors.password}</div>
            )}
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Index;
