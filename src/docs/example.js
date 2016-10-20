// #### Installation

console.log('sh', 'npm install --save @thebespokepixel/meta')

// #### Setup

// Require (or import) the module…
// ES2015
console.log('import meta from \'@thebespokepixel/meta\'\nconst metadata = meta(__dirname)\n// Start searching from inside this scripts module')

// CommonJS
console.log(`const metadata = require('@thebespokepixel/meta')('..')\n// Start searching from the cwd's parent.`)
