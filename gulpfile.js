var gulp = require('gulp'),
    rename = require('gulp-rename'),
    jsmin = require('gulp-jsmin'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css');

gulp.task('default', function() {
   gulp.src('ui/public/css/*.css')
       .pipe(concat('style.css'))
       .pipe(minifyCss())
       .pipe(rename('style.min.css'))
       .pipe(gulp.dest('ui/public/css/'));
   gulp.src('ui/public/js/*.js')
       .pipe(concat('controllers.js'))
       .pipe(jsmin())
       .pipe(rename('controllers.min.js'))
       .pipe(gulp.dest('ui/public/js'));
});

gulp.task('watch', function() {
    gulp.watch('ui/public/css/*.css', ['default']);
    gulp.watch('ui/public/js/*.js', ['default']);
});