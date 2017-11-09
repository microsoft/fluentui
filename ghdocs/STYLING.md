# Component styling guide

When a consumer uses a component, providing style overrides for the component should not be a fragile guessing game. We should be able to easily tweak component styling and also create variants for subcomponents without a lot of complex effort that's bound to break later on.

A component consists of dom elements, or "areas". Each of the areas should be targetable for styling. The styling applied to each area may depend on the state of the component as well as the contextual theme settings. So, styling should be defined as a function of these inputs:

```tsx
// Take in styling input, spit out styles for each area.
function getStyles(props: IComponentStyleProps): IComponentStyles {
  return {
    root: { /* styles */ },
    child1: { /* styles */ },
    child2: { /* styles */ }
  };
}
```

With this in mind, let's make `getStyles` an optional prop to the component. Now style overrides can be applied in a functional way and even be conditionalized depending on the component state:

```tsx
const getStyles = props => ({
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

<MyComponent getStyles={ myStyleOverrides } />
```

Quite often, variants of a component which use the style must be created to abstract some customizations. A `styled` HOC is provided which can make creating variants simple:

```tsx
import { styled } from 'office-ui-fabric-react/lib/Styling';
import { getStyles } from './MyComponentVariant.styles';

const MyComponentVariant = styled(
  MyComponent,
  getStyles
  })
);
```

Within the component implementation, when we need to convert these styles into class names, we will use a helper called `classNameFunction` to create a memoized function which can translate the style objects into strings:

```tsx
const getClassNames = classNameFunction<ICompStyleProps, ICompStyles>();

class Comp extends React.Component {
  public render() {
    const { getStyles, theme } = this.props;
    const classNames = getClassNames(getStyles, { /* style props */ });

    return (
      <div className={ classNames.root }>...</div>
    );
  }
}
```

# Component anatomy

A component should consist of these files:

* `ComponentName.props.ts` - The interfaces for the component. We separate these out for documentation reasons.
* `ComponentName.base.tsx` - The unstyled component. This renders DOM structure and conrtains logic, MINUS styling opinions.
* `ComponentName.styles.ts` - Exports a `getStyles` function for the component which takes in `IComponentNameStyleProps` and returns `IComponentNameStyles`.

Once these are defined, you can export the component which ties it all together:

* `ComponentName.tsx` - Using the `styled` helper, exports a new component tying the base component to 1 or more style helpers.

Additionally, each component should have these:

* `ComponentName.checklist.ts` - A checklist status export which allows the documentation to render notes on what validation has been done on the component.
* `ComponentName.test.tsx` - Unit tests for the component.

The idea is that components, especially reusable atomic components, should by default be exported unstyled. This gives us the flexibility to create variants.

## ComponentName.props.ts changes

The props file should contain these 4 interfaces, in addition to any enums or consts externally required:

1. **IComponentName** - The public method accessible through `componentRef`. This should include the `focus` method, as well as getters for important values like `checked` in the case the component will be referenced and the value may be read manually. Example:

```tsx
export IComponentName {
  focus: () => void;
}
```

2. **IComponentNameProps** - The props for the component. This should include the `componentRef` prop for accessing the public interface, the `theme` prop (which will be injected by the `@customizable` decorator), as well as the `getStyles` function.

Example:

```tsx
export IComponentNameProps extends React.Props<ComponentNameBase> {

  componentRef?: (componentRef: IComponentName) => void;

  theme?: ITheme;

  getStyles?: IStyleFunction<IComponentNameStyleProps, IComponentNameStyles>;

}
```

3. **IComponentNameStyleProps** - The props needed to construct styles. This represents the simplified set of immutable things which control the class names. Note that things which were optional may be set to be required here, to simplify the style definitions:

```tsx
export interface IComponentNameStyleProps {
  theme: ITheme;
  disabled: boolean;
  checked: boolean;
}
```

4. **IComponentNameStyles** The styles which apply to each area of the component. Each area should be listed here required, as an `IStyle`, with `root` always representing the root element of the component:

```tsx
export interface IComponentNameStyles {
  root: IStyle;
  child1: IStyle;
  // etc.
}
```

In the style interface, always refer to the root element using the name `root`, for predictability in styling.

## ComponentName.base.tsx contents

1. The component shoud be named `{ComponentName}Base`.
2. It should be decorated with the `customizable` decorator using `{ComponentName}Base` as the target name.
3. It should use the `classNameFunction` helper to create a className generation function.

Example:

