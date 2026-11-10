Fluent UI has traditionally used a custom font for its iconography. This font is part of the MDL2 design system and contains glyphs that you can scale, color, and style in any way. You can also download and install the [icon font](#/resources) to use it with various design apps like Sketch, Figma, or Adobe XD.

### Fluent UI React

The Fluent UI font-based icon set is released under the [Microsoft Fabric Assets License](https://aka.ms/fluentui-assets-license).

To make the font-based icons available when using Fluent UI React, you'll need to initialize them by calling `initializeIcons` from the `@fluentui/font-icons-mdl2` package. This is usually done at the root of your app:

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
import * as ReactDOMClient from 'react-dom/client';
import { Icon } from '@fluentui/react/lib/Icon';

const MyIcon = () => <Icon iconName="CompassNW" />;

ReactDOMClient.createRoot(document.body.firstChild).render(<MyIcon />);
```

Some components also include baked-in support for Icon via `iconProps`, which you can use to configure how the icon renders. Here's an example using IconButton:

```tsx
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { IconButton } from '@fluentui/react/lib/Button';

const MyIconButton = () => <IconButton iconProps={{ iconName: 'Add' }} title="Add" ariaLabel="Add" />;

ReactDOMClient.createRoot(document.body.firstChild).render(<MyIconButton />);
```

### Fabric Core

The Fabric Core icon set is released under the [Microsoft Fabric Assets License](https://aka.ms/fluentui-assets-license).

This approach is primarily intended for non-React-based pages or apps.

First, ensure that you've loaded the Fabric Core stylesheet following the [getting started instructions](#/get-started/web#fabric-core).

In your app, combine the base `ms-Icon` class with a modifier class for the specific icon:

```html
<i class="ms-Icon ms-Icon--Mail" aria-hidden="true"></i>
```

Note the `aria-hidden` attribute, which prevents screen readers from reading the icon. In cases where meaning is conveyed only through the icon, such as an icon-only navigation bar, use the [`aria-label` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) on the button for accessibility.

### Icon subsets

The Fluent UI icons subsetting tool is no longer publicly available. For web apps that need font-based icons, use the default CDN, host the font files from `@fluentui/font-icons-mdl2/fonts` yourself and pass that location to `initializeIcons`, or register custom icons with `registerIcons`.
