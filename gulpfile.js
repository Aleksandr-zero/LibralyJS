const { src, dest, series, watch, parallel } = require('gulp');

const removeCommentsCss = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const sass              = require('gulp-sass')(require("sass"));
const include           = require('gulp-file-include');
const cleanCSS          = require('gulp-clean-css');
const del               = require('del');
const concat            = require('gulp-concat');
const sync              = require('browser-sync').create();
const terser            = require('gulp-terser');
const replace           = require("gulp-replace");


const REGEX_FOR_REPLACE = new RegExp(`
	export{(SliderSelfScrolling|
			SliderWithAutomaticAdjustment|
			SliderWithoutFight|
			SliderBeforeAfter|
			SliderSplit|
			SliderWithPreviews|
			PopupMuliple|
			PopupDisposable|
			PopupIdentical)};`.replace(/\n|\t+|\s+/g, ""), "g");

const NAME_FILE_CSS = "style.css";
const NAME_FILE_HTML = "index.html";
const NAME_FILE_SCSS = "style.scss";

const NAME_FILE_CSS_BUILD = "libraryOfGoodieJS.css";
const NAME_FILE_SCSS_BUILD = "libraryOfGoodieJS.scss";

const PATH_SRC = "./src";
const PATH_DIST = './dist';
const PATH_BUILD = "./LibraryOfGoodieJS"

const PATHS = {
	src: {
		html: `${PATH_SRC}`,
		js: `${PATH_SRC}/js`,
		scss_dev: `${PATH_SRC}/scss/development`,
		scss_build: `${PATH_SRC}/scss`
	},
	dist: {
		html: `${PATH_DIST}`,
		css: `${PATH_DIST}/css`,
		js: `${PATH_DIST}/js`
	},
	build: {
		js: `${PATH_BUILD}/scripts`,
		css: `${PATH_BUILD}/css`
	}
}

const OPTIONS_TERSER = {
	compress: {
		booleans_as_integers: true,
		arguments: true,
		drop_console: true,
		toplevel: true
	},
	keep_fnames: true
};


const htmlDev = () => {
	return src(`${PATHS.src.html}/${NAME_FILE_HTML}`)
		.pipe(include({
			prefix: '@@'
		}))
		.pipe(dest(PATHS.dist.html));
};


const scriptsDev = () => {
	return src(`${PATHS.src.js}/**/*.js`)
		.pipe(dest(PATHS.dist.js))
};


const scriptsOptimization = () => {
	return src(`${PATHS.build.js}/**/*.js`)
		.pipe(terser(OPTIONS_TERSER))
		.pipe(replace(REGEX_FOR_REPLACE, ""))
		.pipe(dest(PATHS.build.js));
}


const scssDev = () => {
   return src(`${PATHS.src.scss_dev}/${NAME_FILE_SCSS}`)
	   .pipe(sass({
			outputStyle:'expanded'
		}))
	   .pipe(concat(`css/${NAME_FILE_CSS}`))
	   .pipe(dest(PATH_DIST));
};


const scssBuildScripts = () => {
   return src(`${PATHS.src.scss_build}/${NAME_FILE_SCSS_BUILD}`)
		.pipe(sass({
			outputStyle:'compressed'
		}))
		.pipe(removeCommentsCss())
		.pipe(autoprefixer())
		.pipe(concat(`css/${NAME_FILE_CSS_BUILD}`))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(dest(PATH_BUILD));
};


const clear = () => {
	return del(PATH_DIST);
};


const serve = () => {
	sync.init({
		server: PATH_DIST
	});

	watch(`${PATHS.src.html}/**/*.html`,    series(htmlDev)).on('change', sync.reload);
	watch(`${PATHS.src.js}/**/*.js`,        series(scriptsDev)).on('change', sync.reload);
	watch(`${PATHS.src.scss_dev}/**/*.scss`,    series(scssDev)).on('change', sync.reload);
};


exports.serve = series(clear, scssDev, htmlDev, scriptsDev, serve);
exports.scriptsBuild = series(parallel(scriptsOptimization, scssBuildScripts));
