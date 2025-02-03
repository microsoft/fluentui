Theming is a really important part of any design system. Teams should look to tokens and variables first when considering how to change the look and feel of an app. Teams sometimes need a more powerful tool to accomplish their mission or sometimes just to handle edge cases. This document explains how to leverage the custom style hooks built into Fluent UI React V9.

Most of the Fluent UI React v9 components are structured using the hooks approach:

```tsx
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);

  useButtonStyles_unstable(state);
  useCustomStyleHook_unstable('useButtonStyles_unstable')(state);

  return renderButton_unstable(state);
}) as ForwardRefComponent<ButtonProps>;
```

The pertinent lines are where styles are calculated:

```ts
useButtonStyles_unstable(state);
useCustomStyleHook_unstable('useButtonStyles_unstable')(state);
```

The default styles are defined by `useButtonStyles_unstable` and are packaged with every component. `useCustomStyleHook_unstable` reaches into a `CustomStyleHooksProvider` provider (if it exists) and calculates any styles that match the component type.

> 💡See RFC [microsoft/fluentui#25333](https://github.com/microsoft/fluentui/pull/25333) for a detailed explanation.

For example, an `App.tsx` might look like:

```tsx
import { Button, FluentProvider, webLightTheme, CustomStyleHooksProvider_unstable } from '@fluentui/react-components';
import { AlertRegular } from '@fluentui/react-icons';
import { FANCY_CUSTOM_STYLE_HOOKS } from './FancyAppCustomStyleHooksValue.ts';

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Button>I am a Vanilla Fluent Button</Button>
      <CustomStyleHooksProvider_unstable value={FANCY_CUSTOM_STYLE_HOOKS}>
        <Button icon={<AlertRegular />}>I am a *Fancy* Button</Button>
      </CustomStyleHooksProvider_unstable>
    </FluentProvider>
  );
}
```

A little scaffodling is required to get here first:

- Define a `useFancyButtonStyles.ts`, and build out a style calculation similar to how you'd define the style for any other Fluent component:

  ```ts
  import { makeStyles, type ButtonState } from '@fluentui/react-components';

  const useStyles = makeStyles({
    root: {
      // These are all unique to Fancy theme.
      border: '2px solid green',
      backgroundColor: 'pink',
      borderRadius: '64px',
    },
    icon: {
      color: 'blue',
      backgroundColor: 'white',
    },
  });

  export const useFancyButtonStyles = (state: unknown) => {
    const buttonState = state as ButtonState;
    const styles = useStyles();
    buttonState.root.className = mergeClasses(buttonState.root.className, styles.root);

    if (buttonState.icon) {
      buttonState.icon.className = mergeClasses(buttonState.icon.className, styles.icon);
    }
  };
  ```

  - Define the value for `CustomStyleHooksProvider_unstable` in `FancyAppCustomStyleHooksValue.ts` that consumes custom style hooks:

  ```ts
  import { type CustomStyleHooksContextValue } from '@fluentui/react-components';
  import { useFancyButtonStyles } from './useFancyButtonStyles';

  export const FANCY_CUSTOM_STYLE_HOOKS: CustomStyleHooksContextValue = {
    useButtonStyles_unstable: useFancyButtonStyles,
    // ... more component styles as needed for your theme.
  };
  ```

  - And finally use the `CustomStyleHooksProvider_unstable` in your app:

  ```diff
  // App.tsx
  + import { FANCY_CUSTOM_STYLE_HOOKS } from './FancyAppCustomStyleHooksValue';

  <FluentProvider theme={webLightTheme}>
  + <CustomStyleHooksProvider_unstable value={FANCY_CUSTOM_STYLE_HOOKS}>
     {/* application code ... */}
  + </CustomStyleHooksProvider_unstable>
  </FluentProvider>
  ```

### Nesting custom style hooks

One caveat is that `CustomStyleHooksProvider` does not merge contexts' values, for example:

```tsx
export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <CustomStyleHooksProvider_unstable
        value={{
          useButtonStyles_unstable,
          useImageStyles_unstable,
        }}
      >
        <CustomStyleHooksProvider_unstable
          value={{
            useLinkStyles_unstable,
          }}
        >
          {/* ⚠️ The nested "CustomStyleHooksProvider_unstable" provider completely overwrites values. */}
          {/*    I.e. only "useLinkStyles_unstable" will be passed down. Button and Image style overrides get completely ignored here.*/}

          {/* application code ... */}
        </CustomStyleHooksProvider_unstable>
      </CustomStyleHooksProvider_unstable>
    </FluentProvider>
  );
}
```

Applications should make the best decisions for their styles, determining when and how to apply them. If apps have their own custom style hooks and want to adopt others, they can gracefully merge them:

```tsx
export const useAppCustomButtonStyles = (state: unknown) => {
  const buttonState = state as ButtonState;

  // "Fancy" comes first
  useFancyButtonStyles(buttonState);
  // "Smart" comes second, so it will win where there are conflicts
  useSmartButtonStyles(buttonState);
};

export const AppCustomStyleHooks: CustomStyleHooksContextValue = {
  useButtonStyles_unstable: useAppCustomButtonStyles,
  // ... more component style overrides
};
```

This way, apps can adopt the styles they need at scale without sacrificing their own style preferences.
