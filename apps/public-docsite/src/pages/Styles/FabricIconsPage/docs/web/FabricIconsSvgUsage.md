An SVG-based version of Fluent UI's icon set is available from `@fluentui/react-icons-mdl2` and is released under the MIT license. This is the same MDL2 icon set used in the font icons, excluding any product icons.

Product SVG icons are available from `@fluentui/react-icons-mdl2-branded` and are still subject to the [Microsoft Fabric Assets License](https://aka.ms/fluentui-assets-license).

Both packages contain SVG icons wrapped in React components. This allows you to import and bundle only the icons you need, resulting in smaller download sizes compared to the font-based approach with `initializeIcons`, which downloads all icons by default.

The SVG icon components are primarily intended to be used directly, rather than registering them globally (via `registerIcons` or `initializeIcons`) and referencing them by name in Fluent UI React's `Icon` component or via `iconProps.name`. For example:

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChevronDownIcon } from '@fluentui/react-icons-mdl2';

ReactDOM.render(<ChevronDownIcon />, document.body.firstChild);
```

If you do need to make SVG icons available to reference by name (for example, in Fluent UI React components which take `iconProps`), this can be done using `registerIcons` as follows:

```tsx
import { unregisterIcons, registerIcons } from '@fluentui/react/lib/Styling';
// Note: This approach works with any SVG icon set, not just @fluentui/react-icons-mdl2
import { ChevronDownIcon, BadgeIcon } from '@fluentui/react-icons-mdl2';

// Note: For any icon name that has an icon already registered to it, you need to unregister it first before registering a new one
unregisterIcons(['ChevronDown']);

registerIcons({
  icons: {
    ChevronDown: <ChevronDownIcon />,
    ANewIconName: <BadgeIcon />,
  },
});
```
