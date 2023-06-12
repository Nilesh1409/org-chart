import React, { useState } from "react";
import { compress } from "image-conversion";
import axios from "axios";
import { Input, Button } from "antd";

export default function UploadData() {
  const [uploadedImg, setUploadedImg] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleCrop = async (event) => {
    const image = document.getElementById("thumbnail").files[0];
    const compressedImage = await compress(image, {
      quality: 0.1,
      maxWidth: 200,
      maxHeight: 200,
    });

    const reader = new FileReader();
    reader.readAsDataURL(compressedImage);

    reader.addEventListener("load", () => {
      setUploadedImg(reader.result);
    });
  };

  const handleUpload = async () => {
    try {
      const image = document.getElementById("thumbnail").files[0];
      const compressedImage = await compress(image, {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      });

      const croppedFormData = new FormData();
      croppedFormData.append("file", compressedImage);
      croppedFormData.append("upload_preset", "sbc8v3zb");

      const croppedResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dvbg1a9wo/image/upload",
        croppedFormData
      );

      setUploadedUrl(croppedResponse.data.secure_url);
    } catch (error) {
      console.log("Error cropping and uploading image:", error);
    }
  };

  console.log("image", uploadedUrl);

  return (
    <div style={{ margin: "auto", width: "400px" }}>
      <div>
        <Input onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <br />
        <br />
        <Input onChange={(e) => setRole(e.target.value)} placeholder="Role" />
        <br />
        <br />

        <input type="file" id="thumbnail" onChange={handleCrop} />
        <br />
        <br />
        <br />
      </div>
      <Button onClick={handleUpload} type="primary">
        Upload
      </Button>
      {uploadedImg && (
        <img style={{ height: "250px" }} src={uploadedImg} alt="Uploaded" />
      )}
      {/* {croppedImg && <img src={croppedImg} alt="Cropped" />}
      {croppedImg && <button onClick={handleCrop}>Crop and Upload</button>} */}
    </div>
  );
}
