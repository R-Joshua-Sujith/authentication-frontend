import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const email = useSelector((state) => state.email);
  const [user, setUser] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await axios
        .get(`https://maindatabase-joshua14.onrender.com/auth/users/${email}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setLoading(false);
          setUser(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          setLoading(false);
          alert("Oops Session Expired");
          dispatch({ type: "logout" });
        });
    };
    getUser();
  }, []);
  const render = (
    <div className="center">
      <img className="profile" src={user.image} alt="" width="70%" />
      <p className="name">Hi {user.name}</p>
      <div>
        <h3>Your Details</h3>
        <p>Name : {user.name}</p>
        <p>Email : {user.email}</p>
      </div>
      <div className="actions">
        <button className="button" onClick={() => navigate("editProfile")}>
          Edit Profile
        </button>
        <button className="button" onClick={() => dispatch({ type: "logout" })}>
          logout
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <div className="screen">{Loading ? <LoadingSpinner /> : render}</div>
    </div>
  );
};

export default Home;
