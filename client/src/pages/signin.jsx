import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./style2.css";
  import { BASEURL } from "../config";

const SignIn = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        `${BASEURL}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      document.cookie = `channelId=${res.data.channelId}; path=/`;
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (img) formData.append("img", img);

      const res = await axios.post(
        `${BASEURL}/api/auth/signup`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      document.cookie = `channelId=${res.data.channelId}; path=/`;
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        <h1 className="signin-title">{isSignup ? "Sign up" : "Sign in"}</h1>

        {isSignup && (
          <>
            <input
              className="signin-input"
              placeholder="Username"
              
              onChange={(e) => setName(e.target.value)}
            />
            <label className="upload-label">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
              className="upload-input"
              required
            />
          </>
        )}

        <input
          className="signin-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="signin-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="signin-button"
          onClick={isSignup ? handleSignup : handleLogin}
        >
          {isSignup ? "Sign up" : "Sign in"}
        </button>

        <p className="signin-toggle">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Sign in" : "Sign up"}
          </span>
        </p>
      </div>

      <div className="signin-more">
        English (USA)
        <div className="signin-links">
          <span className="signin-link">Help</span>
          <span className="signin-link">Privacy</span>
          <span className="signin-link">Terms</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
