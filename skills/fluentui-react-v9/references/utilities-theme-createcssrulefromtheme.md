# Utilities/Theme/createCSSRuleFromTheme

This API allows you to create CSS from a theme and apply this CSS, for example, to `<body>`.

## Best practices

### Do

- **Create CSS rules outside of component lifecyles.**
  CSS rule creation involves iterating the entire theme and is relatively costly. Aim to create CSS rules only as needed, for example, during application boot prior to rendering any UI.

- **Prefer using `FluentProvider`.**
  `FluentProvider` generates CSS rules using `createCSSRuleFromTheme()` and should cover most cases. Only reach for `createCSSRuleFromTheme()` when
  `FluentProvider` cannot address your needs.

## Examples

### Default

```tsx
/* eslint-disable no-restricted-properties */
import * as React from 'react';
import { makeStyles, tokens, mergeClasses, createCSSRuleFromTheme, webLightTheme } from '@fluentui/react-components';

const useStyles = makeStyles({
  colorBrandBackground: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  colorBrandBackground2: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground2,
  },
  box: { padding: tokens.spacingHorizontalM },
  layout: {
    display: 'flex',
    gap: `${tokens.spacingHorizontalM} ${tokens.spacingVerticalM}`,
  },
});

export const Default = () => {
  React.useLayoutEffect(() => {
    // When theme switching is not needed, you can use the `:root` selector
    const cssRule = createCSSRuleFromTheme(':root', webLightTheme);

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule(cssRule);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const styles = useStyles();

  return (
    <div className={styles.layout}>
      <div className={mergeClasses(styles.box, styles.colorBrandBackground)}>colorBrandBackground</div>
      <div className={mergeClasses(styles.box, styles.colorBrandBackground2)}>colorBrandBackground2</div>
    </div>
  );
};
```

### Switching

```tsx
/* eslint-disable no-restricted-properties */
import * as React from 'react';
import {
  makeStyles,
  tokens,
  mergeClasses,
  createCSSRuleFromTheme,
  webLightTheme,
  webDarkTheme,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  colorBrandBackground: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  colorBrandBackground2: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground2,
  },
  box: { padding: tokens.spacingHorizontalM },
  horizontalLayout: {
    display: 'flex',
    gap: `${tokens.spacingHorizontalM} ${tokens.spacingVerticalM}`,
  },
  verticalLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${tokens.spacingHorizontalM} ${tokens.spacingVerticalM}`,
  },
});

export const Switching = () => {
  React.useLayoutEffect(() => {
    const lightThemeCSS = createCSSRuleFromTheme('.fluentui-light-theme', webLightTheme);
    const darkThemeCSS = createCSSRuleFromTheme('.fluentui-dark-theme', webDarkTheme);

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule(lightThemeCSS);
    style.sheet?.insertRule(darkThemeCSS);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Toggle the class name to change themes
  const [selectedTheme, setSelectedTheme] = React.useState<'fluentui-light-theme' | 'fluentui-dark-theme'>(
    'fluentui-light-theme',
  );

  const styles = useStyles();

  return (
    <div className={styles.verticalLayout}>
      <div className={styles.verticalLayout}>
        <div>
          <input
            type="radio"
            id="light-theme"
            name="theme"
            value="fluentui-light-theme"
            onChange={e => setSelectedTheme('fluentui-light-theme')}
            checked={selectedTheme === 'fluentui-light-theme'}
          />

          <label htmlFor="light-theme">Fluent UI light theme</label>
        </div>
        <div>
          <input
            type="radio"
            id="dark-theme"
            name="theme"
            value="fluentui-dark-theme"
            onChange={e => setSelectedTheme('fluentui-dark-theme')}
            checked={selectedTheme === 'fluentui-dark-theme'}
          />

          <label htmlFor="dark-theme">Fluent UI dark theme</label>
        </div>
      </div>
      <div className={mergeClasses(styles.horizontalLayout, selectedTheme)}>
        <div className={mergeClasses(styles.box, styles.colorBrandBackground)}>colorBrandBackground</div>
        <div className={mergeClasses(styles.box, styles.colorBrandBackground2)}>colorBrandBackground2</div>
      </div>
    </div>
  );
};
```
