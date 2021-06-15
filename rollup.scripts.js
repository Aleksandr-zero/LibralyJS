import babel from '@rollup/plugin-babel';


const paths = {
	libraly: {
		slider_all: "./src/js/@LibraryOfGoodieJS/libraryOfGoodieJS.js",
		slider_1: "./src/js/@LibraryOfGoodieJS/sliders/sliderWithoutFight.js",
		slider_2: "./src/js/@LibraryOfGoodieJS/sliders/sliderWithFight.js",
		slider_3: "./src/js/@LibraryOfGoodieJS/sliders/sliderEndLess.js",
		slider_4: "./src/js/@LibraryOfGoodieJS/sliders/sliderSelfScrolling.js",
		slider_5: "./src/js/@LibraryOfGoodieJS/sliders/sliderWithAutomaticAdjustment.js",
		slider_6: "./src/js/@LibraryOfGoodieJS/sliders/sliderBeforeAfter.js",
		popup_1: "./src/js/@LibraryOfGoodieJS/popups/popupDisposable.js",
		popup_2: "./src/js/@LibraryOfGoodieJS/popups/popupMultiple.js",
	},
	build: {
		js_all: "./LibraryOfGoodieJS/scripts",
		js_sliders: "./LibraryOfGoodieJS/scripts/sliders",
		js_popup: "./LibraryOfGoodieJS/scripts/popups"
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
	    input: paths.libraly.slider_all,
	    output: [
	    	{
	    		file: `${paths.build.js_all}/libraryOfGoodieJS.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
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
	    input: paths.libraly.slider_6,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/sliderBeforeAfter.js`,
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