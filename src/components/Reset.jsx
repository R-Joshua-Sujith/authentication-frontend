import React, { useState } from "react";
import SmallLoader from "./SmallLoader";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
const Reset = () => {
  const [otp, setOtp] = useState("");
  const [Loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState(false);

  const reset = async () => {
    if (otp === "" || newPassword === "") {
      toast.warning("Please Fill all the fields");
    } else {
      setLoading(true);
      await axios
        .post(
          "https://maindatabase-joshua14.onrender.com/auth/reset-password",
          {
            otp,
            newPassword,
          }
        )
        .then((res) => {
          setLoading(false);
          setValue(true);
          setOtp("");
          setNewPassword("");
          toast.success(`${res.data.message}`);
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
        <ArrowBackIcon className="arrow" onClick={() => navigate("/forgot")} />
        <h2>Reset Password</h2>
        <input
          type="text"
          className="input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        {Loading ? (
          <SmallLoader />
        ) : (
          <button className="button" onClick={reset}>
            Reset password
          </button>
        )}
        {value && (
          <button
            className="button sign"
            onClick={() => {
              navigate("/");
            }}
          >
            Click here to sign In
          </button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Reset;
