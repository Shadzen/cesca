module.exports = function() {
    // Обработка файлов библиотек и перенос в docs в исходном виде
    $.gulp.task('scripts:lib', function() {
        return $.gulp.src('src/static/libs/**')
        .pipe($.gulp.dest('docs/libs/'))
        .pipe($.bs.reload({
            stream: true
        }));
    });
    // Перенос файла common.js в папку docs
    $.gulp.task('scripts', function() {
        return $.gulp.src('src/static/js/script.js')
        .pipe($.gulp.dest('docs/js/'))
        .pipe($.bs.reload({
            stream: true
        }));
    });
};
