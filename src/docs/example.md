#### Installation

```shell
npm install --save @thebespokepixel/meta
```

#### Setup

Import (or require) the module…

```javascript
import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import meta from '@thebespokepixel/meta'

const metadata = meta(dirname(fileURLToPath(import.meta.url))) // Start searching from inside this scripts module
```

