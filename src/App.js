import React, { Component } from "react";
import CustomOrgChart from "./OrgChart/OrgChart";
import UploadData from "./OrgChart/UploadData";

export default function App() {
  // render() {
  return (
    <div style={{ height: "100%" }}>
      <CustomOrgChart />
      <UploadData />
    </div>
  );
  // }
}
