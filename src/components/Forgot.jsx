import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallLoader from "./SmallLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sendOTP = async () => {
    if (email === "") {
      toast.warning("Please Fill all the Fields");
    } else {
      setLoading(true);
      await axios
        .post(
          "https://maindatabase-joshua14.onrender.com/auth/forgot-password",
          {
            email,
          }
        )
        .then((res) => {
          setLoading(false);
          navigate("/reset-password");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <div>
      <div className="screen">
        <ArrowBackIcon
          className="arrow"
          onClick={() => {
            navigate("/");
          }}
        />
        <h2>Forgot Password ?</h2>
        <input
          className="input"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {Loading ? (
          <SmallLoader />
        ) : (
          <button className="button" onClick={sendOTP}>
            Send OTP
          </button>
        )}
        <img src="forgot.png" width="180px" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Forgot;
