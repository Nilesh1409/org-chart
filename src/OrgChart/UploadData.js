import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { compress } from "image-conversion";

import "../App.css";

// import { Button } from "react-bootstrap";

export default function UploadData() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploadedImg, setUploadedImg] = useState("");

  const handleUpload = async (event) => {
    const reader = new FileReader();
    const image = document.getElementById("thumbnail").files[0];
    const compressedImage = await compress(image, {
      quality: 0.1, // Adjust the quality as desired (0.0 - 1.0)
      maxWidth: 200, // Set the maximum width of the image
      maxHeight: 200, // Set the maximum height of the image
    });
    console.log("event.target.files", event.target.files, event.target, image);

    if (image instanceof Blob) {
      reader.readAsDataURL(compressedImage);

      reader.addEventListener("load", async () => {
        // const compressedImage = await compress(reader.result, {
        //   quality: 0.2, // Adjust the quality as desired (0.0 - 1.0)
        //   maxWidth: 200, // Set the maximum width of the image
        //   maxHeight: 200, // Set the maximum height of the image
        // });
        console.log("compressedImage", compressedImage);
        setUploadedImg(reader.result);

        // localStorage.setItem("thumbnail", reader.result);
      });
    }
  };
  let img = localStorage.getItem("thumbnail");
  // img = img.slice(5, img.length);
  // console.log("img", img);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  console.log("img", uploadedImg);
  return (
    <>
      <div>
        {uploadedImg ? (
          <div className="crop-container">
            <Cropper
              image={uploadedImg}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              // onCropComplete={}
            />

            {/* </div> */}
            <div style={{ zIndex: 100000 }} className="controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="zoom-range"
              />
              {/* <button onClick={()=>onCropComplete()} >Done</button> */}
            </div>
          </div>
        ) : (
          ""
        )}

        <div>
          <input type="file" id="thumbnail" />
        </div>
        <button onClick={(e) => handleUpload(e)}>Upload</button>
        <img src={img} />
      </div>
    </>
  );
}