```tsx
import { IComponentNameProps } from ='./ComponentName.props';

const getClassNames = classNameFunction<IComponentNameStyleProps, IComponentNameStyles>();

export class ComponentName extends React.Component<...> {
  public render() {
    const { getStyles, theme } = this.props;
    const classNames = getClassNames(getStyles, { theme: theme! });

    return (
      <div className={ classNames.root }>Hello</div>;
    );
  }
}
```

### ComponentName.styles.ts

The styles file should export the `getStyles` function which takes in `IComponentNameStyleProps` and returns `IComponentNameStyles` (the default styling for the component.)

Note that the root element for styles should al

```tsx
export function getStyles(props: IComponentNameStyleProps): IComponentNameStyles {
  return {
    root: {},
    child: {},
    etc.
  };
}
```

### Component.tsx

Tying the component to the style is made easy using the `styled` HOC wrapper, whch as input takes the base component and an object of 1 or more style function props.

```tsx
import { styled } from 'office-ui-fabric-react/lb/Styling';
import { CompoenentNameBase } from './ComponentName.base';
import { getStyles } from './ComponentName.styles';

// Create a Breadcrumb variant which uses these default styles.
export const ComponentName = styled(
  ComponentNameBase,
  {
    getStyles
  }
);
```

#### Support for customized sub component styling

Note that the component may also intend to provide customized styling for nested components. For example, a `Breadcrumb` component may want to expose the `getStyles` function for nested `Crumb` components.

The extra getStyles function would be added to the outer compoent's props:

```
getCrumbStyles?: IStyleFunction<ICrumbStyleProps, ICrumbStyles>;
```

The base component would pipe the function into the child:

```tsx
let { getCrumbStyles } = this.props;

// ...and in the render function:

<Crumb getStyles={ getCrumbStyles }>
```

And finally, the composite component created by the `styles` wrapper would link default styling for the property:

```tsx
export const Breadcrumb = styled(
  BreadcrumbBase,
  {
    getStyles,
    getCrumbStyles
  }
)
```

### ComponentName.test.tsx

The test file should include:

1. A snapshot test locking the component DOM structure down for the important states.
2. Tests which simulate clicking on things, changing the state of the compoent, and validating things still work.

## Moving styles from scss to ts

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

### mixins and includes

Sass mixins are simply an informal way of using functions. Translating them into actual javascript, where you can reuse and import/export them, is really easy.

If you find some fabric-core mixins are missing, consider adding them to the `@uifabric/styling` package if they are highly reusable. However keep in mind that the PLT1 bundle size WILL be affected, so do this sparingly only for very common things.

## font-size-x variables

Use typesafe enums instead of the sass variables:

```ts
import { FontSizes } from 'office-ui-fabric-react/lib/Styling';

fontSize: FontSizes.small
```

### Focus rectangles

The `styling` package has a helper to provide consistent focus rectangles.


# Footnotes: Motivations for moving away from SCSS

SCSS a build time process of expanding a high level css-like language into raw css. Our pipeline to load the raw css goes through a javascript conversion process and gets loaded on the page via a javascript library called `load-themed-styles`. Effectively, we have a complex build process which takes rules, converts them into JavaScript, and loads them dynamically.

This process is complicated and adds a number of limitations.

## We can't register classes dynamically

Scenarios like "make this area of the screen use a different theme" become really complicated if build time is the only time for evaluations.

## Bundle size and css loading heft with scss

If a button has 20 different possible states, using scss you must load the css for all 20 of the states pre-emptively, so you end up loading way more rules than you will ever actually use. There is no "plt1 styles vs delay loaded styles". The best you can do is to partition your css to specific modules, and delay load the modules. But in this model, you will still preempt loading a lot of rules that aren't used.

Sass also encourages "mixins" as a way to have one definition of styles that can be used in multiple places. This completely fights against bundle size, since mixins simply stamp duplicates copies of the same rules whereever they're used, resulting in bloated (but highly compressable) style definitions. The compression helps but all of this could be avoided by using a different approach to defining our styling.

## Constant battle with specificity

Perhaps the most difficult thing to resolve is css specificity. Countless hacks have been implemented to "slightly tweak" styling of a thing in a particular context. If your rule is equally specific as an existing rule, you have a race condition; last one to register wins, resulting in hacks that only work sometimes. And even if your rule is more specific than an existing rule, there are no gates that can catch an existing rule being changed to be more specific later, resulting in breaking the workarounds.

We want a system which allows users to pass in their overrides, which can create new permutations of classes which are only 1 level of specificity deep, providing a consistent safe way to override the defaults.
