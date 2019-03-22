import React, { Component } from "react";
// import Pie from "./pie";
import Signs from "../utils/Signs";

import ReactDOM from "react-dom";
import * as d3 from "d3";

class Astrolabe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: {
        house: [
          241.94437755621152,
          272.5265540727432,
          306.39370919877683,
          341.1476631085877,
          12.635550754026099,
          39.13846195934531,
          61.94437755621152,
          92.52655407274318,
          126.39370919877683,
          161.14766310858772,
          192.63555075402613,
          219.1384619593453
        ],
        ascendant: 241.94437755621152,
        mc: 161.14766310858772,
        armc: 162.60557921667976,
        vertex: 112.79192434933002,
        equatorialAscendant: 253.96400670726976,
        kochCoAscendant: 267.6009735469297,
        munkaseyCoAscendant: 225.1422687237947,
        munkaseyPolarAscendant: 87.60097354692971
      }
    };
    this.astro = React.createRef();
  }

  renderAstrolabe(ref) {
    let screenWidth = window.innerWidth;
    const margin = { left: 20, top: 20, right: 20, bottom: 20 };
    let width = Math.min(screenWidth, 500) - margin.left - margin.right;
    let height = Math.min(screenWidth, 500) - margin.top - margin.bottom;

    let radius = (Math.min(height, width) * 0.9) / 2;
    // Centers the pie chart
    let x = width / 2;
    let y = height / 2;

    var svg = d3
      .select(this.astro.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("class", "wrapper")
      .attr(
        "transform",
        "translate(" +
          (width / 2 + margin.left) +
          "," +
          (height / 2 + margin.top) +
          ")"
      );

    // const arc = d3
    //   .arc()
    //   .innerRadius((width * 0.9) / 2)
    //   .outerRadius(width / 2);

    

    const eq_hs = this.equal_house();
    const pie = d3
      .pie()
      .startAngle(- (Math.PI * 2) + eq_hs[0][0])
      .endAngle(eq_hs[0][0])
      // .value(function(d) {
      //   return d; })
      .padAngle(0.01)
      .sort(null);

    const houseLabels = svg
      .selectAll(".houseLabel")
      .data(pie(eq_hs))
      .enter()
      .append("path")
      .attr("class", "houseLabel")
      .attr("id", function(d, i) {
        return "houseLabel_" + i;
      })
      .attr("fill", "aliceblue");
    // .attr("d", arc);

    const houseArcs = d3.arc().innerRadius((width * 0.9) / 2)
        .outerRadius(width / 2);
    
    eq_hs.forEach((e, i) => {
      const houseLabel = svg.select("#houseLabel_" + i);
      // const arc_i = d3
      //   .arc()     
        
      houseLabel.attr("d", houseArcs.startAngle(e[0])
        .endAngle(e[1]))
      });

    svg.selectAll(".houseText")
    .data(eq_hs).enter()
    .append("text").attr("class", "houseText")
    .each()
    .append("textPath").attr("xlink:href", (d, i) => {
      return "#houseLabel_" + i;
    })
    .attr("text-anchor","end").text((d, i) => Signs.properties[i]);

    // svg.selectAll(".houseText").forEach ((e, i) => {
    //   e.append(test)
    // })
    // .attr("transform", function(d) {
    //   return "translate(" + house
    // })

    
    // draw arcs for each houses

    // console.log(houseArcs);
  }

  render() {
  return (<svg ref={this.astro} />);
  }

  componentDidMount() {
    this.renderAstrolabe(this.astro);
  }

  // generate position for 12 houses
  equal_house = () => {
    const ascendant = this.state.houses.ascendant;
    const aries = ascendant;
    const eq_hs = [...Array(12)].map((e, i) => {
      let startAngle = aries - i * 30;
      let endAngle = aries - (i + 1) * 30;
      return [(startAngle * Math.PI) / 180, (endAngle * Math.PI) / 180];
    });
    console.log("eq_hs", eq_hs);
    return eq_hs;
  };
  correct_angle = () => {
    const house = this.state.houses.house;
    const ascendant = this.state.houses.ascendant;
    let angles = [];
    let temp = house.map((e, i) => {
      let diff = (360 + e - ascendant) % 360;
      diff *= Math.PI / 180;
      console.log("diff", diff);
      return diff;
    });

    temp.forEach((e, i) => {
      if (i < temp.length - 1) {
        angles.push([e, temp[(i + 1) % house.length]]);
      } else {
        angles.push([e, Math.PI * 2]);
      }
    });
    return angles;
  };

}



export default Astrolabe;
