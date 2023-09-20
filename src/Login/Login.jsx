import React from "react";
import LoginStyle from "./Login.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [change, setchange] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value);
    const attrib = event.target.name;
    const val = event.target.value;
    setchange((values) => ({ ...values, [attrib]: val }));
    console.log(change);
  };
  const CheckFields = (login_email, login_pswrd) => {
    if (login_email == null || login_email === "") {
      setErrorMessage("Email Missing!");
      return false;
    }
    if (login_pswrd == null || login_pswrd === "") {
      setErrorMessage("Password Missing!");
      return false;
    }
    return true;
  };
  const SubmitForm = () => {
    console.log(change);
    const is_valid_form = CheckFields(change.login_email, change.login_pswrd);
    if (is_valid_form) {
      const url = "http://localhost/api/login.php";
      axios
        .post(url, change)
        .then((response) => {
          // Extract and set the message from the response
          // console.log(response.data.message);
          if (response.data.message === "Password matched") {
            navigate("/userlist");
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <div className={LoginStyle.content}>
      <h1 className={LoginStyle.header}>Realtime Chat App</h1>
      <hr className={LoginStyle.line} />
      {errorMessage && <div className={LoginStyle.error}>{errorMessage}</div>}
      <div className={`${LoginStyle.field} ${LoginStyle.item}`}>
        <label htmlFor="" className={LoginStyle.item}>
          Email Address
        </label>
        <input
          type="email"
          className={LoginStyle.inp}
          name="login_email"
          id=""
          placeholder="Email Address"
          onChange={handleChange}
        />
      </div>
      <div className={`${LoginStyle.field} ${LoginStyle.item}`}>
        <label htmlFor="" className={LoginStyle.item}>
          Enter Password
        </label>
        <input
          className={`${LoginStyle.inp}`}
          type="password"
          name="login_pswrd"
          id=""
          placeholder="Enter Password"
          onChange={handleChange}
        />
      </div>
      <a className={LoginStyle.button} href="#" onClick={() => SubmitForm()}>
        {" "}
        Continue To Chat{" "}
      </a>
      <span className={LoginStyle.sign}>
        Not Yet Signed Up?{" "}
        <a href="" onClick={() => navigate("/")}>
          Signup Now
        </a>
      </span>
    </div>
  );
};
