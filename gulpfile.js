/*
 * Client Gulp Template Tasks
 * (Work in progress)
 */
 /* eslint import/no-extraneous-dependencies: 0 */

const gulp = require('gulp')
const cordial = require('@thebespokepixel/cordial')()

// transpilation/formatting
gulp.task('bundle', cordial.macro({
	source: 'src/lib/index.js'
}).bundle())

gulp.task('master', cordial.macro({
	master: true,
	source: 'src/lib/index.js'
}).bundle())

// Clean
gulp.task('clean', cordial.shell({
	source: ['npm-debug.log', './nyc_output', './coverage']
}).trash())

// Docs
gulp.task('docs', cordial.shell({
	source: 'npm run doc-build'
}).job())

// Tests
gulp.task('ava', cordial.test().ava(['test/*.js']))
gulp.task('xo', cordial.test().xo(['src/lib/*.js']))
gulp.task('test', gulp.parallel('xo', 'ava'))

// Hooks
gulp.task('start-release', gulp.series('reset', 'clean', gulp.parallel('docs', 'master')))

// Default
gulp.task('default', gulp.series('bump', 'clean', gulp.parallel('docs', 'bundle')))
