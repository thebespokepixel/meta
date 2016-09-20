/*
 * Client Gulp Template Tasks
 * (Work in progress)
 */
 /* eslint import/no-extraneous-dependencies: 0 */

const gulp = require('gulp')
const cordial = require('@thebespokepixel/cordial')()

// transpilation/formatting
gulp.task('bundle', cordial.macro({
	master: false,
	source: 'src/lib/index.js'
}).bundle())

// Clean
gulp.task('clean', cordial.shell({
	source: ['npm-debug.log', './nyc_output', './test/coverage']
}).trash())

// Tests
gulp.task('ava', cordial.test().ava(['test/*.js']))
gulp.task('xo', cordial.test().xo(['src/lib/*.js']))
gulp.task('test', gulp.parallel('xo', 'ava'))

// Default
gulp.task('default', gulp.series('bump', 'bundle'))
