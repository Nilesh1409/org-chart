import React, { Component } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import "./App.css";

let userData = JSON.parse(localStorage.getItem("org_data")) || [];
export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.chart = new OrgChart(this.divRef.current, {
      nodes: this.props.nodes,
      template: "diva",
      enableSearch: false,
      enableDragDrop: true,
      mouseScrool: OrgChart.action.zoom,
      zoom: {
        enabled: true,
        step: 0.1,
        max: 1.5,
        min: 0.5,
      },
      nodeBinding: {
        field_0: "name",
        field_1: "title",
        img_0: "img",
      },
      // drop: (
      //   sender,
      //   draggedNodeId,
      //   draggedParentId,
      //   draggedPosition,
      //   droppedNodeId
      // ) => {
      //   // Access the updated data here
      //   console.log(
      //     "droped",
      //     sender,
      //     draggedNodeId,
      //     draggedParentId,
      //     draggedPosition,
      //     droppedNodeId
      //   );
      //   userData.forEach((item) => {
      //     if (item.id === draggedNodeId) {
      //       console.log("draggedParentId", draggedParentId, item);
      //       item.pid = draggedParentId;
      //     }
      //   });
      //   localStorage.setItem("org_data", JSON.stringify(userData));
      //   // const updatedData = this.chart.getHierarchy();
      //   // console.log(updatedData);
      // },
      // nodeBinding: {
      //   field_0: "name",
      //   field_1: "title",
      //   img_0: "img",
      // },
    });
    this.chart.on(
      "drop",
      (
        sender,
        draggedNodeId,
        draggedParentId,
        draggedPosition,
        droppedNodeId
      ) => {
        // Access the updated data here
        console.log(
          "Dropped",
          sender,
          draggedNodeId,
          draggedParentId,
          draggedPosition,
          droppedNodeId
        );

        userData.forEach((item) => {
          if (item.id === draggedNodeId) {
            console.log("draggedParentId", draggedParentId, item);
            item.pid = draggedParentId;
          }
        });
        localStorage.setItem("org_data", JSON.stringify(userData));
      }
    );
    this.chart.on("updateNode", (sender, args) => {
      const { id, data } = args;
      console.log("node update", id, data);
      // Access the edited title and update the userData array
      const nodeToUpdate = userData.find((item) => item.id === id);
      if (nodeToUpdate) {
        nodeToUpdate.title = data.field_1;
        localStorage.setItem("org_data", JSON.stringify(userData));
      }

      // localStorage.setItem("org_data", JSON.stringify(userData));
    });
  }

  render() {
    return <div id="tree" ref={this.divRef}></div>;
  }
}
