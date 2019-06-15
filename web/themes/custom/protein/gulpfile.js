var gulp = require('gulp');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var compass = require('gulp-compass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

gulp.task('compass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: 'css',
            sass: 'sass'
        }))
        .pipe(gulp.dest('css/'))
        .pipe(livereload());
});

gulp.task('autoprefixer', () =>
    gulp.src('css/main.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
);

gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "bill.dev/"
    })
})

gulp.task('jshint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('imagemin', () =>
    gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('images'))
);

gulp.task('styles', function() {
    gulp.src(['css/main.css'])
        .pipe(browserSync.reload({
            stream: true
        }))
})
gulp.task('default', ['compass', 'styles', 'browserSync', 'autoprefixer'], function() {
    gulp.watch("sass/**/*.scss", ['compass']);
    gulp.watch("css/*.css", ['styles']);
    gulp.watch("drupal.theme/", ['browserSync']);
    gulp.watch("css/*.css", ['autoprefixer']);
});
