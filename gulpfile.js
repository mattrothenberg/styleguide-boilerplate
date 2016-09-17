'use strict';

var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('hologram', shell.task([
  'hologram config.yml'
]));

gulp.task('sass', function() {
  return gulp
    .src('./styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      flexbox: true
    }))
});

gulp.task('watch', function(){
  gulp.watch(['./styles/*.scss'], ['sass', 'hologram', 'html']);
  gulp.watch(['./docs/*.html', './templates/*.html'], ['html']);
  gulp.watch(['./templates/**/*', './styles/*.md'], ['hologram', 'html']);
});

gulp.task('connect', function() {
  connect.server({
    root: './docs',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./docs/*')
    .pipe(connect.reload());
});


gulp.task('default', ['sass', 'hologram', 'connect', 'watch', ])
