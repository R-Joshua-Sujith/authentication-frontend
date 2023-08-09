import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import SmallLoader from "./SmallLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const login = async () => {
    if (email == "" || password == "") {
      toast.warning("Please enter all the fields");
    } else {
      setLoading(true);
      await axios
        .post("https://maindatabase-joshua14.onrender.com/auth/login", {
          email,
          password,
        })
        .then((res) => {
          setLoading(false);
          dispatch({ type: "login", email: email, token: res.data.token });
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    }
  };
  return (
    <div>
      <div className="screen">
        <h2>Sign In</h2>
        <div className="form">
          <input
            type="email"
            placeholder="Enter Email"
            className="input"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Password"
            className="input"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {Loading ? (
            <SmallLoader />
          ) : (
            <button className="button" onClick={login}>
              Login
            </button>
          )}

          <div
            className="forgot"
            onClick={() => {
              navigate("/forgot");
            }}
          >
            Forgot Password ?
          </div>
        </div>
        <h4>
          Dosen't have an account ?<br />
          <span
            className="signup"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </span>
        </h4>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
