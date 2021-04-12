const gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  imagemin = require('gulp-imagemin'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  terser = require('gulp-terser');
const { src, series, parallel, dest, watch } = require('gulp');

const cssPath = 'src/css/**/*.css';
const jsPath = 'src/js/*.js';

function copyHtml() {
  return src('src/*.html').pipe(gulp.dest('dist'));
}

function copyVendors() {
  return src('src/vendor/**/*').pipe(gulp.dest('dist/vendor'));
}

function copyFiles() {
  return src('src/files/*').pipe(gulp.dest('dist/files'));
}

function copyFonts() {
  return src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
}

function imgMinify(params) {
  return src('src/img/*').pipe(imagemin()).pipe(gulp.dest('dist/img'));
}

function cssTask() {
  return (
    src(cssPath)
      .pipe(sourcemaps.init())
      // .pipe(concat('style.css'))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/css'))
  );
}

function jsTask() {
  return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'));
}

function watchTask() {
  watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, jsTask));
}

exports.default = series(
  parallel(
    copyHtml,
    copyVendors,
    copyFiles,
    copyFonts,
    imgMinify,
    cssTask,
    jsTask
  ),
  watchTask
);
