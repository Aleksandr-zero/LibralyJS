const { src, dest, series, watch } = require('gulp');

const removeCommentsCss = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const sass              = require('gulp-sass');
const cleanCSS          = require('gulp-clean-css');
const include           = require('gulp-file-include');
const del               = require('del');
const dom               = require('gulp-dom');
const concat            = require('gulp-concat');
const htmlmin           = require("gulp-htmlmin");
const webpack           = require("webpack-stream");
const sync              = require('browser-sync').create();
const babel             = require('gulp-babel');
const uglify            = require('gulp-uglify');


const htmlDev = () => {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('app'));
};

const htmlBuild =() => {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dom(function() {
            this.querySelectorAll('script').forEach((tag) => {
                tag.remove();
            });
            this.querySelector("body").insertAdjacentHTML("beforeend", `
                <script src="./js/app.js"></script>
            `);
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
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


const scriptsDev = () => {
    return src("src/js/**/*")
        .pipe(dest("app/js"))
};

const scriptsBuild = () => {
    return src("src/js/**/*")
        .pipe(webpack(
            module.exports = {
                output: {
                    filename: 'app.js'
                },
                mode: "production",
                module: {
                    rules: [{
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: '/node_modules/'
                    }]
                }
            }
        ))
        .pipe(dest("app/js"));
};

const scriptsBuildDist = () => {
    return src("src/js/**/*")
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify({
            keep_fnames: true,
            mangle: false
        }))
        .pipe(dest("TastyLibraryJS/scripts"));
}

const scssDev = () => {
   return src('src/scss/**.scss')
       .pipe(sass({
            outputStyle:'expanded'
        }))
       .pipe(concat('css/style.css'))
       .pipe(autoprefixer())
       .pipe(dest('app'));
};

const scssBuild = () => {
   return src('src/scss/**.scss')
       .pipe(sass({
            outputStyle:'compressed'
        }))
       .pipe(concat('css/style.css'))
       .pipe(autoprefixer())
       .pipe(removeCommentsCss())
       .pipe(cleanCSS())
       .pipe(dest('app'));
};


const clear = () => {
    return del(['app', "dist"]);
};

const serve = () => {
    sync.init({
        server: './app/'
    });

    watch('src/**/**.html',             series(htmlDev)).on('change', sync.reload);
    watch("src/js/**/**.js",            series(scriptsDev)).on('change', sync.reload);
    watch('src/scss/**/**.scss',        series(scssDev)).on('change', sync.reload);
};

exports.buildScripts = series(scriptsBuildDist)
exports.build = series(clear, scssBuild, htmlBuild, scriptsBuild, image);
exports.serve = series(clear, scssDev, htmlDev, scriptsDev, image, serve);
exports.clear = clear;
