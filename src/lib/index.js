/* ──────────────────────╮
 │ @thebespokepixel/meta │
 ╰───────────────────────┴──────────────────────────────────────────────────────*/
/**
 * Look up the file system hierarchy, starting from {cwd}, for a package file
 * and return package metadata as a sanitised map.
 * @alias thebespokepixel/meta
 */

import readPkg from 'read-pkg-up'

/**
 * Default function.
 * @alias  default
 * @param  {String} cwd The directory to start searching for a package.json file.
 * @return {Object}     A sanitised map of package metadata.
 */
export default function (cwd = '..') {
	const pkg = readPkg.sync({cwd})

	const bin = pkg.bin ? Object.keys(pkg.bin)[0] : 'none'

	/**
	 * Extract metadata for sharing inside the package.
	 * @type {Object}
	 * @property {String} name          The package's name
	 * @property {String} bin           The CLI binary we provide
	 * @property {String} description   The description from package.json
	 * @property {String} license       The package license
	 * @property {String} bugs          Our issues queue
	 * @property {Function} version     Print the pacakge version, arg value:
	 *                                  1. Version number
	 *                                  2. Long version
	 *                                  3. v-prefixed version number.
	 */
	const metadata = {
		name: pkg.name,
		bin,
		description: pkg.description,
		copyright: `©${pkg.copyright.year} ${pkg.copyright.owner}`,
		license: pkg.license,
		bugs: pkg.bugs.url,
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
