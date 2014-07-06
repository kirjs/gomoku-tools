var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var bump = require('gulp-bump');
var git = require('gulp-git');


gulp.task('build', function () {
    gulp.src('src/index.js')
        .pipe(browserify())
        .pipe(rename('gomoku-tools.js'))
        .pipe(gulp.dest('./build/'))
        .pipe(rename('gomoku-tools.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));
});

gulp.task('publish', function () {
    gulp.src('./build')
        .pipe(git.add())
        .on('error', console.log)
        .pipe(git.commit('Add the latest built version'))
        .on('error', console.log)
        .pipe(git.push())
        .on('error', console.log);
});

gulp.task('bump', function () {
    gulp.src(['package.json', 'bower.json'])
        .pipe(bump())
        .on('error', console.log)
        .pipe(gulp.dest('./'))
        .on('error', console.log);


});


gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});


gulp.task('default', ['clean', 'build', 'publish']);


