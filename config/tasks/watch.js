module.exports = function() {
    $.gulp.task('watch',function(){
        $.gulp.watch('src/pug/**/*.pug',$.gulp.series('pug'));
        $.gulp.watch('src/static/scss/**/*.scss',$.gulp.series('sass:dev'));
        $.gulp.watch('src/static/js/*',$.gulp.series('scripts'));
        $.gulp.watch('src/static/libs/**',$.gulp.series('scripts'));
        $.gulp.watch('src/static/libs/*',$.gulp.series('scripts'));
        $.gulp.watch('src/static/img/*',$.gulp.series('img'));
        $.gulp.watch('src/static/img/**/*',$.gulp.series('img'));
        $.gulp.watch('src/static/video/*',$.gulp.series('video'));
        $.gulp.watch('src/static/video/**/*',$.gulp.series('video'));
        $.gulp.watch('src/static/fonts/*',$.gulp.series('fonts'));
    });
}
