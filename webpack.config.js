const path = require('path');
const glob = require('glob');

module.exports = {
    entry: toObject(glob.sync('./src/**.**.js')),
    output: {
        filename: '[name].js'
    },
    mode: "production"
};

function toObject(paths) {
    const entry = {
    	sliderEndless: "./src/js/sliders/sliderEndless.js",
    	sliderWithoutFight: "./src/js/sliders/sliderWithoutFight.js",
    };
    paths.forEach(function(p) {
        const name = path.basename(p, '.js');
        entry[name] = p;
    });
    return entry;
}