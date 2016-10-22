#### Installation

```shell
npm install --save @thebespokepixel/meta
```

#### Setup

Import (or require) the module…

###### ES2015

```javascript
import meta from '@thebespokepixel/meta'
const metadata = meta(__dirname) // Start searching from inside this scripts module
```

###### CommonJS

```javascript
const metadata = require('@thebespokepixel/meta')('..') // Start searching from the cwd's parent.
```

