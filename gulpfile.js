const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const vueify = require("vueify");
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const browserify = require('browserify');
const babel = require('gulp-babel');


gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});


gulp.task('vueify', ["set-prod-node-env"], function() {
     // set up the browserify instance on a task basis
    let b = browserify({
        entries: './index.js',
        debug: false,
        transform: ["vueify"],
        extensions: [".vue"],
        standalone: "VuePlupload"
    });
    
    b.external("vue");
    
    return b.bundle()
        .pipe(source('vue-plupload.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist"));
});

gulp.task("sample", ["set-dev-node-env"], function() {
    // set up the browserify instance on a task basis
    let b = browserify({
        entries: './index.js',
        debug: true,
        transform: ["vueify"],
        extensions: [".vue"],
        standalone: "VuePlupload"
    });
    
    b.external("vue");
    
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest("docs"));
});

gulp.task("dev", ["sample"],function() {
    let watcher = gulp.watch('./src/*.vue', ['sample']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});



gulp.task("default", ["vueify"]);