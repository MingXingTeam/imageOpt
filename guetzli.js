const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');

gulp.task('guetzli', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin([imageminGuetzli({
            quality: 85
        })]))
        .pipe(gulp.dest('guetzli'));
});