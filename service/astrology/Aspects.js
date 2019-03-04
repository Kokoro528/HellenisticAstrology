AspectTypes = Object.freeze({
    "conjunct":       { major: true,  angle:   0,     orb: 6  , symbol: "<" },
    "semisextile":    { major: false, angle:  30,     orb: 3  , symbol: "y" },
    "decile":         { major: false, angle:  36,     orb: 1.5, symbol: ">" },
    "novile":         { major: false, angle:  40,     orb: 1.9, symbol: "M" },
    "semisquare":     { major: false, angle:  45,     orb: 3  , symbol: "=" },
    "septile":        { major: false, angle:  51.417, orb: 2  , symbol: "V" },
    "sextile":        { major: true,  angle:  60,     orb: 6  , symbol: "x" },
    "quintile":       { major: false, angle:  72,     orb: 2  , symbol: "Y" },
    "bilin":          { major: false, angle:  75,     orb: 0.9, symbol: "-" },
    "binovile":       { major: false, angle:  80,     orb: 2  , symbol: ";" },
    "square":         { major: true,  angle:  90,     orb: 6  , symbol: "c" },
    "biseptile":      { major: false, angle: 102.851, orb: 2  , symbol: "N" },
    "tredecile":      { major: false, angle: 108,     orb: 2  , symbol: "X" },
    "trine":          { major: true,  angle: 120,     orb: 6  , symbol: "Q" },
    "sesquiquadrate": { major: false, angle: 135,     orb: 3  , symbol: "b" },
    "biquintile":     { major: false, angle: 144,     orb: 2  , symbol: "C" },
    "inconjunct":     { major: false, angle: 150,     orb: 3  , symbol: "n" },
    "treseptile":     { major: false, angle: 154.284, orb: 1.1, symbol: "B" },
    "tetranovile":    { major: false, angle: 160,     orb: 3  , symbol: ":" },
    "tao":            { major: false, angle: 165,     orb: 1.5, symbol: "—" },
    "opposition":     { major: true,  angle: 180,     orb: 6  , symbol: "m" }
})

class Aspect {
    constructor(planet1, planet2) {
        this.planet1 = planet1;
        this.planet2 = planet2;
        this.calc();
    }

    get angle() {
        return this._angle;
    }
    get type() {
        return this._type;
    }
    calc() {
        const p1 = this.planet1;
        const p2 = this.planet2;
        if (p1.name === p2.name) {
            return null;
        }

        let ng = Math.abs(p1.longitude - p2.longitude);
        
        if (ng > AspectTypes.opposition.orb + 180) {
            ng = 360 - ng;
            
        }
        this._angle = ng;

        Object.keys(AspectTypes).forEach(key => {
            let t = AspectTypes[key];
            console.log(t.angle + t.orb);
            if (t.angle - t.orb <= this._angle &&  t.angle + t.orb >= this._angle) {
                console.log ("hey");
                this._type = key;
            }
        });
        // console.log(this._type);
        if (typeof this._type === "undefined") {
            this._type = "noaspect";
        }
    }
    
    
}

module.exports = {Aspect, AspectTypes};