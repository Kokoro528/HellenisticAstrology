// export var julday = swisseph.swe_julday(
//   date.year,
//   date.month,
//   date.day,
//   date.hour,
//   swisseph.SE_GREG_CAL,
// );
var swisseph = require('swisseph');

const sweflag = swisseph.SEFLG_SPEED | swisseph.SEFLG_SIDEREAL;

var cdata = {
  planets: {
    sun: {name: null, lon: null, lat: null, spd: null, r: null},
    moon: {name: null, lon: null, lat: null, spd: null, r: null},
    mercury: {name: null, lon: null, lat: null, spd: null, r: null},
    venus: {name: null, lon: null, lat: null, spd: null, r: null},
    mars: {name: null, lon: null, lat: null, spd: null, r: null},
    jupiter: {name: null, lon: null, lat: null, spd: null, r: null},
    saturn: {name: null, lon: null, lat: null, spd: null, r: null},
    uranus: {name: null, lon: null, lat: null, spd: null, r: null},
    neptune: {name: null, lon: null, lat: null, spd: null, r: null},
    pluto: {name: null, lon: null, lat: null, spd: null, r: null},
    'north node': {
      name: 'north node',
      lon: null,
      lat: null,
      spd: null,
      r: null,
    },
    'south node': {
      name: 'south node',
      lon: null,
      lat: null,
      spd: null,
      r: null,
    },
    chiron: {name: null, lon: null, lat: null, spd: null, r: null},
    pholus: {name: null, lon: null, lat: null, spd: null, r: null},
    ceres: {name: null, lon: null, lat: null, spd: null, r: null},
    pallas: {name: null, lon: null, lat: null, spd: null, r: null},
    juno: {name: null, lon: null, lat: null, spd: null, r: null},
    vesta: {name: null, lon: null, lat: null, spd: null, r: null},
    cupido: {name: null, lon: null, lat: null, spd: null, r: null},
    chariklo: {name: null, lon: null, lat: null, spd: null, r: null},
    chaos: {name: null, lon: null, lat: null, spd: null, r: null},
    eris: {name: null, lon: null, lat: null, spd: null, r: null},
    nessus: {name: null, lon: null, lat: null, spd: null, r: null},
  },
  houses: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  ascendant: null,
  mc: null,
};

const hsys = {
  placidus: 'P',
  equal: 'N',
  whole: 'W'
}

module.exports = {sweflag, hsys};


