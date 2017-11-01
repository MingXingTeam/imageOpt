const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('imageminMozjpeg', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin([imageminMozjpeg({
            quality: 85
        })]))
        .pipe(gulp.dest('mozjpeg'));
});