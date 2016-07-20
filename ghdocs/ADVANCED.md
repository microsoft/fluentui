# Advanced usage

## Notes on module vs path-based imports

While it is possible to import all components as named imports from the main module entry point, it is not recommended to do so without using a bundler that supports es6 tree shaking. In other words, if you import the Button component like this:

```typescript
import { Button } from 'office-ui-fabric-react';
```

...this would work, but then unless you are using a tree-shaking bundler such as Rollup.js or Webpack 2, Webpack will assume you want every module exported from the main entry file to be included in your final bundle, which produces unnecessary large bundles and slows your page load down. Instead you can import the specific paths to trim down your bundle size:

```typescript
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { List } from 'office-ui-fabric-react/lib/List';
```

## Using an AMD bundler like r.js

If your project relies on AMD modules, they are dropped in the lib-amd folder. You will need to set up your bundler to handle the imports correctly. This may require you to symlink or copy the folder into your pre-bundle location.