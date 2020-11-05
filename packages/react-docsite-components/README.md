# @fluentui/react-docsite-components

Components and utilities used to build internal documentation sites and inner loops for various [Fluent UI React](https://developer.microsoft.com/en-us/fluentui) ([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)) packages.

**This package is in maintenance mode while we work on a replacement.** It should only be used in new projects if you must have a published documentation site that looks like the official Fluent UI React docs. If all you need is an inner loop for component development, **please use [Storybook](https://storybook.js.org/) instead.** Storybook is a well-supported, well-documented platform for component development and documentation.

## Live editor support

To set up the live code editor in the demo app for a package other than the `@fluentui/react` package itself:

1. Follow the setup steps from the [`@fluentui/monaco-editor` readme](https://github.com/microsoft/fluentui/blob/master/packages/monaco-editor/README.md) (the helpers mentioned are also re-exported from `@fluentui/react-monaco-editor` for convenience).

2. Set up a `.d.ts` rollup file for your package using API Extractor.

3. Add a dependency on `raw-loader` to the package containing your demo app.

4. Define the custom list of supported packages. For demonstration purposes, we'll assume:

   - You're building off the default set of supported packages
   - The package you're demoing is `my-package`
   - `my-package` re-exports another package called `my-package-utilities` (it's not required that your package export anything else, but this is included to demonstrate setting it up)
   - Each package's `.d.ts` rollup lives under `<package-folder>/dist/<unscoped-package-name>.d.ts`

```ts
import { IPackageGroup } from '@fluentui/react-monaco-editor';
import { defaultSupportedPackages } from '@fluentui/react-monaco-editor/lib/utilities/defaultSupportedPackages';

export const editorSupportedPackages: IPackageGroup[] = [
  ...defaultSupportedPackages,
  {
    // Package's exports will be made available under this global name at runtime
    globalName: 'MyPackage',
    // Loader for the package's contents
    loadGlobal: () => import('my-package'),
    // Alternatively, for non-delayed loading:
    //   loadGlobal: () => require('my-package'),
    // Or at the top of the file, `import * as MyPackage from 'my-package'`, then:
    //   loadGlobal: () => Promise.resolve(MyPackage)
    packages: [
      {
        packageName: 'my-package',
        loadTypes: () => {
          // Use import() so the types can potentially be split into a separate chunk and delay loaded.
          // If you don't care about that, you could use require() instead.
          // @ts-ignore: import is handled by webpack
          return import('!raw-loader!my-package/dist/my-package.d.ts');
        },
      },
      {
        // my-package re-exports my-package-utilities from its root, so it goes under the same global
        packageName: 'my-package-utilities',
        loadTypes: () => {
          // @ts-ignore: import is handled by webpack
          return import('!raw-loader!my-package-utilities/dist/my-package-utilities.d.ts');
        },
      },
    ],
  },
];
```

5. To apply to a single `ExampleCard`:

```tsx
import { editorSupportedPackages } from '<file path>';
import { MyExample } from './MyExample.Example';
const MyExampleCode = require('!raw-loader!./MyExample.Example.tsx');

<ExampleCard title="My example" code={MyExampleCode} editorSupportedPackages={editorSupportedPackages}>
  <MyExample />
</ExampleCard>;
```

6. To apply to all `ExampleCard` instances in your app:

```ts
import { editorSupportedPackages } from '<file path>';
import { IExampleCardProps, IAppDefinition } from '@fluentui/react-docsite-components';

const exampleCardProps: IExampleCardProps = { editorSupportedPackages };

// same applies with ISiteDefinition
const appDefinition: IAppDefinition = {
  // ...
  theme: {
    components: {
      ExampleCard: {
        styles: exampleCardProps,
      },
    },
  },
};
```
