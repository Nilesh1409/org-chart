import { Button } from "antd";
import React, { Component, useState } from "react";
import CustomOrgChart from "./OrgChart/OrgChart";
import UploadData from "./OrgChart/UploadData";

export default function App() {
  const [render, reRender] = useState(0);
  const [add, setAdd] = useState(false);
  // render() {
  return (
    <>
      <div style={{ height: "100%", border: "1px solid blue" }}>
        <CustomOrgChart render={render} />
      </div>
      {add ? <UploadData reRender={reRender} setAdd={setAdd} /> : ""}
      <Button onClick={() => setAdd(!add)} type="primary">
        {add ? "Finish adding" : "Add more"}
      </Button>
    </>
  );
  // }
}
