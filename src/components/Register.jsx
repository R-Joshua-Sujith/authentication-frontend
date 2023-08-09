import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SmallLoader from "./SmallLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("lllll.png");
  const [Loading, setLoading] = useState(false);

  const [status, setStatus] = useState(
    <span>
      Upload photo <sub>max size 50kb</sub>
    </span>
  );
  const submit = async () => {
    if (name == "" || email == "" || password == "") {
      toast.warning("Please enter all the fields");
    } else if (image == "lllll.png") {
      toast.warning("Please upload the image");
    } else {
      setLoading(true);
      await axios
        .post("https://maindatabase-joshua14.onrender.com/auth/signup", {
          name,
          email,
          password,
          image,
        })
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
      setName("");
      setEmail("");
      setPassword("");
      setImage("lllll.png");
      setStatus(
        <span>
          Upload photo <sub>max size 50kb</sub>
        </span>
      );
    }
  };

  function getBase64ImageSize(base64Data) {
    const paddingIndex = base64Data.indexOf("=");
    const base64Length = paddingIndex === -1 ? base64Data.length : paddingIndex;
    const fileSizeBytes = parseInt((base64Length * 0.75).toFixed(0), 10);
    return fileSizeBytes;
  }

  const converToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64Data = fileReader.result.split(",")[1];
        const fileSizeBytes = getBase64ImageSize(base64Data);
        if (fileSizeBytes > 51200) {
          alert("Image size exceeds 50KB");
        } else {
          resolve(fileReader.result);
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await converToBase64(file);
    setImage(base64);
    setStatus(<span>Image Uploaded ✅</span>);
    console.log(base64);
  };

  const handleDownload = () => {
    // Replace 'image-url.jpg' with the actual URL of the image you want to download
    const imageUrl = "profile1.jpeg";
    const link = document.createElement("a");
    link.href = imageUrl;

    // Set the desired filename for the downloaded image
    link.download = "profile1.jpeg";

    // Append the link to the document and trigger the click event
    document.body.appendChild(link);
    link.click();

    // Clean up the temporary link element
    document.body.removeChild(link);
  };

  return (
    <div>
      <button className="button download" onClick={handleDownload}>
        Click here to Download 50kb image
      </button>
      <div className="screen">
        <h2>Sign Up</h2>
        <div className="form">
          <label htmlFor="file-upload" className="custom-file-upload">
            <img
              className="uploadImage"
              src={image}
              alt="profile-upload"
              width="40px"
            />
            <span> {status}</span>
          </label>
          <input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            className="upload"
            onChange={(e) => handleFileUpload(e)}
          />
          <input
            type="text"
            placeholder="Enter Name"
            className="input"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
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
            <button className="button" onClick={submit}>
              Sign Up
            </button>
          )}
        </div>
        <h4>
          Already have an account ?<br />
          <span
            className="signup"
            onClick={() => {
              navigate("/");
            }}
          >
            Sign In
          </span>
        </h4>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
