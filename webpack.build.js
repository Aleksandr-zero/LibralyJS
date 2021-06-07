const path = require('path');
const glob = require('glob');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            drop_console: true,
            keep_classnames: true,
          },
          mangle: {
            keep_fnames: true,
            keep_fnames: false,
          },
          format: {
            braces: true,
            wrap_iife: false
          },
          keep_classnames: undefined,
          keep_fnames: false,
        },
      }),
    ],
  },
};

function toObject(paths) {
  const entry = {
   sliderEndless: "./src/js/_LibralyOfGoodieJS/sliders/sliderEndless.js",
   sliderWithoutFight: "./src/js/_LibralyOfGoodieJS/sliders/sliderWithoutFight.js",
   sliderWithFight: "./src/js/_LibralyOfGoodieJS/sliders/sliderWithFight.js",
   sliderSelfScrolling: "./src/js/_LibralyOfGoodieJS/sliders/sliderSelfScrolling.js",
 };
 paths.forEach((p) => {
  const name = path.basename(p, '.js');
  entry[name] = p;
});
 return entry;
}