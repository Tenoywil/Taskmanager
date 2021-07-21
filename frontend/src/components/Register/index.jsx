import React from "react";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import AuthNetwork from "../../helpers/auth/network";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setDisplay, setNotification } from "../../globals/auth";
import "./Register.scss";

const defaultFormvalues = {
  email: "",
  password: "",
  password2: "",
  name: "",
};
const schema = object().shape({
  name: string().required("Please Enter Your Full Name"),
  email: string()
    .required()
    .trim("")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Please enter a valid Email Address"
    ),
  password: string().required("Please enter password "),
  password2: string().required(" Please enter password again"),
});
const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      if (values.password === values.password2) {
        const register = await AuthNetwork.registerUser(
          values.name,
          values.email,
          values.password
        );
        if (register) {
          history.push("/create-employee");
        }
      } else {
        dispatch(
          setNotification({
            message: "Passwords need to match.",
            type: "Fail",
          })
        );
        dispatch(setDisplay(true));
      }
      dispatch(
        setNotification({
          message: "SUCCESS!",
          type: "SUCCESS",
        })
      );
      dispatch(setDisplay(true));
    } catch (e) {
      dispatch(
        setNotification({
          message: "Try a different email.",
          type: "Fail",
        })
      );
      dispatch(setDisplay(true));
    }
  };
  return (
    <div className="Register-main">
      <Formik
        initialValues={defaultFormvalues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form>
            <h1>Register</h1>
            <>
              <label>
                <p>Name:</p>
                <Field
                  type="text"
                  name="name"
                  className={"field"}
                  guide={false}
                  minLength={6}
                />
              </label>
            </>
            {touched.name && errors.name && (
              <div className="error" style={{ marginTop: "-20px" }}>
                {errors.name}
              </div>
            )}
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
              <div className="error" style={{ marginTop: "-20px" }}>
                {errors.email}
              </div>
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
                  autocomplete="off"
                />
              </label>
            </>
            {touched.password && errors.password && (
              <div className="error" style={{ marginTop: "-20px" }}>
                {errors.password}
              </div>
            )}

            <>
              <label>
                <p>Confirm Password:</p>
                <Field
                  type="password"
                  name="password2"
                  className={"field"}
                  guide={false}
                  minLength={6}
                  autocomplete="off"
                />
              </label>
            </>
            {touched.password2 && errors.password2 && (
              <div className="error" style={{ marginTop: "-20px" }}>
                {errors.password2}
              </div>
            )}
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Index;
