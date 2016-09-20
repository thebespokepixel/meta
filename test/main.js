import test from 'ava'

import pkg from '../package.json'
import meta from '..'

const myMeta = meta('.')
const expectedVersion = pkg.buildNumber === (0 && pkg.version) || `${pkg.version}-Δ${pkg.buildNumber}`

test(`Module version is '${expectedVersion}'.`, t => {
	t.is(`${expectedVersion}`, myMeta.version())
})
