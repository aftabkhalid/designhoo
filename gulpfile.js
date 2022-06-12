'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

//Paths
var paths = {
  sass: {
    src: "sass/theme.scss",
    dest: "css"
  },
};

function style() {
  return (
    gulp
      //.src([paths.sass.src, paths.bootstrap.src])
      .src(paths.sass.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      //.pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.sass.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream())
  );
};

// A simple task to reload the page
function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    }
  });
  gulp.watch("sass/**/*.scss", style);
  gulp.watch('./*.html').on('change', browserSync.reload)
}

exports.style = style;
exports.watch = watch;













// function defaultTask(cb) {
//   // place code for your default task here
//   cb();
// }
//
// exports.default = defaultTask
