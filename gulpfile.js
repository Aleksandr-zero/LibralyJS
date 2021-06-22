const { src, dest, series, watch, parallel } = require('gulp');

const removeCommentsCss = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const sass              = require('gulp-sass');
const include           = require('gulp-file-include');
const cleanCSS          = require('gulp-clean-css');
const del               = require('del');
const concat            = require('gulp-concat');
const sync              = require('browser-sync').create();
const babel             = require('gulp-babel');
const uglify            = require('gulp-uglify');
const replace           = require("gulp-replace");


const htmlDev = () => {
    return src('src/index.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('dist'));
};

const doc = () => {
    return src("src/doc/**/*")
        .pipe(dest("dist/doc"))
}


const scriptsDev = () => {
    return src("./src/js/**/*.js")
        .pipe(dest("dist/js"))
};


const scriptsOptimization = () => {
    return src(["./LibraryOfGoodieJS/scripts/**/**.js"])
        .pipe(replace(/export { (SliderEndLess|SliderSelfScrolling|SliderWithAutomaticAdjustment|SliderWithFight|SliderWithoutFight|SliderBeforeAfter|SliderSplit|PopupMuliple|PopupDisposable) };/g, ""))
        .pipe(uglify({
            keep_fnames: true
        }))
        .pipe(dest("./LibraryOfGoodieJS/scripts"));
}


const scssDev = () => {
   return src('src/scss/development/style.scss')
       .pipe(sass({
            outputStyle:'expanded'
        }))
       .pipe(concat('css/style.css'))
       .pipe(dest('dist'));
};


const scssBuildScripts = () => {
   return src('./src/scss/libraryOfGoodieJS.scss')
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(removeCommentsCss())
        .pipe(autoprefixer())
        .pipe(concat('css/libraryOfGoodieJS.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('./LibraryOfGoodieJS'));
}


const clear = () => {
    return del(['dist']);
};


const serve = () => {
    sync.init({
        server: './dist/'
    });

    watch('src/**/*.html',             series(htmlDev)).on('change', sync.reload);
    watch("src/js/**/*.js",            series(scriptsDev)).on('change', sync.reload);
    watch('src/scss/**/*.scss',        series(scssDev)).on('change', sync.reload);
};


exports.serve = series(clear, scssDev, htmlDev, scriptsDev, doc, serve);
exports.scriptsBuild = series(parallel(scriptsOptimization, scssBuildScripts));
