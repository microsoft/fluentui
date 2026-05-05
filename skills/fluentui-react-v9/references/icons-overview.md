# Icons/Overview

The `@fluentui/react-icons` package provides [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) icon set. Each icon within this set is encapsulated within a React component, utilizing SVG-based graphics. Icons are available in two distinct styles: `Filled` and `Regular`.

## Sized icons vs unsized icons

- **Unsized** icons (e.g., `SendRegular`, `SendFilled`, etc.) are set to `1em` in size and can be adjusted proportionally using the `fontSize` property.
- **Sized** icons (e.g., `Send24Regular`, `Send32Regular`) are fixed to predetermined sizes and do not scale.

As a general guideline, it's recommended to utilize unsized icons since the same instance of an icon can be reused multiple times. However, there are instances where icons may not scale effectively. For example, icons containing logos and signs often have varied glyph sizes. In such cases, it's advisable to opt for sized icons.

---

You can preview <a href="" data-sb-kind="icons-catalog--docs">all icons in the catalog</a>.

## Examples

### Default

```tsx
import { makeStyles, shorthands } from '@fluentui/react-components';
import { SendRegular, SendFilled } from '@fluentui/react-icons';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('5px'),
  },

  icon24: { fontSize: '24px' },
  icon32: { fontSize: '32px' },
  icon48: { fontSize: '48px' },
});

export const Default = () => {
  const classes = useClasses();

  return (
    <>
      <div className={classes.container}>
        <SendRegular className={classes.icon24} aria-label="SendRegular size 24" />
        <SendRegular className={classes.icon32} aria-label="SendRegular size 32" />
        <SendRegular className={classes.icon48} aria-label="SendRegular size 48" />
      </div>
      <div className={classes.container}>
        <SendFilled className={classes.icon24} aria-label="SendFilled size 24" />
        <SendFilled className={classes.icon32} aria-label="SendFilled size 32" />
        <SendFilled className={classes.icon48} aria-label="SendFilled size 48" />
      </div>
    </>
  );
};
```

### Font Size

As icons are SVG elements they can be styled using [`fontSize` prop](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-size).

```tsx
import { AccessTimeFilled } from '@fluentui/react-icons';
import { makeStyles, shorthands } from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('10px'),
  },
});

export const FontSize = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <AccessTimeFilled aria-label="An AccessTimeFilled (32px size) icon" fontSize="32px" />
      <AccessTimeFilled aria-label="An AccessTimeFilled (64px size) icon" fontSize="64px" />
    </div>
  );
};
```

### Styling

Colors & sizes of icons could be tweaked using CSS. Bundled icons can be styled the same way.

```tsx
import { AccessTimeFilled, SendRegular } from '@fluentui/react-icons';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('10px'),
  },

  iconAccessTime: {
    color: tokens.colorPaletteLightGreenForeground2,
    fontSize: '32px',
  },
  iconSend: {
    color: tokens.colorPaletteDarkOrangeForeground2,
    fontSize: '64px',
  },
});

export const Styling = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <AccessTimeFilled aria-label="An AccessTimeFilled icon" className={classes.iconAccessTime} />
      <SendRegular aria-label="A SendRegular icon" className={classes.iconSend} />
    </div>
  );
};
```

### Bundle Icon

`bundleIcon()` is used to combine the `Regular` and `Filled` versions of icons and could be used to toggle between them on hover. Some of Fluent UI React component have also "fill-on-hover" behavior built-in, for example `Button` & `MenuItem`.

```tsx
import {
  AccessTimeFilled,
  AccessTimeRegular,
  bundleIcon,
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { Body1Stronger, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    ...shorthands.padding('10px'),
    ...shorthands.border('2px', 'solid', tokens.colorBrandStroke1),
    boxSizing: 'border-box',
    width: '200px',
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,

    fontSize: '32px',
    ':hover': {
      [`& .${iconFilledClassName}`]: {
        display: 'block',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
  },
  description: {
    display: 'block',
    width: '200px',
    boxSizing: 'border-box',
    backgroundColor: tokens.colorBrandStroke1,
    color: tokens.colorNeutralForegroundOnBrand,

    ...shorthands.padding('4px'),
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
  },
});

const AccessTime = bundleIcon(AccessTimeFilled, AccessTimeRegular);

export const BundleIcon = () => {
  const classes = useClasses();

  return (
    <>
      <div className={classes.description}>
        <Body1Stronger>Hover a box below</Body1Stronger>
      </div>
      <div className={classes.container}>
        <AccessTime aria-label="An AccessTime icon" />
      </div>
    </>
  );
};
```
