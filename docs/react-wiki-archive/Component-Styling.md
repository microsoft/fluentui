**WARNING: This page describes an older way of handling component styles in `@fluentui/react` 7/8 (and `office-ui-fabric-react` previously). As of late 2020, many existing components still use this approach, but new components should not.** Until updated guidance is finalized, please talk to the team (or file an issue) about what pattern to use if you'd like to add a new component.

Fluent UI React's recommended styling approach uses CSS-in-JS and revolves around the `styles` prop, which is provided by most Fluent UI React components and allows strongly-typed customizations to individual areas of a component. This article explains how to customize existing styled components, write your own styled components, and convert an existing component which uses SCSS into a styled component.

If you'd like to customize colors and more for the whole app in one place, take a look at the [Theming](Theming) article instead.

- [Using a styleable component](#using-a-styleable-component)
  - [`styles` prop](#-styles--prop)
  - [Styling best practices](#styling-best-practices)
- [Creating a styleable component](#creating-a-styleable-component)
  - [Component.types.ts](#componenttypests)
  - [Component.base.ts](#componentbasets)
  - [Component.ts](#componentts)
- [Moving styles from scss to ts](#moving-styles-from-scss-to-ts)
  - [ClassNames logic](#classnames-logic)
  - [mixins and includes](#mixins-and-includes)
- [Common roadblocks](#common-roadblocks)
  - [Applying a style set to a sub-component that already has a root style set](#applying-a-style-set-to-a-sub-component-that-already-has-a-root-style-set)
- [Footnotes](#footnotes)
  - [Motivations for moving away from SCSS](#motivations-for-moving-away-from-scss)

# Using a styleable component

Unlike a `style` prop that only applies styles to the root component, the `styles` prop (provided by most Fluent UI React components) allows you to control the styling of every part of a component: the root, the children, and even sub-components. You can use this for one-off component customizations, or you can create a brand new component with these custom styles. In fact, all of the variants in Fluent UI React are just components built by passing in different values for `styles`.

## `styles` prop

A component consists of DOM elements, or "areas." Each of the areas should be targetable for styling.

To find the available areas for a component, use intellisense or look at the `IComponentStyles` interface in the component's `Component.types.ts` file (substituting the actual component name for "Component').

### Object-based Styling

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

**Example**

```tsx
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
        ':hover .childElement': {
          color: 'white'
        }
      }
    }
  ]
};

// In render()
return <Component styles={styles} ... />;
```

### Function-based styling

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

**Example**

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

## Styling best practices

### Put selectors last

While the order of properties generally doesn't matter (alphabetical is a fair default if you have no other preference), the `selectors` property should come last. This improves readability by preventing a single property from 'hiding' below a large `selectors` property.

```js
{
  element: {
    color: 'blue',
    margin: 0,
    overflow: 'inherit',
    padding: 0,
    textOverflow: 'inherit',
    selectors: {
      ':hover': {
        color: 'red',
        margin: 10
      }
    }
  }
}
```

### Using Pseudo Elements

Due to the values passed into the styling objects needing to be strings, and the `content` property of a pseudo element needing to be a string, you will need to nest a string in a string

```js
{
  element: {
    selectors: {
      ':after': {
        display: 'block',
        content: "'Content'"
      }
    }
  }
}
```

### font-size-x variables

Use type-safe enums instead of the sass variables:

```ts
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

return {
  root: [
    'ms-ComponentName',
    {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.medium,
    },
  ],
};
```

Or, use the fonts from the `theme` so theme overrides work on fonts as well:

```ts
const { theme } = this.props;
const { palette, semanticColors, fonts } = theme;
const font = fonts.large;

return {
  root: [
    'ms-ComponentName',
    {
      fontFamily: font.fontFamily,
      fontSize: font.fontSize,
      fontWeight: font.fontWeight,
    },
  ],
};
```

### Focus rectangles

The `styling` package has a helper to provide consistent focus rectangles.

```ts
import { getFocusStyle } from '../../Styling';

return {
  root: [getFocusStyle(/* theme, inset, position, highContrastStyle */), {}],
};
```

# Creating a styleable component

## Component.types.ts

Our CSS-in-JS approach introduces two new types of interfaces to your types file, and adds a couple of props to IComponentProps:

- IComponentStyleProps: Props passed into your styling function are used to determine the returned styles such as theme, disabled, required, etc.
- IComponentStyles: An object defining the styles for the component, broken up into specific areas such as header and footer.
- `styles` prop is added to IComponentProps. It accepts either an object or function that returns an object of IComponentStyles. The props passed into the function are IComponentStyleProps.
- `theme` prop needs to be added to your interface so that it can be passed through as a style prop.

### IComponentProps

```ts
interface IComponentProps {
  styles?: IStyleFunctionOrObject<IComponentStyleProps, IComponentStyles>;
  theme?: ITheme;
}
```

### IComponentStyleProps

```ts
interface IComponentStyleProps {
  theme: ITheme; // note that this is required
  className?: string;
  hasCertainState: boolean;
  somePropThatDrivesDesign: IComponentVariants;
}
```

Props that are common with the IComponentProps interface can also be Picked from the interface

```
Pick<IComponentProps, 'className' | 'disabled' | 'required'>
```

### IComponentStyles

- All IComponentStyles are required, but when using `styles` prop you will be able to pass a partial

```ts
interface IComponentStyles {
  root: IStyle;
  text: IStyle;
  someContainer: IStyle;
  subComponentStyles: {
    // these any's will go away once we're able to start using TS2.9.2 features
    label: IStyleFunctionOrObject<any, any>;
    button: IStyleFunctionOrObject<any, any>;
  };
}
```

## Component.base.ts

Within the component implementation, when we need to convert these styles into class names, we will use a helper called `classNamesFunction` to create a function which can translate the style objects into strings:

```tsx
const getClassNames = classNamesFunction<IComponentStyleProps, IComponentStyles>();

class Comp extends React.Component {
  public render(): JSX.Element {
    const { styles, theme } = this.props;
    const classNames = getClassNames(styles, theme, {
      /* style props */
    });

    return <div className={classNames.root}>...</div>;
  }
}
```

## Component.ts

Our exported components are nothing more than base components with a default `styles` prop. Using the `styled` helper function we are able to export a fully styled component that will still be able to accept a new `styles` prop that will simply be mixed on top of the default one.

The `styled` function is a public export, as are our base components. This means that you can create completely custom styled components that will be functionally identical to those coming from Fabric.

```tsx
import { styled } from '@fluentui/react/lib/Utilities';
import { IMyComponentProps, IMyComponentStyleProps, IMyComponentStyles } from './MyComponent.types';
import { styles } from './MyComponentVariant.styles';

const MyComponentVariant = styled<IMyComponentProps, IMyComponentStyleProps, IMyComponentStyles>(MyComponent, styles);
```

# Moving styles from scss to ts

Basic conversion just means copying styles from scss into ts, making prop names camelCased instead of kebab-cased, and stringifying everything except for pixel values.

In addition, all static classnames embedded within the tsx file inside of the `css` helper function calls can now move into the styles file.

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
{
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
}
```

Some scss special cases:

## classNames logic

Any logic for determining a component or element's classNames should reside in the Component.styles.ts file. This may mean getting rid of a few utility/state classNames in favor of props to add styles in conditionally.

Example - This sass block has a few syntax specifics and a state className to change styles, and the component combined it with the className `ms-Check`. We need the component to only call one className `className={ classNames.root }`:

```scss
.root {
  line-height: 1;
  height: $checkBoxHeight;

  :before {
    content: '';
    background: $bodyBackgroundColor;
  }

  &.rootIsChecked:before {
    background: $ms-color-themePrimary;
    @include high-contrast {
      background: Window;
    }
  }
}
```

Here is what the resulting conversion should look like:

```js
{
  root: [
    'ms-Check', // Add in the className you want as a string

    { // Open your styles block
      lineHeight: '1',
      // checkBoxHeight comes from IComponentStyleProps but is set to a default value in the prop deconstructor.
      height: checkBoxHeight,

      selectors: {
        ':before': {
          content: '""',
          background: props.theme.semanticColors.bodyBackground,
        }
      }
    },

    checked && [ // checked comes from IComponentStyleProps as a boolean.
      'is-checked',
      {
        selectors: {
          ':before': {
            background: props.theme.palette.themePrimary,
            selectors: {
              [HighContrastSelector]: { // Styling library contains many useful replacements for old mixins.
                background: 'Window'
              }
            }
          }
        }
      },
    ],
    props.className
  ],
}
```

## mixins and includes

Sass mixins are simply an informal way of using functions. Translating them into actual javascript, where you can reuse and import/export them, is really easy.

If you find some fabric-core mixins are missing, consider adding them to the `@fluentui/style-utilities` (`@uifabric/styling`) if they are highly reusable. However keep in mind that the initial page load bundle size WILL be affected, so do this sparingly only for very common things.

# Common roadblocks

## Applying a style set to a sub-component that already has a root style set

When applying style sets in a component (e.g. Nav) to a sub-component (e.g. ActionButton) which already has a root style set you will run into an issue using a `$` selector on the item like:

```js
'$link:hover &': {
     color: blue
}
```

The conflict happens because it's root style set would normally be applied to a class like **root-###**, but being applied as `link` inside the Nav component applies that style set to **link-###** class name. Styles applied using this `$` selector syntax do not render out. This is an open bug [here](https://github.com/microsoft/fluentui/issues/4138).

Until then the only option is to use semantic classNames to target these elements.

```js
'.ms-Link:hover &': {
     color: blue
}
```

# Footnotes

## Motivations for moving away from SCSS

SCSS a build time process of expanding a high level css-like language into raw css. Our pipeline to load the raw css goes through a javascript conversion process and gets loaded on the page via a javascript library called `load-themed-styles`. Effectively, we have a complex build process which takes rules, converts them into JavaScript, and loads them dynamically.

This process is complicated and adds a number of limitations.

### We can't register classes dynamically

Scenarios like "make this area of the screen use a different theme" become really complicated if build time is the only time for evaluations.

### Bundle size and css loading heft with scss

If a button has 20 different possible states, using scss you must load the css for all 20 of the states preemptively, so you end up loading way more rules than you will ever actually use. There is no "plt1 styles vs delay loaded styles." The best you can do is to partition your css to specific modules, and delay load the modules. But in this model, you will still preempt loading a lot of rules that aren't used.

Sass also encourages "mixins" as a way to have one definition of styles that can be used in multiple places. This completely fights against bundle size, since mixins simply stamp duplicates copies of the same rules wherever they're used, resulting in bloated (but highly compressible) style definitions. The compression helps but all of this could be avoided by using a different approach to defining our styling.

### Constant battle with specificity

Perhaps the most difficult thing to resolve is css specificity. Countless hacks have been implemented to "slightly tweak" styling of a thing in a particular context. If your rule is equally specific as an existing rule, you have a race condition; last one to register wins, resulting in hacks that only work sometimes. And even if your rule is more specific than an existing rule, there are no gates that can catch an existing rule being changed to be more specific later, resulting in breaking the workarounds.

We want a system which allows users to pass in their overrides, which can create new permutations of classes which are only 1 level of specificity deep, providing a consistent safe way to override the defaults.
