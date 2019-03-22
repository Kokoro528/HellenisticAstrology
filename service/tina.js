var swisseph = require("swisseph");
var utcToJulian = require("./calcs/TimeConv");
var houses = require("./calcs/house");
var planets = require("./calcs/planets");
var Signs = require("../Signs");

var tina = {
    year: 1989,
    month: 10,
    day: 17,
    hour: 12,
    min: 5,
}


var jiujiang = {lat:29.7, lon: 116};
var to_hscp = lon => {
    return Signs.properties[Math.ceil(lon / 30)];
  };
  
  var isRetrograde = body => {
    return body.longitudeSpeed < 0;
  };

utcToJulian(tina.year, tina.month, tina.day, tina.hour, tina.min, 2, 8).then (jul => {
    houses.geoloc_houses(jul.julianDayUT, jiujiang.lat, jiujiang.lon, 'P').then(hss => {
        console.log(hss);
    })
      const all_major_planets = {};
    Promise.all(
        [...Array(10).keys()].map(e => {
          return planets.loc_planet(
            jul,
            e,
            swisseph.SEFLG_TRUEPOS|swisseph.SEFLG_SPEED,
            1
          );
        })
      ).then(values => {
          
        values.forEach(e => {
          all_major_planets[e.name] = e;
          console.log(e.name + " " + to_hscp(all_major_planets[e.name].longitude));
        });
      });

})




