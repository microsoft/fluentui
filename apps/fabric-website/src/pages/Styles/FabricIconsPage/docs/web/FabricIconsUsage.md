You can use Fabric's icons in a few ways, depending on if you're using Fabric React or Fabric Core.

### Fabric React

If you're using Fabric React, note that icons are not included in your bundle by default. To make the icons available, you'll need to initialize them by calling `initializeIcons` from the `@uifabric/icons` package. This is usually done at the root of your app:

```ts
import { initializeIcons } from '@uifabric/icons';
initializeIcons();
```

By default, this will load the icon fonts from the CDN used by OneDrive, SharePoint, and other Microsoft products. If you want to control where the fonts are served from, you can host them from another CDN or file share and pass that location to `initializeIcons`:

```ts
initializeIcons('https://my.cdn.com/path/to/icons/');
```

For more details about what `initializeIcons` does, check out Fabric's [wiki page about icons](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Using-icons).

Once you've initialized the icons, you can use the Icon component in your app like any other Fabric component:

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const MyIcon = () => <Icon iconName="CompassNW" className="ms-IconExample" />;

ReactDOM.render(<MyIcon />, document.body.firstChild);
```

Some components also include baked-in support for Icon via `iconProps`, which you can use to configure how the icon renders. Here's an example using IconButton:

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

const MyIconButton = () => <IconButton iconProps={{ iconName: 'Add' }} title="Add" ariaLabel="Add" />;

ReactDOM.render(<MyIconButton />, document.body.firstChild);
```

### Fabric Core

First, ensure that you've loaded the Fabric Core stylesheet following the [getting started instructions](#/get-started/web#fabric-core).

In your app, combine the base `ms-Icon` class with a modifier class for the specific icon:

```html
<i class="ms-Icon ms-Icon--Mail" aria-hidden="true"></i>
```

Note the `aria-hidden` attribute, which prevents screen readers from reading the icon. In cases where meaning is conveyed only through the icon, such as an icon-only navigation bar, use the [`aria-label` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) on the button for accessibility.

### Fabric Icons tool

The [Fabric Icons tool](https://aka.ms/uifabric-icons) lets you search and browse all of Fabric's icons. You can also use it to create and maintain subsets of the icon font to use in your web apps, which are drop-in replacements for the default Fabric Core and Fabric React icon sets. In addition, the Fabric Icons tool is updated with new icons several times a month, whereas the default Fabric set is updated only occasionally. You can see detailed docs for the tool at https://aka.ms/uifabric-icons?help.
