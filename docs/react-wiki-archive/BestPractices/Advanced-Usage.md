## Notes on module vs path-based imports

We highly recommend using Webpack 4+. If you use Webpack 4 or Rollup.js, you can take advantage of tree-shaking to create smaller bundles. This allows you to imports the parts you need in a natural way:

```typescript
import { Button } from '@fluentui/react'; // or office-ui-fabric-react in earlier versions
```

This import will include the Button, plus the dependent modules. It should not include any modules that are unrelated.

## For Webpack < 4 or Browserify

If you are using a non-tree-shaking bundler, you may accrue larger bundle sizes by importing from the package entry point `@fluentui/react` (or `office-ui-fabric-react` in earlier versions). By default bundlers will include every module referenced from that entry point, even if you don't use them.

To address this friction, we also offer "top level imports" which help scope the graph to only the component and its dependencies.

```typescript
import { Button } from '@fluentui/react/lib/Button';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { List } from '@fluentui/react/lib/List';
```

For a full list of top level imports, see the source here:

https://github.com/microsoft/fluentui/tree/master/packages/@fluentui/react/src

## Using an AMD bundler like r.js

If your project relies on AMD modules, they are dropped in the lib-amd folder. You will need to set up your bundler to handle the imports correctly. This may require you to symlink or copy the folder into your pre-bundle location.
