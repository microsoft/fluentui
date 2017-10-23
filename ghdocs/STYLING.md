# Component styling guide

Each component is expected to register their stylings in a Component.classNames.ts file, using JavaScript.

## Motivations for moving away from SCSS

SCSS a build time process of expanding a high level css-like language into raw css. Our pipeline to load the raw css goes through a javascript conversion process and gets loaded on the page via a javascript library called `load-themed-styles`. Effectively, we have a complex build process which takes rules, converts them into JavaScript, and loads them dynamically.

This process is complicated and adds a number of limitations.

### We can't register classes dynamically

Scenarios like "make this area of the screen use a different theme" become really complicated if build time is the only time for evaluations.

### Creating permutations adds bundle size and bloats rules registered

If a button has 20 different possible states, using scss you must load the css for all 20 of the states pre-emptively, so you end up loading way more rules than you will ever actually use. There is no "plt1 styles vs delay loaded styles". The best you can do is to partition your css to specific modules, and delay load the modules. But in this model, you will still preempt loading a lot of rules that aren't used.

Sass also encourages "mixins" as a way to have one definition of styles that can be used in multiple places. This completely fights against bundle size, since mixins simply stamp duplicates copies of the same rules whereever they're used, resulting in bloated (but highly compressable) style definitions. The compression helps but all of this could be avoided by using a different approach to defining our styling.

### Constant battle with specificity

Perhaps the most difficult thing to resolve is css specificity. Countless hacks have been implemented to "slightly tweak" styling of a thing in a particular context. If your rule is equally specific as an existing rule, you have a race condition; last one to register wins, resulting in hacks that only work sometimes. And even if your rule is more specific than an existing rule, there are no gates that can catch an existing rule being changed to be more specific later, resulting in breaking the workarounds.

We want a system which allows users to pass in their overrides, which can create new permutations of classes which are only 1 level of specificity deep, providing a consistent safe way to override the defaults.

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

