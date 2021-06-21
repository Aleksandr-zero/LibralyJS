const { src, dest, series, watch, parallel } = require('gulp');

const removeCommentsCss = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const sass              = require('gulp-sass');
const cleanCSS          = require('gulp-clean-css');
const include           = require('gulp-file-include');
const del               = require('del');
const concat            = require('gulp-concat');
const htmlmin           = require("gulp-htmlmin");
const sync              = require('browser-sync').create();
const babel             = require('gulp-babel');
const uglify            = require('gulp-uglify');
const replace           = require("gulp-replace");


const htmlDev = () => {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('app'));
};

const htmlBuild =() => {
    return src(['src/**.html'])
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(replace(/type="module"/g, ""))
        .pipe(htmlmin({
            ignoreCustomFragments: [/<</],
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            collapseBooleanAttributes: true,
            decodeEntities: true,
            removeComments: true,
            continueOnParseError: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(dest('app'));
}

const image = () => {
    return src("src/img/**/*")
        .pipe(dest("app/img"))
}

const fonts = () => {
    return src("src/fonts/**/*")
        .pipe(dest("app/fonts"));
};

const doc = () => {
    return src("src/doc/**/*")
        .pipe(dest("app/doc"))
}


const scriptsDev = () => {
    return src("./src/js/**/**/*")
        .pipe(dest("app/js"))
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
   return src('src/scss/style.scss')
       .pipe(sass({
            outputStyle:'expanded'
        }))
       .pipe(concat('css/style.css'))
       .pipe(dest('app'));
};

const scssBuild = () => {
   return src('./src/scss/style.scss')
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(removeCommentsCss())
        .pipe(autoprefixer())
        .pipe(concat('css/style.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('app'));
};

const scssBuildScripts = () => {
   return src('./src/scss/@LibraryOfGoodieJS/libraryOfGoodieJS.scss')
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
    return del(['app']);
};


const serve = () => {
    sync.init({
        server: './app/'
    });

    watch('src/**/**.html',             series(htmlDev)).on('change', sync.reload);
    watch("src/js/**/**.js",            series(scriptsDev)).on('change', sync.reload);
    watch('src/scss/**/**.scss',        series(scssDev)).on('change', sync.reload);
};


exports.build = series(clear, parallel(scssBuild, htmlBuild, image, fonts, doc));
exports.serve = series(clear, scssDev, htmlDev, scriptsDev, image, fonts, doc, serve);
exports.scriptsBuild = series(parallel(scriptsOptimization, scssBuildScripts));