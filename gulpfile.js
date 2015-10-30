var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function () {
  return sass('./client/scss/main.scss')
    .pipe(gulp.dest('./client/dist/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('js', function () {
  var bify = browserify({
    entries: './client/js/main.js',
    debug: true
  });
  
  return bify.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./client/dist/js/'));
});

gulp.task('serve', ['sass', 'js'], function () {
  browserSync({
    server: {
      baseDir: './client/dist'
    }
  });
  
  gulp.watch(['client/scss/**/*.scss'], ['sass']);
  gulp.watch(['client/js/**/*.js'], ['js']);
  gulp.watch(['client/dist/*.html', 'client/dist/css/**/*.css', 'client/dist/js/**/*.js']).on('change', reload);
});

gulp.task('default', ['sass', 'js']);