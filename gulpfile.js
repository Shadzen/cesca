'use strict';

const postcss = require("gulp-postcss"),
    csso = require("gulp-csso"),
    autoprefixer = require("gulp-autoprefixer");

global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    bs: require('browser-sync').create(),
    sass: require('gulp-sass')(require('sass')),
    sourcemaps: require('gulp-sourcemaps'),
    path: {
        tasks: require('./config/tasks.js')
    }
};

$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('dev',$.gulp.series(
    $.gulp.parallel('pug','sass:dev','scripts:lib','scripts','img','video','fonts'),
    $.gulp.parallel('watch','serve')
));

$.gulp.task('build',$.gulp.series(
    $.gulp.parallel('pug','sass','scripts:lib','scripts','img','video','fonts')
));
