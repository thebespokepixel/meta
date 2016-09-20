/*
 * Client Gulp Template Tasks
 * (Work in progress)
 */
 /* eslint import/no-extraneous-dependencies: 0 */

const gulp = require('gulp')
const cordial = require('@thebespokepixel/cordial')()

// clean using trash
gulp.task('clean', cordial.shell({
	source: ['./scripts', './templates']
}).trash())

// Multi-version module bundles
gulp.task('bundle', cordial.macro({
	source: 'src/lib/index.es6'
}).bundle())

gulp.task('master', cordial.macro({
	master: true,
	source: 'src/lib/index.es6'
}).bundle())

// Bundle parameters
// master: false,
// intro: null,
// outro: null,
// banner: null,
// footer: null,
// shim: false,
// include: [],
// external: [],
// exports: 'auto',
// mkdir: {
// 	dest: './lib'
// },
// template: {
// 	type: 'match-lib',
// 	dir: path.resolve(__dirname, '..', 'templates'),
// 	dest: './',
// 	target: '4.0'
// },
// output: [
// 	{
// 		dest: './lib/index-v4.js',
// 		target: '4.0'
// 	},
// 	{
// 		dest: './lib/index-v5.js',
// 		target: '5.0'
// 	},
// 	{
// 		dest: './lib/index-v6.js',
// 		target: '6.0'
// 	}
// ],
// es2015: {
// 	jsnext: true,
// 	dest: './lib/index-es6.js'
// }

// Single-version + es6 output
gulp.task('bundle', cordial.macro({
	source: 'src/index.es6'
}).basic())

gulp.task('master', cordial.macro({
	master: true,
	source: 'src/lib/index.es6'
}).basic())

// Basic parameters
// master: false,
// intro: null,
// outro: null,
// banner: null,
// footer: null,
// shim: false,
// include: [],
// external: [],
// exports: 'auto',
// dest: './index.js',
// target: '4.0',
// mkdir: {
// 	dest: './'
// },
// es2015: {
// 	jsnext: true,
// 	dest: './index-es6.js'
// }

// transpilation/formatting
cordial.transpile({
	source: 'src/index.coffee'
}).rollup.coffee({
	dest: './'
})

// Rollup parameters
// shim: false,
// include: [],
// rollup: {
// 	resolver: {
// 		jsnext: true,
// 		main: true,
// 		extensions: ['.js', '.es6']
// 	},
// 	babel: {
// 		babelrc: false,
// 		comments: false
// 	},
// 	commonjs: {},
// 	output: {
// 		intro: null,
// 		outro: null,
// 		banner: null,
// 		footer: null,
// 		exports: 'auto',
// 		format: 'cjs'
// 	}
// }

// Tests
gulp.task('ava', cordial.test().ava(['test/*.js']))
gulp.task('xo', cordial.test().xo(['src/*.es6']))
gulp.task('test', gulp.parallel('xo', 'ava'))

// Filesystem
gulp.task('permissions', cordial.shell().permissions({
	mode: '755',
	dest: 'scripts/install.js'
}))

gulp.task('assets', gulp.parallel(
	cordial.shell({source: 'src/templates'}).copy(),
	cordial.shell({source: 'src/scripts'}).copy()
))

// Hooks
gulp.task('start-release', gulp.series('reset', 'master'))
gulp.task('test-release', gulp.series('test'))
gulp.task('finish-release', gulp.series('push-force'))

// Default
gulp.task('default', gulp.series('bump', 'bundle'))

/*
 * Default tasks
 */

// gulp.task('reset', api.build().reset())
// gulp.task('bump', api.build().inc())

// gulp.task('commit', api.git({all: true}).commit())

// gulp.task('push', gulp.parallel(
// 	api.git({branch: 'master'}).push(),
// 	api.git({branch: 'develop'}).push()
// ))

// gulp.task('push-force', gulp.parallel(
// 	api.git({branch: 'master'}).push({force: true}),
// 	api.git({branch: 'develop'}).push({force: true})
// ))

// gulp.task('push-tags', gulp.parallel(
// 	api.git({branch: 'master'}).push({tags: true}),
// 	api.git({branch: 'develop'}).push({tags: true})
// ))

// gulp.task('backup', gulp.series(
// 	'push',
// 	api.git({remote: 'backup'}).push({all: true})
// ))

// gulp.task('short-circuit', api.test().shortCircuit())
// gulp.task('test', gulp.series('short-circuit'))

// gulp.task('publish', api.npm().publish())

// gulp.task('version-release', api.flow.release().versioning())

// gulp.task('start-release', gulp.series('reset'))
// gulp.task('test-release', gulp.series('test'))
// gulp.task('finish-release', gulp.series('push-force', 'push-tags'))

// gulp.task('post-flow-release-start', gulp.series('start-release', 'version-release'))
// gulp.task('post-flow-release-finish', gulp.series('test-release', 'publish', 'finish-release'))

// gulp.task('filter-flow-release-start-version', api.flow.release().filter.version)
// gulp.task('filter-flow-release-finish-tag-message', api.flow.release().filter.tag)
