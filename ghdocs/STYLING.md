# Component styling guide

# Notes on SCSS conversion

## Motivations

TODO

## Coversion guide

The conversion process goals will be:

1. Remove the styles imports from the tsx file.
2. Remove the css utility import and don't use it.
3. Delete the .scss file.
4. Replace with a .classNames file.
5. No visual regressions.
6. Expose the getClassNames function in props for customization.

It's recommended to first get the basic setup in place, and then to do the actual styling conversion, then delete the scss file.

### ComponentName.props.ts changes

The props file should contain:

1. An interface of class names
2. A type for the function which returns them
3. A prop to override the function

Eample:

```tsx
export interface IFooClassNames {
  root: string;
  child1: string;
  child2: string;
}

export type GetFooClassNames = (theme: ITheme, className: string, etc) => IFooClassNames;

export interface IFooProps {
  // Make the class names configurable.
  getClassNames?: GetFooClassNames;
}
```

### ComponentName.classNames.ts addition

Create a file named `{Component}.classNames.ts` which exports a getClassNames memoized function following the type exported in the props file. This function should take in `theme` and `className` as props, followed by any other states that affect the class names generated.

```tsx
import { mergeStyleSets, ITheme } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import { IFooClassNames } from './Foo.Props';

export type GetClassNames = (theme: ITheme) => IFooClassNames;

export const getClassNames = memoizeFunction((
  theme: ITheme,
  className: string,
  disabled: boolean
): IFooClassNames => {
  return mergeStyleSets({
    root: [
      'ms-Foo',
      className,
      {
        // TODO: root styles
      },

      disabled && {
        // TODO: disabled styles
      }
    ],

    crumb: {

    }

  });
});
```

### Import and use the classNames file in the component

First, the component should be customizable. This allows the theme to be injected into the component. To do so, import the `customizable` decorator from the Utilities top level import, and decorate the component:

```tsx
import {
  BaseComponent,
  customizable
} from '../../Utilities';

@customizable('Foo', ['theme'])
export class Foo extends BaseComponent<IFooProps, any> {
```

Next, make sure to import the `getClassNames` function under an alias to avoid collisions withe `getClassNames` prop:

```tsx
import { getClassNames as _getClassNames } from './Breadcrumb.classNames';
```

In the render function, destructure the function from props and get the classNames!

```tsx
  public render() {
    const {
      getClassNames = _getClassNames,
      className,
      theme
    } = this.props;

    const classNames = getClassNames(theme, className, etc);
```

Next, remove the style file and `css` utility imports! This should highlight all the things you need to address.

Go through each red item in VSCode, and add entries in the interface. Note any class names hardcoded in tsx; move them to the classNames definition within the `mergeStyleSets` call:

```tsx
    root: [
      'ms-Foo',
      className,
      {
        // TODO
      }
    ],

    list: [
      'ms-Foo-list',
      { /* todo */ }
    ],

    etc
```

Once you've defined all areas in the interface and have moved all global class names into the classNames definition, replace the css entries with className references.

Note that in many components the render functions are broken up into subfunctions. In this case, consider either breaking out parts into subcomponents, or create a private _classNames cached version which is initialized at the root render function.

### Moving styles from scss to ts

Basic conversion just means copying styles from scss into ts, making prop names camelCased instead of kebab-cased, and stringifying everything except for pixel values.

Styles in scss:
```css
.list {
  white-space: nowrap;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: stretch;
}
```

Converted to ts:
```ts
list: [
  'ms-Breadcrumb-list',
  {
    whiteSpace: 'nowrap',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'stretch'
  }
],
```

Some scss special cases:

### mixins

### includes

## font-size-x variables

Use typesafe enums instead of the sass variables:

```ts
import {  FontSizes } from '../../Styling';

fontSize: FontSizes.small
```

### Focus rectangles

