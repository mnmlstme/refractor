// Gulpfile to build components bundles for use in fractal

const gulp = require('gulp');
var gutil = require('gulp-util');
const browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
const babelify = require('babelify').configure({
    presets: ['es2015', 'react']
});

const $components = 'components/';
const $static = 'public/';

const $index_js = 'index.js';
const $bundle_js = 'bundle.js';

gulp.task('browserify', function () {

    return browserify( $components + $index_js, {
            standalone: 'Refractor',
            paths: [ $components ],
                transform: [ babelify ],
                extensions: [ '.jsx' ]
            })
            .bundle()
            .on( 'error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe( source( $bundle_js ) )
            .pipe( buffer() )
            .pipe( gulp.dest( $static ) );
});

gulp.task('default', ['browserify']);
