import readPkg from 'read-pkg-up';

function index (cwd = '..') {
	const pkg = readPkg.sync({ cwd });

	const metadata = {
		name: pkg.name,
		bin: Object.keys(pkg.bin)[0],
		description: pkg.description,
		copyright: `©${ pkg.copyright.year } ${ pkg.copyright.owner }`,
		license: pkg.license,
		bugs: pkg.bugs.url,
		version: (long_ = 1) => {
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

export default index;