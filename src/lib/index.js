/* ──────────────────────╮
 │ @thebespokepixel/meta │
 ╰───────────────────────┴──────────────────────────────────────────────────────*/
/**
 * @module @thebespokepixel/meta
 * @private
 */

import readPkg from 'read-pkg-up'

/**
 * Creates the metadata collection function, starting at the path provided or
 * the current working directory by default.
 * @function meta
 * @param  {String} cwd The directory to start searching for a package.json file.
 * @return {metadata}     The map of reduced package metadata.
 * @example <caption>ES2015</caption>
 * import meta from '@thebespokepixel/meta'
 * const metadata = meta('..')
 *
 * @example <caption>CommonJS</caption>
 * const metadata = require('@thebespokepixel/meta')('..')
 */
export default function (cwd = '.') {
	const pkg = readPkg.sync({cwd}).pkg

	/**
	 * Extract metadata for sharing inside a package.
	 * @typedef {metadata}
	 * @property {String} name          The package's name
	 * @property {String} bin           The CLI binary we provide
	 * @property {String} description   The description from package.json
	 * @property {String} license       The package license
	 * @property {String} bugs          Our issues queue
	 * @property {Function} version     Print the package version
	 */
	const metadata = {
		get name() {
			return pkg.name
		},
		get description() {
			return pkg.description ? pkg.description : 'No description'
		},
		get copyright() {
			if (pkg.copyright && pkg.copyright.year) {
				return `©${pkg.copyright.year} ${pkg.copyright.owner}`
			}
			return pkg.copyright ? pkg.copyright :
				`©${new Date().getFullYear()} ${pkg.author.name}`
		},
		get license() {
			return pkg.license
		},
		get bugs() {
			return pkg.bugs.url
		},
		get bin() {
			return pkg.bin ? Object.keys(pkg.bin)[0] : 'none'
		},
		version: (long_ = 1) => {
			const version = (function () {
				if (pkg.buildNumber > 0) {
					return `${pkg.version}-Δ${pkg.buildNumber}`
				}
				return `${pkg.version}`
			})()

			switch (long_) {
				case 3:
					return `v${version}`
				case 2:
					return `${pkg.name} v${version}`
				default:
					return version
			}
		}
	}

	return metadata
}
