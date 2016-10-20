/* ──────────────────────╮
 │ @thebespokepixel/meta │
 ╰───────────────────────┴───────────────────────────────────────────────────── */
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
 * @return {metadata}   The map of reduced package metadata.
 */
export default function (cwd = '.') {
	const pkg = readPkg.sync({cwd}).pkg

	/**
	 * Extract metadata for sharing inside a package.
	 * @const {metadata}
	 * @property {String} name          The package's name
	 * @property {String} bin           The CLI binary we provide
	 * @property {String} description   The description from package.json
	 * @property {String} license       The package license
	 * @property {String} bugs          Our issues queue
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
		/**
		 * Print a package version string.
		 * @param  {Number} style The version string format wanted:
		 * ```
		 * 1: Simple number format: 0.1.2
		 * 2: Long version with name: @thebespokepixel/meta v0.1.2
		 * 3: v-prefixed version number: v0.1.2
		 * ```
		 * @return {String} The version string.
		 */
		version: (style = 1) => {
			const version = (function () {
				if (pkg.buildNumber > 0) {
					return `${pkg.version}-Δ${pkg.buildNumber}`
				}
				return `${pkg.version}`
			})()

			switch (style) {
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
