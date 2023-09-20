import React from "react";
import SignUpStyle from './SignUp.module.css';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
// console.log("HELLO WORLD");
  const togglePassword = () => {
    const pswrd = document.getElementById('password_1');
    const eyeicon = document.getElementById('eye_1');
    // console.log(pswrd.type);
    // console.log(eyeicon[0].textContent);
    if (pswrd.type == 'password'){
      pswrd.type = 'text';
      eyeicon.textContent = 'visibility';
    }
    else{
      pswrd.type = 'password';
      eyeicon.textContent = 'visibility_off';
    }
    // console.log(pswrd.type, eyeicon.textContent);
  }
  const toggleFinalPassword = () => {
    const pswrd = document.getElementById('password_2');
    const eyeicon = document.getElementById('eye_2');
    // console.log(pswrd.type);
    // console.log(eyeicon[0].textContent);
    if (pswrd.type == 'password'){
      pswrd.type = 'text';
      eyeicon.textContent = 'visibility';
    }
    else{
      pswrd.type = 'password';
      eyeicon.textContent = 'visibility_off';
    }
    // console.log(pswrd.type, eyeicon.textContent);
  }    
  const [change, setchange] = useState({})
  const [errorMessage, setErrorMessage] = useState("");
  const [pswrdMessage, setpswrdMessage] = useState("");
  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value);
    const attrib = event.target.name
    const val = event.target.value
    setchange(values => ({...values, [attrib] : val}))
    console.log(change)
  }

  const uploadImage = async (e) => {
    let file = e.target.files[0];
    const url = 'http://localhost/api/signup.php';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_image', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try{
    await axios.post(url, formData, config).then((response) => {
      console.log("response", response)
    });}
    catch(e){
      console.log('error', e)
    }
  }

  const CheckFields = (first_name, last_name, email, pswrd, confirm_pswrd) => {
    if (first_name == null || first_name === "") {
      setErrorMessage("First Name is Missing");
      return false;
    }
    if (last_name == null || last_name === "") {
      setErrorMessage("Last Name is Missing");
      return false;
    }
    if (email == null || email === "") {
      setErrorMessage("Email is Missing");
      return false;
    }
    if (pswrd == null || pswrd === "") {
      setErrorMessage("Password is Missing");
      return false;
    }
    if (confirm_pswrd == null || confirm_pswrd === "") {
      setErrorMessage("Confirm Password is Missing");
      return false;
    }
    if (pswrd !== confirm_pswrd) {
      setErrorMessage("Passwords Do Not Match");
      return false;
    }
    setErrorMessage(""); // Clear the error message if there are no errors
    return true;
  };
  const SubmitForm = () => {
    console.log(change);
    const is_valid_form = CheckFields(change.first_name, change.last_name, change.email, change.pswrd, change.confirm_pswrd);
    if (is_valid_form){
      const url = "http://localhost/api/signup.php";
      axios
      .post(url, change)  // change = data 
      .then((response) => {
        console.log(response);
        if (response.data.message === "Invalid Mail Address") {
          setErrorMessage(response.data.message);
        } else if (response.data.message === "Valid Mail Address"){
          // console.log("Navigate To Chatpage");
          if (response.data.pswrd_strength === "weak") {
            setpswrdMessage("ENTER STRONG PASSWORD");
            console.log("WEAK");
          } else if (response.data.pswrd_strength === "strong"){
            console.log("STRONG");
            setpswrdMessage("PASSWORD IS STRONG");
            navigate("/userlist");
          }
        }
      })
      .catch((error) => {console.error(error);})  
    }
  }
  
  return (
    <div className={SignUpStyle.content}>
      <h1 className={SignUpStyle.header}>Realtime Chat App</h1>
      <hr className={SignUpStyle.line} />
      {errorMessage && <div className={SignUpStyle.error}>{errorMessage}</div>}
      {pswrdMessage && <div className={SignUpStyle.error}>{pswrdMessage}</div>}
      <div className={`${SignUpStyle.name} ${SignUpStyle.item}`}>
        <div className={SignUpStyle.field}>
          <label htmlFor="" className={SignUpStyle.item}>
            First Name<span className="required" style={{"color" : "red"}}>*</span>
          </label>
          <input type="text" name="first_name" id="" placeholder="First Name" onChange={handleChange}/>
        </div>
        <div className={SignUpStyle.field}>
          <label htmlFor="" className={SignUpStyle.item}>
            Last Name<span className="required" style={{"color" : "red"}}>*</span>
          </label>
          <input type="text" name="last_name" id="" placeholder="Last Name" onChange={handleChange}/>
        </div>
      </div>
      <div className={`${SignUpStyle.field} ${SignUpStyle.item}`}>
        <label htmlFor="" className={SignUpStyle.item}>
          Email Address<span className="required" style={{"color" : "red"}}>*</span>
        </label>
        <input type="email" name="email" id="" placeholder="Email Address" onChange={handleChange}/>
      </div>
      <div className={`${SignUpStyle.field} ${SignUpStyle.item}`}>
        <label htmlFor="" className={SignUpStyle.item}>
          Enter New Password<span className="required" style={{"color" : "red"}}>*</span>
        </label>
        <div className={SignUpStyle.password}>
          <input
            type="password"
            name="pswrd"
            id="password_1"
            placeholder="Enter New Password"
            onChange={handleChange}
          />
          <span
            className={`${'material-symbols-outlined'} ${SignUpStyle.eye}`}
            id="eye_1"
            onClick={togglePassword}
          >
            visibility_off
          </span>
        </div>
      </div>
      <div className={`${SignUpStyle.field} ${SignUpStyle.item}`}>
        <label htmlFor="" className={SignUpStyle.item}>
          Confirm Password<span className="required" style={{"color" : "red"}}>*</span>
        </label>
        <div className={SignUpStyle.password}>
          <input
            type="password"
            name="confirm_pswrd"
            id="password_2"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <span
            className={`${'material-symbols-outlined'} ${SignUpStyle.eye}`}
            id="eye_2"
            onClick={toggleFinalPassword}
          >
            visibility_off 
          </span>
        </div>
      </div>
      <form className={`${SignUpStyle.field} ${SignUpStyle.item}`}>
        <label name="user_image_name" htmlFor="" className={SignUpStyle.item} >
          Select Image
        </label>
        <input type="file" name="user_image" id="" accept="image/*" onChange={uploadImage} />
      </form>
      <a className={SignUpStyle.button} href="#" onClick={()=>SubmitForm()}>
        Continue To Chat
      </a>
      <span>
        Already signed up? <a href="" onClick={()=>navigate('login')}>Login Now</a>
      </span>
    </div>
  );
};


