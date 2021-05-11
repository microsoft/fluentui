### CSS-in-JS

Fluent UI's recommended styling approach uses CSS-in-JS and revolves around the `styles` prop, which is provided by most Fluent UI components and allows strongly-typed customizations to individual areas of a component.

#### `styles` prop

A component consists of DOM elements, or "areas." Each of the areas should be targetable for styling.

To find the available areas for a component, use intellisense or look at the `IComponentStyles` interface in the component's `Component.types.ts` file (substituting the actual component name for "Component").

#### Object-based styling

```tsx
// Define styling, split out styles for each area.
const styles: IComponentStyles {
  root: { /* styles */ },
  child1: ['className', { /* styles */ }],
  child2: { /* styles */ }
  subComponentStyles: {
    subComponent: {
      root: { /* styles */ },
      child1: { /* styles */ },
    }
  }
}

// In render()
return <Component styles={styles} ... />;
```

##### Example

```tsx
import { getTheme } from '@fluentui/react';

const theme = getTheme();
const styles = {
  root: [
    {
      background: theme.palette.themePrimary,
      display: 'none',
      selectors: {
        ':hover': {
          background: theme.palette.themeSecondary,
        },
        '&.isExpanded': {
            display: 'block'
        },
        '&:hover .childElement': {
            color: 'white'
        }
      }
    }
  ]
};

// In render()
return <Component styles={styles} ... />;
```

#### Function-based styling

The styling applied to each area may depend on the state of the component as well as the contextual theme settings. So you should also be able to define styles as a function of these inputs:

```tsx
// Take in styling input, split out styles for each area.
const styles = (props: IComponentStyleProps): IComponentStyles => {
  return {
    root: { /* styles */ },
    child1: ['className', { /* styles */ }],
    child2: ['className', props.someBoolean && { /* styles */ }],
    subComponentStyles: {
      subComponent: (subProps:ISubComponentStyleProps) => {
        const { theme, disabled, hasBoolean } = props; // parent props are available in subComponents
        const { required, hasOtherBoolean } = subProps;
        return ({
          root: { /* styles */ },
          child1: { /* styles */ },
        });
      }
    }
  };
}

// In render()
return <Component styles={styles} ... />;
```

##### Example

```tsx
const styles = props => ({
  root: [
    {
      background: props.theme.palette.themePrimary,
      selectors: {
        ':hover': {
          background: props.theme.palette.themeSecondary,
        }
      }
    },
    props.isExpanded
      ? { display: 'block' }
      : { display: 'none' }
  ]
});

// In render()
return <Component styles={styles} ... />;
```

> For more information on styling with CSS-in-JS, visit our [Styling wiki article](https://github.com/microsoft/fluentui/wiki/Component-Styling)

### Fabric Core

Colors can be applied to text, backgrounds, or borders using the following class name conventions:

| Type                    | Fabric Core class                    |
| ----------------------- | ------------------------------------ |
| Foreground/text         | `ms-fontColor-themePrimary`          |
| Foreground/text (hover) | `ms-fontColor-themePrimary--hover`   |
| Background              | `ms-bgColor-themePrimary`            |
| Background (hover)      | `ms-bgColor-themePrimary--hover`     |
| Border                  | `ms-borderColor-themePrimary`        |
| Border (hover)          | `ms-borderColor-themePrimary--hover` |
