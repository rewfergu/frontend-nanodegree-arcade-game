var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ghPages = require('gulp-gh-pages');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

gulp.task('copy-files', function() {
  gulp.src('src/images/*').pipe(gulp.dest('dist/images'));
  gulp.src('src/css/*').pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function() {
  gulp.src('src/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', [
  'copy-files',
  'minify-js',
]);
