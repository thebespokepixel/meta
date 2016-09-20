'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var readPkg = _interopDefault(require('read-pkg-up'));

function index () {
	let cwd = arguments.length <= 0 || arguments[0] === undefined ? '..' : arguments[0];

	const pkg = readPkg.sync({ cwd });

	const metadata = {
		name: pkg.name,
		bin: Object.keys(pkg.bin)[0],
		description: pkg.description,
		copyright: `©${ pkg.copyright.year } ${ pkg.copyright.owner }`,
		license: pkg.license,
		bugs: pkg.bugs.url,
		version: function version() {
			let long_ = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

			const version = function () {
				if (pkg.buildNumber > 0) {
					return `${ pkg.version }-Δ${ pkg.buildNumber }`;
				}
				return `${ pkg.version }`;
			}();

			switch (long_) {
				case 3:
					return `v${ version }`;
				case 2:
					return `${ pkg.name } v${ version }`;
				default:
					return version;
			}
		}
	};

	return metadata;
}

module.exports = index;