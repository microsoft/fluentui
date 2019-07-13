
# Summary

# Using the styling package

Integrating components into your project depends heavily on your setup. The recommended setup is to use a bundler such as webpack which can resolve NPM package imports in your code and can bundle the specific things you import.

Within an npm project, you should install the package and save it as a dependency:

```bash
npm install --save @uifabric/styling
```

This will add the styling package which gives you access to the Fabric Core style classes through JavaScript.

# Using Fabric core classes

Fonts, colors, icons and animations are exported through the `classNames` export. The export exposes class names for `colors`, `fonts`, `animations`, and `icons`.

Example of returning markup that is `themePrimary` colored using the `medium` font:

```tsx
import {
  ColorClassNames,
  FontClassNames
} from '@uifabric/styling';

function renderHtml() {
  return (
    `<div class="${ [
      ColorClassNames.themePrimary,
      FontClassNamed.medium
      ].join(' ') }">Hello world!</div>`
  );
}
```

There are a number of classes available under `ColorClassNames`, `FontClassNames`, and `AnimationClassNames` exports.

```tsx
import {
  AnimationClassNames
} from '@uifabric/styling';

function renderHtml() {
  return (
    `<div class="${ AnimationClassNames.fadeIn }">Hello world!</div>`
  );
}
```


# Overriding the theme colors

The default palette of colors matches the default Fabric core styling conventions. However, it is possible to override the color slots to match your product requirements:

```tsx
import {
  loadTheme({
    palette: {
      themePrimary: 'red',
      themeSecondary: 'blue'
    }
  });
}
```

If you override theme settings, you need to do this before accessing theme colors. Otherwise you won't get a notification that the theme changed.


