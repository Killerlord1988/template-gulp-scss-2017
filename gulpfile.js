"use strict";

var gulp = require("gulp");
var scss = require("gulp-scss");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = ("css-mqpacker");
var minify = ("gulp-csso");
var rename = ("gulp-rename");

var imagemin = ("gulp-imagemin");

var svgstore = ("gulp-svgstore");
var svgmin = ("gulp-svgmin");



/*работа с index.html и style.scss*/
gulp.task("style", function() {
    gulp.src("sass/style.scss")
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

    .pipe(gulp.dest("css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("css"));
});
/*работа с изображениями*/

gulp.task("images", function() {
    return gulp.src("images/**/*.{png,jpq,gif}")
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.jpegtran({ progressive: true })
        ]))
        .pipe(gulp.dest("images"));
});

/*работа с svg*/

gulp.task("symbols", function() {
    return gulp.src("images/icons/*.svg")
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("symbols.svg"))
        .pipe(gulp.dest("images"));
});

gulp.task("default", ["build"]);

gulp.task("clean", function() {
    return del([paths.base.dist]);
});

gulp.task("build", function(callback) {
    runSequence(
        "clean", [],
        "browserSync",
        "watch",
        callback
    );
});