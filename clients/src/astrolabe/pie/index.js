import React, { Component } from "react";
import * as d3 from "d3";
import { colors } from "d3-scale";

class Pie extends Component {
  constructor(props) {
    super(props);
    console.log("afure");
    console.log(props);
    // https://github.com/d3/d3/wiki/Ordinal-Scales#category10
    // this.colorScale = scale.category10();
    // console.log(pie);
  }

  render() {
    let { x, y, placidus, equalHouse, stroke } = this.props;
    // https://github.com/d3/d3/wiki/Pie-Layout
    let pie = d3.pie();
    // .value(function(d) {
    //     return d.toFixed(3);
    // });
    // console.log(data);

    return (
      <g transform={`translate(${x}, ${y})`} strokeWidth="2" fill="blue">
        {/* Render a slice for each data point */}
        {pie(placidus).map(this.renderPlacidus)}
        {pie(equalHouse).map(this.renderEqualHouses)}
      </g>
    );
  }

  renderPlacidus = (value, i) => {
    // We'll create this component in a minute
    return (
      <Placidus
        key={i}
        idx={i}
        outerRadius={this.props.radius - 50}
        value={value.data}
        stroke="pink"
      />
    );
  };

  renderEqualHouses = (value, i) => {
    return (
      <EqualHouse
        key={i}
        idx={i}
        outerRadius={this.props.radius}
        innerRadius={this.props.radius - 50}
        degree={value.data[0]}
        sign={value.data[1]}
        stroke="aliceblue"
      />
    );
  };
}

const EqualHouse = ({
  idx,
  innerRadius,
  outerRadius,
  degree,
  stroke,
  sign
}) => {
  // https://github.com/d3/d3/wiki/SVG-Shapes#arc
  let arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(degree)
    .endAngle(degree - Math.PI / 6)
    // .centroid( Math.PI / 12);
  console.log(idx + "key");
  return (
    <g >
      <path d={arc(Math.PI / 6)} id={"equalHouse_" + idx} stroke={stroke} strokeWidth="2"  />
      <text
        // transform={`translate(${arc.centroid(Math.PI / 12)})`}
        stroke="aliceblue"
        // font-size="14"
        textAnchor="start"
        x="3" dy="-5"
        lengthAdjust="spacingAndGlyphs"

      >
      <textPath xlinkHref={"#equalHouse_" + idx} fill="teal">
        {sign}
        </textPath>
      </text>
    </g>
  );
};

class Placidus extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { value, stroke, innerRadius = 0, outerRadius } = this.props;
    let midRadius = outerRadius * 0.9;
    console.log(value);
    // https://github.com/d3/d3/wiki/SVG-Shapes#arc
    let arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(midRadius)
      .startAngle(value[0])
      .endAngle(value[1]);

    let arc_inner = d3
      .arc()
      .innerRadius(midRadius)
      .outerRadius(outerRadius)
      .startAngle(value[0])
      .endAngle(value[1]);

    return (
      <g stroke={stroke}>
        <path d={arc()}  />
        <path d={arc_inner()} />
      </g>
    );
  }
}

export default Pie;
