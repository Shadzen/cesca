module.exports = function() {
    $.gulp.task('video', function() {
        return $.gulp.src('src/static/video/**')
            .pipe($.gulp.dest('docs/video'))
    });
}
