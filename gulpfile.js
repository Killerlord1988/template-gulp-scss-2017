"use strict";

var gulp = require("gulp");
var scss = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");

var imagemin = require("gulp-imagemin");

var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var runSequence = require("run-sequence");

var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

var del = require("del");

var browserSync = require("browser-sync");

// перезагрузка страницы
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: "./build"
        },
        open: true
    });
});

// работа с html
gulp.task("html", function() {
    return gulp.src("./src/*.html")

        .pipe(gulp.dest("./build"));
});

/*работа с index.html и style.scss*/
gulp.task("style", function() {
    gulp.src("./src/sass/style.scss")
        .pipe(plumber())
        .pipe(scss())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 2 version"
                ]
            }),
            mqpacker({
                sort: true
            })
        ]))

        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./build/css"));
});
/*работа с изображениями*/

gulp.task("images", function() {
    return gulp.src("./src/images/**/*.{png,jpq,gif}")
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.jpegtran({ progressive: true })
        ]))
        .pipe(gulp.dest("./build/images"));
});

/*работа с svg*/

gulp.task("symbols", function() {
    return gulp.src("./src/images/icons/*.svg")
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("symbols.svg"))
        .pipe(gulp.dest("./build/images"));
});

/*работа с js*/

gulp.task('script', function (callback) {
    pump([
            gulp.src('./src/js/*.js'),
            concat('script.min.js'),
            uglify(),
            gulp.dest('./build/js')
        ],
        callback
    );
});

gulp.task('lib', function (callback) {
    pump([
            gulp.src('./src/js/lib/**/*.js'),
            concat('lib.min.js'),
            uglify(),
            gulp.dest('./build/lib')
        ],
        callback
    )
});

gulp.task("default", ["build"]);

//очистка
gulp.task("clean", function() {
    return del(["./build"]);
});

gulp.task("build", function(callback) {
    runSequence(
        "clean", ['html', 'style', 'images', 'symbols', 'script', 'lib'],
        "browserSync",
        "watch",
        callback
    );
});

// слежение за изменениями
gulp.task('watch', function() {
    gulp.watch(["./src/sass/**/*.*"], ['style']);
    gulp.watch(["./src/images/**/*.*"], ['images']);
    gulp.watch(["./src/images/**/*.*"], ['symbols']);
    gulp.watch(["./src/js/**/*.*"], ['script']);
    gulp.watch(["./src/lib/**/*.*"], ['lib']);
    gulp.watch(["./src/*.html"], ['html']);
});
