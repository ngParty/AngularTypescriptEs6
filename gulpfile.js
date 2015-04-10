'use strict';

var gulp       = require( 'gulp' ),
    debug      = require( 'gulp-debug' ),
    inject     = require( 'gulp-inject' ),
    tsc        = require( 'gulp-typescript' ),
    tslint     = require( 'gulp-tslint' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    rimraf     = require( 'gulp-rimraf' ),
    Config     = require( './gulpfile.config' );

var config = new Config();

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 * This isn't needed anymore with latest TypeScript 1.5alpha
 */
gulp.task( 'gen-ts-refs', function() {
    var target = gulp.src( config.appTypeScriptReferences );
    var sources = gulp.src( [ config.allTypeScript ], { read: false } );
    return target.pipe( inject( sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function( filepath ) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    } ) ).pipe( gulp.dest( config.typings ) );
} );

/**
 * Lint all custom TypeScript files.
 * Doesnt work with latest Typescript 1.5 alpha
 */
gulp.task( 'ts-lint', function() {
    return gulp.src( config.allTypeScript ).pipe( tslint() ).pipe( tslint.report( 'prose' ) );
} );

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task( 'compile-ts', function() {
    var sourceTsFiles = [
        config.allTypeScript,                //path to typescript files
        config.libraryTypeScriptDefinitions //reference to library .d.ts files
        //config.appTypeScriptReferences
    ];     //reference to app.d.ts files

    var tsResult = gulp.src( sourceTsFiles )
        .pipe( sourcemaps.init() )
        .pipe( tsc( {
            typescript: require('typescript'),
            target: 'ES5',
            module: 'commonjs',
            declarationFiles: false,
            noExternalResolve: true
        } ) );

    tsResult.dts.pipe( gulp.dest( config.tsOutputPath ) );
    return tsResult.js
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( config.tsOutputPath ) );
} );

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task( 'clean-ts', function() {
    var typeScriptGenFiles = [
        config.tsOutputPath,            // path to generated JS files
        config.sourceApp + '**/*.js',    // path to all JS files auto gen'd by editor
        config.sourceApp + '**/*.js.map' // path to all sourcemap files auto gen'd by editor
    ];

    // delete the files
    return gulp.src( typeScriptGenFiles, { read: false } )
        .pipe( rimraf() );
} );

gulp.task( 'watch', function() {
    gulp.watch( [ config.allTypeScript ], [ 'compile-ts'] );
} );

gulp.task( 'default', [ 'compile-ts', 'watch' ] );
