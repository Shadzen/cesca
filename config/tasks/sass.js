module.exports = function() {
    $.gulp.task('sass:dev', function(){
        return $.gulp.src('src/static/scss/main.scss')
            .pipe($.sourcemaps.init())
            .pipe($.sass({outputStyle: 'expanded'}))
            .on("error", $.gp.notify.onError({
                message: "Error: <%= error.message %>",
                title: "style"
            }))
            .pipe($.sourcemaps.write())
            .pipe($.gulp.dest('docs/css/'))
            .pipe($.bs.reload({
                stream:true
            }));
    });
    $.gulp.task('sass', function(){
        return $.gulp.src('src/static/scss/main.scss')
            .pipe($.sass({outputStyle: 'compressed'}))
            .pipe($.gp.postcss())
            .pipe($.gp.csso({
                forceMediaMerge: true,
                restructure: true,
                comments: false,
            }))
            .pipe($.gulp.dest('docs/css/'))
    });
}
