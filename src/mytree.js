import React, { Component } from "react";
import OrgChart from "@balkangraph/orgchart.js";

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
      mouseScrool: OrgChart.action.none,
      nodeBinding: {
        field_0: "name",
        field_1: "title",
        img_0: "img",
      },
      // nodeBinding: {
      //   field_0: "name",
      //   field_1: "title",
      //   img_0: "img",
      // },
    });
  }

  render() {
    return <div id="tree" ref={this.divRef}></div>;
  }
}
