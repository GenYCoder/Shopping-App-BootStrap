var browserify = require('browserify'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    scsso = require('gulp-csso'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    merge = require('merge-stream');

gulp.task('production', function() {
    return browserify('./app.js')
        .bundle()
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./'));
})

gulp.task('styles', function () {
    return gulp.src('./sass/main.scss')
        .pipe(sass({
            sourcemap: true
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(scsso(true))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./styles'));

});


gulp.task('styles:watch', function () {
    gulp.watch("./sass/**/*", ['styles']);
});

gulp.task('production:watch', function () {
    gulp.watch("./modules/**/*", ['production']);
});

gulp.task('build', ['styles', 'scripts']);