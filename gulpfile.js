var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require("gulp-browserify");
var vueify = require("vueify");
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');


gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});


gulp.task('vueify', ["set-prod-node-env"], function() {
    return gulp.src("./index.js")
        .pipe(sourcemaps.init())
        .pipe(browserify({
            transform: ["vueify"],
            extensions: [".vue"],
            standalone: "VuePlupload"
        }))
        .pipe(uglify())
        .pipe(rename("vue-plupload.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist'));
});

gulp.task("sample", ["set-dev-node-env"], function() {
    return gulp.src("./index.js")
        .pipe(browserify({
            transform: ["vueify"],
            extensions: [".vue"],
            standalone: "VuePlupload",
            debug: true
        }))
        .pipe(rename("bundle.js"))
        .on('error', function(error) {
            console.log(error.toString())
            this.emit("end")
        })
        .pipe(gulp.dest('sample'));
});

gulp.task("dev", function() {
    var watcher = gulp.watch('./src/*.vue', ['sample']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});



gulp.task("default", ["vueify"])