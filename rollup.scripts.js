import babel from '@rollup/plugin-babel';


const paths = {
	libraly: {
		slider_1: "./src/js/@LibralyOfGoodieJS/sliders/sliderWithoutFight.js",
		slider_2: "./src/js/@LibralyOfGoodieJS/sliders/sliderWithFight.js",
		slider_3: "./src/js/@LibralyOfGoodieJS/sliders/sliderEndLess.js",
		slider_4: "./src/js/@LibralyOfGoodieJS/sliders/sliderSelfScrolling.js",
		slider_5: "./src/js/@LibralyOfGoodieJS/sliders/sliderWithAutomaticAdjustment.js",
		popup_1: "./src/js/@LibralyOfGoodieJS/popups/popupDisposable.js",
		popup_2: "./src/js/@LibralyOfGoodieJS/popups/popupMultiple.js",
	},
	build: {
		js_sliders: "./LibralyOfGoodieJS/scripts/sliders",
		js_popup: "./LibralyOfGoodieJS/scripts/popups"
	}
};

const getPlugins = () => [
	babel({
		presets: ['@babel/preset-env'],
		babelHelpers: 'bundled'
	})
];


export default [
	{
	    input: paths.libraly.slider_1,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/sliderWithoutFight.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.libraly.slider_2,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/sliderWithFight.js`,
	    		format: 'es'
	    	}
	    ],
    	plugins: getPlugins(),
	},{
	    input: paths.libraly.slider_3,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/sliderEndLess.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.libraly.slider_4,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/sliderSelfScrolling.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.libraly.slider_5,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/sliderWithAutomaticAdjustment.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.libraly.popup_1,
	    output: [
	    	{
	    		file: `${paths.build.js_popup}/popupDisposable.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.libraly.popup_2,
	    output: [
	    	{
	    		file: `${paths.build.js_popup}/popupMultiple.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	}
];