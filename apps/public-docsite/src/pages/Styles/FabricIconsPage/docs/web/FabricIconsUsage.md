You can use Fluent UI's icons in a few ways, depending on if you're using Fluent UI React or Fabric Core.

### Fluent UI React: Font-based icons

The Fluent UI font-based icon set is released under the [Microsoft Fabric Assets License](https://aka.ms/fluentui-assets-license).

If you're using Fluent UI React, note that icons are not included in your bundle by default. To make the icons available, you'll need to initialize them by calling `initializeIcons` from the `@fluentui/font-icons-mdl2` package. This is usually done at the root of your app:

```ts
import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();
```

By default, this will load the icon fonts from the CDN used by OneDrive, SharePoint, and other Microsoft products. If you want to control where the fonts are served from, you can host them from another CDN or file share and pass that location to `initializeIcons`:

```ts
initializeIcons('https://my.cdn.com/path/to/icons/');
```

For more details about what `initializeIcons` does, check out Fluent UI's [wiki page about icons](https://github.com/microsoft/fluentui/wiki/Using-icons).

Once you've initialized the icons, you can use the Icon component in your app like any other Fluent UI component:

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon } from '@fluentui/react/lib/Icon';

const MyIcon = () => <Icon iconName="CompassNW" />;

ReactDOM.render(<MyIcon />, document.body.firstChild);
```

Some components also include baked-in support for Icon via `iconProps`, which you can use to configure how the icon renders. Here's an example using IconButton:

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IconButton } from '@fluentui/react/lib/Button';

const MyIconButton = () => <IconButton iconProps={{ iconName: 'Add' }} title="Add" ariaLabel="Add" />;

ReactDOM.render(<MyIconButton />, document.body.firstChild);
```

#### Fluent UI React: SVG-based icons

The Fluent UI SVG-based icon set is open source and released under the MIT license.

This icon set allows you to import and bundle only the icons you need, resulting in smaller download sizes compared to the font-based approach with `initializeIcons`, which downloads all icons by default.

In `@fluentui/react` version 8, we are enabling more widespread use by open sourcing the core icon set. Be aware that any branded icons have been removed from `@fluentui/react-icons-mdl2`.

Each SVG icon is wrapped with a React element and can be imported and used as follows:

```ts
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChevronIcon } from '@fluentui/react-icons-mdl2';

ReactDOM.render(<ChevronIcon />, document.body.firstChild);
```

### Fabric Core

The Fabric Core icon set is released under the [Microsoft Fabric Assets License](https://aka.ms/fluentui-assets-license).

First, ensure that you've loaded the Fabric Core stylesheet following the [getting started instructions](#/get-started/web#fabric-core).

In your app, combine the base `ms-Icon` class with a modifier class for the specific icon:

```html
<i class="ms-Icon ms-Icon--Mail" aria-hidden="true"></i>
```

Note the `aria-hidden` attribute, which prevents screen readers from reading the icon. In cases where meaning is conveyed only through the icon, such as an icon-only navigation bar, use the [`aria-label` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) on the button for accessibility.

### Fluent UI Icons tool

The [Fluent UI Icons tool](https://aka.ms/fluentui-icons) lets you search and browse all of Fluent UI's icons. You can also use it to create and maintain subsets of the icon font to use in your web apps, which are drop-in replacements for the default Fabric Core and Fluent UI React icon sets. In addition, the Fluent UI Icons tool is updated with new icons several times a month, whereas the default Fluent UI set is updated only occasionally. You can see detailed docs for the tool at https://aka.ms/fluentui-icons?help. (Note: This tool is only for use with font-based icons currently.)
