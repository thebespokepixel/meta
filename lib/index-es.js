import readPkg from 'read-pkg-up';

function index (cwd = '.') {
	const pkg = readPkg.sync({ cwd }).pkg;

	const metadata = {
		get name() {
			return pkg.name;
		},
		get description() {
			return pkg.description ? pkg.description : 'No description';
		},
		get copyright() {
			if (pkg.copyright && pkg.copyright.year) {
				return `©${ pkg.copyright.year } ${ pkg.copyright.owner }`;
			}
			return pkg.copyright ? pkg.copyright : `©${ new Date().getFullYear() } ${ pkg.author.name }`;
		},
		get license() {
			return pkg.license;
		},
		get bugs() {
			return pkg.bugs.url;
		},
		get bin() {
			return pkg.bin ? Object.keys(pkg.bin)[0] : 'none';
		},
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