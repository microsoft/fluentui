
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
  colorClassNames,
  fontClassNames
} from '@uifabric/styling';

function renderHtml() {
  return (
    `<div class="${ [
      colorClassNames.themePrimary,
      fontClassNamed.medium
      ].join(' ') }">Hello world!</div>`
  );
}
```

There are a number of classes available under `colorClassNames`, `fontClassNames`, `AnimationClassNames`, and `iconClassNames` exports. See the [available classes](#availableClasses) below.

Using animations works the same way:

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

Rendering icons is also simplified:

```tsx
import {
  classNames
} from '@uifabric/styling';

function renderHtml() {
  return (
    `<i class="${ classNames.icons.snow }" />`
  );
}
```

# Usage via JavaScript styling libraries (Glamor, Aphrodite)

If you need access to the raw JavaScript style objects so that you can mix them into other classes and use via a css library such as Glamor or Aphrodite, you can access the raw classes like so:

```tsx
import {
  styles
} from '@uifabric/styling';
import { css } from 'glamor';

function renderHtml() {
  let className = css({
    ...styles.fonts.large,
    background: 'red'
  });
  return (
    `<div class="${ css(styles.fonts.large, { background: 'red' }) }">Hello!</div>`
  );
}
```


# Overriding the theme colors

The default palette of colors matches the default Fabric core styling conventions. However, it is possible to override the color slots to match your product requirements:

```tsx
import {
  loadTheme({
    colors: {
      themePrimary: 'red',
      themeSeconary: 'blue'
    }
  });
}
```

If you override theme settings, you need to do this before accessing theme colors. Otherwise you won't get a notification that the theme changed.

# Available classes
<a name="availableClasses"></a>

## Colors (classNames.colors members)

Members of `classNames.colors`:

| Name | Description |
|------|-------------|

## Fonts

Members of `classNames.fonts`:

| Name | Description |
|------|-------------|


## Animations (classNames.animations members)

Members of `classNames.animations`:

| Name | Description |
|------|-------------|

## Icons (classNames.icons members)

Members of `classNames.icons`:

| Name | Description |
|------|-------------|
