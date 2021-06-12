import babel from '@rollup/plugin-babel';


const paths = {
	libraly: {
		slider_1: "./src/js/_LibralyOfGoodieJS/sliders/sliderWithoutFight.js",
		slider_2: "./src/js/_LibralyOfGoodieJS/sliders/sliderWithFight.js",
		slider_3: "./src/js/_LibralyOfGoodieJS/sliders/sliderEndLess.js",
		slider_4: "./src/js/_LibralyOfGoodieJS/sliders/sliderSelfScrolling.js",
		slider_5: "./src/js/_LibralyOfGoodieJS/sliders/sliderWithAutomaticAdjustment.js"
	},
	build: {
		js: "./LibralyOfGoodieJS/scripts/sliders"
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
	    		file: `${paths.build.js}/sliderWithoutFight.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.libraly.slider_2,
	    output: [
	    	{
	    		file: `${paths.build.js}/sliderWithFight.js`,
	    		format: 'es'
	    	}
	    ],
    	plugins: getPlugins(),
	},{
	    input: paths.libraly.slider_3,
	    output: [
	    	{
	    		file: `${paths.build.js}/sliderEndLess.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.libraly.slider_4,
	    output: [
	    	{
	    		file: `${paths.build.js}/sliderSelfScrolling.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	},{
	    input: paths.libraly.slider_5,
	    output: [
	    	{
	    		file: `${paths.build.js}/sliderWithAutomaticAdjustment.js`,
	    		format: 'es'
	    	}
	    ],
	    plugins: getPlugins(),
	}
];