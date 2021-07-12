import babel from '@rollup/plugin-babel';


const getNameScript = (file) => {
	const fileSplit = file.split("/");
	const nameScript = fileSplit[fileSplit.length - 1].split(".")[0];

	return nameScript;
};

const paths = {
	library: {
		slider_all: "./src/js/libraryOfGoodieJS.js",
		slider_1: "./src/js/sliders/sliderWithoutFight.js",
		slider_2: "./src/js/sliders/sliderWithFight.js",
		slider_3: "./src/js/sliders/sliderEndLess.js",
		slider_4: "./src/js/sliders/sliderSelfScrolling.js",
		slider_5: "./src/js/sliders/sliderWithAutomaticAdjustment.js",
		slider_6: "./src/js/sliders/sliderBeforeAfter.js",
		slider_7: "./src/js/sliders/sliderSplit.js",
		slider_8: "./src/js/sliders/sliderWithSections.js",
		slider_9: "./src/js/sliders/sliderWithPreviews.js",
		popup_1: "./src/js/popups/popupDisposable.js",
		popup_2: "./src/js/popups/popupMultiple.js",
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
	    input: paths.library.slider_all,
	    output: [
	    	{
	    		file: `${paths.build.js_all}/libraryOfGoodieJS.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.slider_1,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/${getNameScript(paths.library.slider_1)}.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.slider_2,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/${getNameScript(paths.library.slider_2)}.js`,
	    		format: 'es'
	    	}
	    ],
    	plugins: getPlugins(),
	},{
	    input: paths.library.slider_3,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/${getNameScript(paths.library.slider_3)}.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.slider_4,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/${getNameScript(paths.library.slider_4)}.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.slider_5,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/${getNameScript(paths.library.slider_5)}.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.slider_6,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/${getNameScript(paths.library.slider_6)}.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.slider_7,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/${getNameScript(paths.library.slider_7)}.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.slider_8,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/${getNameScript(paths.library.slider_8)}.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.slider_9,
	    output: [
	    	{
	    		file: `${paths.build.js_sliders}/${getNameScript(paths.library.slider_9)}.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.popup_1,
	    output: [
	    	{
	    		file: `${paths.build.js_popup}/popupDisposable.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.library.popup_2,
	    output: [
	    	{
	    		file: `${paths.build.js_popup}/popupMultiple.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	}
];