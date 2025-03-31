- [Font-based icons](#font-based-icons)
  - [Alternative CDN options](#alternative-cdn-options)
  - [Creating an icon subset](#creating-an-icon-subset)
  - [What does `initializeIcons` do?](#what-does-initializeicons-do)
  - [Registering custom icons](#registering-custom-icons)
  - [Disabling warnings](#disabling-warnings)
    - [Test scenarios](#test-scenarios)
    - [Library icon registration](#library-icon-registration)

## Font-based icons

By default, the font-based Fluent UI icons are not added to your bundle or loaded on the page, in order to save bytes for scenarios where you don't care about icons, or you only care about a subset.

To make the icons available, you may initialize them as follows. Note that `initializeIcons()` should only be called **once per app** and must be called **before** rendering any components. This is typically done in the app's top-level file just before the main `ReactDOM.render()` call.

```tsx
// Also available from @uifabric/icons (7 and earlier) and @fluentui/font-icons-mdl2 (8+)
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons(/* optional base url */);
```

### Alternative CDN options

By default, the icon fonts for the default set of icons will be pulled from the SharePoint CDN. The default endpoint is `spoprod-a.akamaihd.net`, but if you run into access/security issues from the Akamai domain you can also use top level domain `res-1.cdn.office.net` or `res-2.cdn.office.net` for the `baseUrl`.

> Note that CDN endpoints are immutable so your baseURL will have a file path like `https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/`

If you would like the icons to be served from your own CDN, simply copy the files from `@uifabric/icons/fonts` (or `@fluentui/font-icons-mdl2/fonts` in version 8+) to your CDN. A build step is recommended to automate this. Then, in `initializeIcons`, provide the base URL to access those fonts. Note that it will require a trailing slash.

(If you're using custom icons as described under "Registering custom icons" below, you don't need to modify the CDN setting.)

### Creating an icon subset

The Fabric Icons tool, https://aka.ms/uifabric-icons, lets you search and browse all of Fabric/Fluent UI's MDL2 icons. You can also use it to create and maintain subsets of the icon font to use in your web apps, which are drop-in replacements for the default Fabric Core and Fluent UI React icon sets. In addition, the Fabric Icons tool is updated with new icons several times a month, whereas the default Fluent UI React set is updated only occasionally. You can see detailed docs for the tool at https://aka.ms/uifabric-icons?help.

Note that if you use the Fabric icons tool to create your own icon subset, you will also need to host those assets on your own CDN.

### What does `initializeIcons` do?

It registers a map of icon names, which define how to render icons. Icons can be rendered either through JSX components, or as a font character. The icon code will register the font-face definition only when a given icon from a subset is referenced.

What we're trying to optimize here is download size. We define a map of icon codes which map to a font-face. When the `Icon` component renders the `Upload` icon, we determine if the font-face has yet been registered, an if not, we add it to the page, causing the subset containing the `Upload` icon to be downloaded.

The `@uifabric/icons` package (or `@fluentui/font-icons-mdl2` in version 8+) can resolve over 1000 different icons, and will download from the 10+ font partitions, minimizing download overhead. We also include the most common icons in the first partition, optimizing for the basic scenarios. If there are commonly used icons missing in there, please file an issue so that we can evaluate adjusting the primary partition.

### Registering custom icons

If you want to use a different icon font or SVG icons, you can use `registerIcons` to add custom icons.

#### Custom SVG icons

SVG icons, such as the ones from `@fluentui/react-icons-mdl2`, can be registered as follows:

```tsx
import { registerIcons } from '@fluentui/react/lib/Styling';
import { ChevronDownIcon } from '@fluentui/react-icons-mdl2';

registerIcons({
  icons: {
    ChevronDown: <ChevronDownIcon />,
  },
});
```

You can then use those icons anywhere you'd normally use icons, such as the `Icon` component or in `iconProps`:

```tsx
import { Icon } from '@fluentui/react/lib/Icon';

const IconTest = () => <Icon iconName="ChevronDown" />;
```

#### Custom font family

You can also use this with custom font families:

```tsx
import { registerIcons } from '@fluentui/react/lib/Styling';

registerIcons({
  fontFace: {
    fontFamily: `"CustomFontFamily"`,
  },
  icons: {
    Up: '\uE417',
    Down: '\uE416',
  },
});
```

### Disabling warnings

When icons are rendered using the `Icon` component, but have not yet been registered, you will see console errors indicating so. In most cases, this can be addressed by registering the icons. But there are 2 cases, where this isn't desirable:

#### Test scenarios

In test scenarios, you may want to simply disable the warnings and avoid registering icons. To do this:

```tsx
import { setIconOptions } from '@fluentui/react/lib/Styling';

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});
```

#### Library icon registration

If your code is running in an environment where icons may have already been registered, you may need to disable the warnings. (By default, registering the same icon twice will ignore subsequent registrations.) To initialize icons and avoid duplication warnings, pass options into `initializeIcons`:

```tsx
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons(undefined, { disableWarnings: true });
```
