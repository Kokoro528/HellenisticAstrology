var swisseph = require("swisseph");

// #define SE_ECL_NUT                              -1     

// #define SE_SUN                                     0      

// #define SE_MOON                                  1      

// #define SE_MERCURY                             2      

// #define SE_VENUS                                 3      

// #define SE_MARS                                   4      

// #define SE_JUPITER                               5      

// #define SE_SATURN                               6      

// #define SE_URANUS                               7      

// #define SE_NEPTUNE                              8      

// #define SE_PLUTO                                  9      

// #define SE_MEAN_NODE                        10     

// #define SE_TRUE_NODE                         11

// #define SE_MEAN_APOG                         12     

// #define SE_OSCU_APOG                         13   

// #define SE_EARTH                                  14

// #define SE_CHIRON                               15

// #define SE_PHOLUS                               16

// #define SE_CERES                                  17

// #define SE_PALLAS                                18

// #define SE_JUNO                                   19

// #define SE_VESTA                                  20

// #define SE_INTP_APOG                          21

// #define SE_INTP_PERG                          22

 

// #define SE_NPLANETS                            23

// #define SE_FICT_OFFSET                        40

// #define SE_NFICT_ELEM                        15

// #define SE_AST_OFFSET                        10000

 

// /* Hamburger or Uranian "planets" */

// #define SE_CUPIDO                                40

// #define SE_HADES                                 41

// #define SE_ZEUS                                   42

// #define SE_KRONOS                               43

// #define SE_APOLLON                              44

// #define SE_ADMETOS                             45

// #define SE_VULKANUS                           46

// #define SE_POSEIDON                           47

 

// /* other fictitious bodies */

// #define SE_ISIS                                     48

// #define SE_NIBIRU                                 49

// #define SE_HARRINGTON                       50

// #define SE_NEPTUNE_LEVERRIER           51

// #define SE_NEPTUNE_ADAMS                 52

// #define SE_PLUTO_LOWELL                    53

// #define SE_PLUTO_PICKERING               54

const loc_planet = (julday, iplt, flag, UT) => {
    swisseph.swe_set_ephe_path (__dirname + '/../ephe');
    let time_helper = (resolve, reject, calc, julday_t) => {
        calc(julday_t, iplt, flag, (body) => {
            if (!body.err) {
                let name;
                swisseph.swe_get_planet_name(iplt, (plt) => {
                    name = plt;
                })

                resolve(Object.assign(name, body));
            }
            else {
                reject(body.err);
            }
        });
    }
    return new Promise((resolve, reject) => {
        if (UT) {
            return time_helper(resolve, reject, swisseph.swe_calc_ut, julday.julianDayUT);
        }
        else {
            return time_helper(resolve, reject, swisseph.swe_calc, julday.julianDayET);
        }
    })
}

class Planet {
    constructor(obj) {
        
    }
}

module.exports = {loc_planet, Planet};