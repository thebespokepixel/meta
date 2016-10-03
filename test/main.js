import test from 'ava'

import pkg from '../package.json'
import meta from '..'

const myMeta = meta()
const expectedVersion = pkg.buildNumber === (0 && pkg.version) || `${pkg.version}-Δ${pkg.buildNumber}`

const bin = pkg.bin ? Object.keys(pkg.bin)[0] : 'none'

let copyright = pkg.copyright ? pkg.copyright :
	`©${new Date().getFullYear()} ${pkg.author.name}`

if (pkg.copyright && pkg.copyright.year) {
	copyright = `©${pkg.copyright.year} ${pkg.copyright.owner}`
}

test(`Module name is '${pkg.name}'.`, t => {
	t.is(`${pkg.name}`, myMeta.name)
})

test(`Module description is '${pkg.description}'.`, t => {
	t.is(`${pkg.description}`, myMeta.description)
})

test(`Module copyright is '${copyright}'.`, t => {
	t.is(`${copyright}`, myMeta.copyright)
})

test(`Module license is '${pkg.license}'.`, t => {
	t.is(`${pkg.license}`, myMeta.license)
})

test(`Module bug reporting is at '${pkg.bugs.url}'.`, t => {
	t.is(`${pkg.bugs.url}`, myMeta.bugs)
})

test(`Module main binary is '${bin}'.`, t => {
	t.is(`${bin}`, myMeta.bin)
})

test(`Module version is '${expectedVersion}'.`, t => {
	t.is(`${expectedVersion}`, myMeta.version())
})

test(`Module name/version is '${expectedVersion}'.`, t => {
	t.is(`${pkg.name} v${expectedVersion}`, myMeta.version(2))
})

test(`Module text version is 'v${expectedVersion}'.`, t => {
	t.is(`v${expectedVersion}`, myMeta.version(3))
})
