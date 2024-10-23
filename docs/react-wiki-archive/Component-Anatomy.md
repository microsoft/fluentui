**WARNING: This page describes an older way of structuring components in `@fluentui/react` 7/8 (and `office-ui-fabric-react` previously). As of late 2020, many existing components still use this structure, but new components should not.** Until updated guidance is finalized, please talk to the team (or file an issue) about what pattern to use if you'd like to add a new component.

A component should consist of these files:

- [`ComponentName.types.ts`](#componentnametypests) - The interfaces for the component. We separate these out for documentation reasons.
- [`ComponentName.base.tsx`](#componentnamebasetsx) - The unstyled component base. This renders DOM structure and contains logic, MINUS styling opinions.
- [`ComponentName.styles.ts`](#componentnamestylests) - Exports a `styles` object of type `IComponentNameStyles` or function which takes in `IComponentNameStyleProps` and returns `IComponentNameStyles`.

Once these are defined, you can export the component which ties it all together:

- [`ComponentName.tsx`](#componentnametsx) - Using the `styled` helper, exports a new component tying the base component to 1 or more style helpers.

Additionally, each component should have these:

- `ComponentName.test.tsx` - Unit tests for the component.

## ComponentName.types.ts

The types file should contain these 4 interfaces, in addition to any type definitions, enums or consts externally required:

1. **IComponentName** - The public method accessible through `componentRef`. This should include the `focus` method, as well as getters for important values like `checked` in the case the component will be referenced and the value may be read manually. Example:

```tsx
export IComponentName {
  focus: () => void;
}
```

2. **IComponentNameProps** - The props for the component. This should include the `componentRef` prop for accessing the public interface, the `theme` prop (which will be injected by the `styled()` function), as well as the rendered `styles` function.

Example:

```tsx
export IComponentNameProps extends React.Props<ComponentNameBase> {

  componentRef?: (componentRef: IComponentName) => void;

  theme?: ITheme;

  styles?: IStyleFunctionOrObject<IComponentNameStyleProps, IComponentNameStyles>;

}
```

3. **IComponentNameStyleProps** - The props needed to construct styles. This represents the simplified set of immutable things which control the class names. Note that things which were optional may be set to be required here, to simplify the style definitions:

```tsx
export interface IComponentNameStyleProps {
  theme: ITheme;
  className?: string;
  disabled: boolean;
  checked: boolean;
}
```

4. **IComponentNameStyles** The styles which apply to each area of the component. Each area should required with an interface of `IStyle`, with `root` always representing the root element of the component:

```tsx
export interface IComponentNameStyles {
  root: IStyle;
  child1: IStyle;
  child2: IStyle;
  // etc.
}
```

In the style interface, always refer to the root element using the name `root`, for predictability in styling.

## ComponentName.base.tsx

1. The component should be named `{ComponentName}Base`.
1. It should use the `classNameFunction` helper to create a className generation function.
1. It should use the `getClassNames` function to create classNames for each element with the need for a className.

Example:

```tsx
import {
  classNamesFunction
} from '../../Utilities';
import { IComponentNameProps } from './ComponentName.props';

const getClassNames = classNameFunction<IComponentNameStyleProps, IComponentNameStyles>();

/**
 * ComponentName with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/microsoft/fluentui/wiki/Styling)
 */
export class ComponentName extends React.Component<...> {
  public render() {
    const {
      className,
      styles,
      theme,
    } = this.props;
    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      // Other props from IComponentNameStyleProps
    });

    return (
      <div className={ classNames.root }>Hello</div>;
    );
  }
}
```

The idea is that components, especially reusable atomic components, should by default be exported unstyled. This gives us the flexibility to create variants.

### ComponentName.styles.ts

The styles file should export the `styles` function which takes in `IComponentNameStyleProps` and returns `IComponentNameStyles` (the default styling for the component.)

Note that the root element for styles should always be called "root" for consistency (unless it's meant to be a sub-component), and have className appended from props so consumers can add their own classes to components.

```tsx
export const styles = (props: IComponentNameStyleProps): IComponentNameStyles => {
  const {
    theme,
    className,
    // etc
  } = this.props;

  return {
    root: ['ms-ComponentName', {}, className],
    child1: [],
    child2: [],
    // etc
  };
};
```

### ComponentName.tsx

Tying the component to the style is made easy using the `styled` HOC wrapper, whch as input takes the base component and an object of 1 or more style function props.

```tsx
import { styled } from '../../Utilities';
import { IComponentNameProps, IComponentNameStyleProps, IComponentNameStyles } from './ComponentName.types';
import { ComponentNameBase } from './ComponentName.base';
import { styles } from './ComponentName.styles';

/**
 * ComponentName description. Could be a variant of any other component's base.
 */
export const ComponentName = styled<IComponentNameProps, IComponentNameStyleProps, IComponentNameStyles>(
  ComponentNameBase,
  styles,
);
```
