var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');


gulp.task('build', function () {
    gulp.src('src/index.js')
        .pipe(browserify())
        .pipe(rename('gomoku-tools.js'))
        .pipe(gulp.dest('./build/'))
        .pipe(rename('gomoku-tools.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));
});


gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});


gulp.task('default', ['clean', 'build']);


