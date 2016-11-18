'use strict';

var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var gulp = require('gulp');
var open = require('gulp-open');
var os = require('os');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');

var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

gulp.task('hologram', shell.task([
  'hologram config.yml'
]));

gulp.task('sass', function() {
  return gulp
    .src('./styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./built-styles/css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      flexbox: true
    }))
});

gulp.task('watch', function(){
  gulp.watch(['./styles/*', './styles/_*.scss', './styles/*.md'], ['sass', 'hologram']);
  gulp.watch(['./styleguide-dist/*.html', './templates/*.html'], ['html']);
  gulp.watch(['./styleguide-theme/**/*'], ['hologram', 'html']);
});

gulp.task('connect', function() {
  connect.server({
    root: './styleguide-dist',
    livereload: true
  });
});

gulp.task('open', function() {
  gulp.src('./styleguide-dist/index.html')
    .pipe(open({
      app: browser,
      uri: 'http://localhost:8080'
    }))
})

gulp.task('html', function () {
  gulp.src('./styleguide-dist/*')
    .pipe(connect.reload());
});

gulp.task('wraith-capture', shell.task([
  'wraith capture test/configs/capture.yaml',
]))

gulp.task('wraith-history', shell.task([
  'wraith history test/configs/history.yaml',
]))

gulp.task('wraith-latest', shell.task([
  'wraith latest test/configs/history.yaml',
]))

gulp.task('deploy', shell.task([
    'cf push'
]));


gulp.task('default', ['open', 'sass', 'hologram', 'connect', 'watch' ])
