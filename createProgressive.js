const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
   return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('progressimage'));
});