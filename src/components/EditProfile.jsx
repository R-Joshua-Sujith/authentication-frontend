import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingSpinner from "./LoadingSpinner";
import SmallLoader from "./SmallLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.css";
const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const emaill = useSelector((state) => state.email);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  const [Loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState(
    <span>
      Upload photo <sub>max size 50kb</sub>
    </span>
  );

  const edit = async () => {
    if (name == "" || image == "") {
      toast.warning("Please fill all the required fields");
    } else {
      setLoad(true);
      await axios
        .patch(
          `https://maindatabase-joshua14.onrender.com/auth/edit/${emaill}`,
          {
            name,
            image,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setLoad(false);
          toast.success("Updated Successfully");
        })
        .catch((err) => {
          setLoad(false);
          toast.error("Oops could not update Session Expired");
          dispatch({ type: "logout" });
        });
    }
  };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await axios
        .get(
          `https://maindatabase-joshua14.onrender.com/auth/users/${emaill}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setLoading(false);
          setName(response.data.name);
          setEmail(response.data.email);
          setImage(response.data.image);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Oops Session Expired");
          dispatch({ type: "logout" });
        });
    };
    getUser();
    console.log(token);
  }, []);

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
    const imageUrl = "profile2.jpeg";
    const link = document.createElement("a");
    link.href = imageUrl;

    // Set the desired filename for the downloaded image
    link.download = "profile2.jpeg";

    // Append the link to the document and trigger the click event
    document.body.appendChild(link);
    link.click();

    // Clean up the temporary link element
    document.body.removeChild(link);
  };
  const render = (
    <div>
      <h1>Edit Profile</h1>
      <div>
        <label>Name</label>
        <br></br>
        <input
          type="text"
          placeholder="Enter Name"
          className="input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br></br>
        <br />
        <label htmlFor="file-upload" className="custom-file-upload">
          <img
            className="uploadImage"
            src={image}
            alt="profile-upload"
            width="40px"
          />
          <span>{status}</span>
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
      </div>
      {load ? (
        <SmallLoader />
      ) : (
        <button className="button edit" onClick={edit}>
          Save Changes
        </button>
      )}
    </div>
  );
  return (
    <div>
      <button className="button download" onClick={handleDownload}>
        Click here to Download 50kb image
      </button>
      <div className="screen">
        <ArrowBackIcon
          className="arrow"
          onClick={() => navigate("/")}
        ></ArrowBackIcon>
        {Loading ? <LoadingSpinner /> : render}
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
