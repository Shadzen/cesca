module.exports = function() {
    $.gulp.task('img', function() {
        return $.gulp.src('src/static/img/**')
            .pipe($.gulp.dest('docs/img'))
    });
}
