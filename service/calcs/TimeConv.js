var swisseph = require ('swisseph');
var constants = require('./constants');

var date = {year: 1994, month: 5, day: 28, hour: 18.85, timezone: 8};
var geoloc = {lat: 30.5002, lon: 114.3438
}
var version = swisseph.swe_version ();
var flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_SIDEREAL;
 
// var julday = swisseph.swe_julday (date.year, date.month, date.day, date.hour, flag);

 

var hsys  = 'w';




/**
 * Given local time and returns a Promise be resolved a pair of julian universal time
 * and ephemeris time will be returned
 *
 * @param {number} yr
 * @param {number} mth
 * @param {number} day
 * @param {number} hr
 * @param {number} min
 * @param {number} sec
 * @param {number} timezone
 * @returns 
 */
function calc_utc_timezone_to_jul_day(yr, mth, day, hr, min, sec, timezone){
	swisseph.swe_set_ephe_path (__dirname + '/../ephe');
	function timezone_to_utc (yr, mth, day, hr, min, sec, timezone) {
	return new Promise(function(resolve, reject) {
		swisseph.swe_utc_time_zone(yr, mth, day, hr, min, sec, timezone, function(utc) {
		if (!utc.error) {
			// console.log("utc" + utc);
			resolve(utc);
		}
		else {
			reject("Failure in time_zone to utc conversion");
		}
	});
	});
}

	function utc_to_jul_day(yr, mth, day, hr, min, sec, timezone) {
		return new Promise((resolve, reject) => {
			swisseph.swe_utc_to_jd(yr, mth,day, hr, min, sec, swisseph.SE_GREG_CAL, (res) => {
				if (!res.error) {
					resolve(res);
				}
				else {
					reject("Failure in utc to julian day conversion");
				}
			})
		})
	}
	const julday =  timezone_to_utc(yr, mth, day, hr, min, sec, timezone).then(utc => {
		return utc_to_jul_day(utc.year, utc.month, utc.day, utc.hour, utc.minute, utc.second, timezone);
	}).catch(err => {
		console.log(err);
		return err;
	});
	// console.log(julday);
	return julday;

	// let julday;
	// swisseph.swe_utc_time_zone(yr, mth, hr, min, sec, time, function(utc) {
	// 	console.log(utc);

	// 	swisseph.swe_utc_time_zone
	// })
}


// let jul = calc_utc_timezone_to_jul_day(1994, 5, 28, 18, 50, 2.25, 8);

// console.log("jul" + jul);

module.exports = calc_utc_timezone_to_jul_day;