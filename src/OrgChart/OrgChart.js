import React, { Component } from "react";
import OrgChart from "../mytree";

var localData = JSON.parse(localStorage.getItem("org_data")) || [];
export default class CustomOrgChart extends Component {
  componentDidUpdate(prevProps) {
    // Check if the 'render' prop has changed
    if (this.props.render !== prevProps.render) {
      localData = JSON.parse(localStorage.getItem("org_data"));
    }
  }
  render() {
    return (
      <div style={{ height: "100%" }}>
        {/* <UploadData /> */}
        <OrgChart
          template={"diva"}
          enableSearch={false}
          enableDragDrop={true}
          nodes={localData}
        />
      </div>
    );
  }
}
