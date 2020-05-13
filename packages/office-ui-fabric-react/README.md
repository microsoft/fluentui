> The **Office UI Fabric React** project has evolved into **Fluent UI React**! We have a lot in store for Fluent UI - [Read our announcement here](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/) and see more details about what this means for package consumers below.

# [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)

**The React-based front-end framework for building experiences for Microsoft 365.**

Fluent UI React ([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)) is a collection of robust React-based components designed to make it simple for you to create consistent web experiences using the Fluent Design Language.

For information about available controls, see the [Fluent UI website](https://developer.microsoft.com/en-us/fluentui).

To get started using or contributing to Fluent UI React, see the [full readme](https://github.com/microsoft/fluentui/blob/master/README.md).

## Moving to `@fluentui/react`

Going forward, the `office-ui-fabric-package` will be renamed to `@fluentui/react`. The `@fluentui/react` package exists today as a mirror of `office-ui-fabric-react`'s public API surface. (Updates will still be published under both names for at least the duration of version 7.)

If you'd like to start using `@fluentui/react` now, you can do so by changing your dependency and imports.

Imports in either of these formats can be directly renamed:

```ts
// Old
import { TextField } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// New
import { TextField } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
```

However, deeper imports from internal files **will not** work with `@fluentui/react`. (These types of imports are also unsupported today, as internal file paths are considered private APIs and therefore subject to change without notice.)

```ts
// Not supported currently; won't work with @fluentui/react
import { TextField } from 'office-ui-fabric-react/lib/components/TextField/index';

// Use instead
import { TextField } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
```

If you're currently depending on an API which you think should be public but is not exported from the top level of the package, please [file an issue](https://github.com/microsoft/fluentui/issues) to discuss.
