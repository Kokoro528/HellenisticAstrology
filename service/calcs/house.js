var swisseph = require("swisseph");
/**
 * 
 *
 * @param {Number} julianday
 * @param {double} geolat
 * @param {double} geolon
 * @param {String} hsys house system
 * @returns
 */
function geoloc_houses(julianday, geolat, geolon, hsys) {
    swisseph.swe_set_ephe_path (__dirname + '/../ephe');
    let houses = new Promise(function(resolve, reject) {
        swisseph.swe_houses(julianday, geolat, geolon, hsys, res => {
            if (!res.error) {
                resolve(res);
            } else {
                reject(res.error);
            }
        });
    });
    return houses;
}

module.exports = { geoloc_houses };


