# RFC: Custom Styling

## Contributors

Geoff Cox
Mason Tejera - MADS use cases
Ben Howell - easier recomposition
Micah Godbolt - component CSS vars

## Summary

Fluent UI React v9 is built today to adopt the Fluent 2 design as its default style.

Partners migrating from v0/v8 to v9 have brought up that v9's custom styling does not
provide the same granularity of customization as previous versions.
Partners are concerned their customers won't be able to deviate from the Fluent 2 design.

Please see the appendix for partner use cases and scenarios.

This RFC considers different options for adding new custom styling mechanisms or improving existing ones.

## Current Theme and Style Customizations

There are several mechanisms for customizing the theme and style of components in v9.
Different mechanisms allow different scopes of customization: all components, components of a specific type, or
individual instances of a component.

### Don't

One of the goals of the Fluent 2 design is to create a consistent, accessible, and modern design across
Microsoft.
Customers and partners are discouraged from deviating from the Fluent 2 design.
Existing systems that have deeply customized styles or extended themes should consider not migrating customizations
forward as they adopt Fluent v9.
The Fluent 2 design includes design tokens for brand color ramps that allow products to distinguish themselves without
writing customization code.

### Custom Themes

FluentProvider has a theme prop to define the CSS variable values corresponding to the Fluent 2 design tokens.
A complete theme or a partial theme can be passed to FluentProvider.
FluentProvider can be used multiple times at different levels of the DOM hierarchy to customize a subset of component instances.

#### 👍

- Can customize multiple component instances at once
- Components remain consistently styled
- Themes are not fragile because the tokens are not component specific
- High performance of rendering and theme switching because of a limited number of CSS variables.

#### 👎

- Cannot change a specific component type because Fluent 2 design tokens are general purpose and used by multiple components.
- Expensive to change a single instance of a component

#### 🤔

- Difficult to discover which design tokens a component uses without reading the style hook code

### Extended Design Tokens

FluentProvider theme will also accept a theme with additional name/value pairs to define extended CSS variables.
Callers can use the themeToTokensObject method to get the set of tokens to be referenced when creating styles.

#### 👍

- Handles special cases where no Fluent 2 design token fits

#### 👎

- Themes using extended tokens are fragile and not portable across applications
- Adding too many CSS variables degrades performance (limit is around ~300 tokens total)
- themeToTokens prevents tree-shaking of tokens

### Component and Slot ClassName Prop

All v9 components have a `className` prop which applies custom styles.
Each slot also has a `className` props which applies custom styles to a part of a component.
Custom styles can be built with Griffel makeStyles() and mergeClasses() to

#### 👍

- Component instances can be custom styled

#### 👎

- Custom style selectors are tightly bound to the implementation of the component's CSS (e.g. pseudo-elements)
- CSS specificity can make overriding styles very difficult
- Custom styles cannot leverage props or state easily from outside the component hooks
- A wrapper is required to customize all instances of a component type without having to pass the className to every instance usage
- Griffel still emits the overridden classes.

#### 🤔

- Can be difficult to build and debug custom styles in the browser with Griffel's creation of atomic CSS classes

### Recomposition with Hooks

Components are built using v9's hooks composition architecture.

- Each _Component_.tsx calls use*Component* and use*Component*Styles hooks, then call the render*Component* method.
- The use*Component* hook maps props to state by setting default values, slot components, and component behavior.
- The use*Component*Styles hooks builds styles and the className on each slot.
- The render*Component* method renders the slot elements or components with their associated props.

Recomposing a component allows behavior, style, or layout to be fully customized.

#### 👍

- Component types can be custom styled
- Caller get complete control of customization with access to props and state.
- Unused styles can be tree-shaken
- Allows replacement of Griffel with a different styling system
- Easier to avoid tight binding to CSS implementation as entire chunks of CSS can be replaced.
- Uses the hooks composition model for its intended purpose, to handle special cases of customization
- Follows the recommended approach for partners with large products to create an abstraction layer that manages the Fluent dependency.

#### 👎

- Does not provide partners with an out-of-the-box solution
- Non-trivial effort to create a library with every component re-exported
- Increased maintenance cost keeping up with new and changed components

#### 🤔

- Style hooks are currently monolithic. We may need to create building block style hooks designed for re-use

## Option A: Expose an optional useCustomStyles hook from React.Context per component

Each component could check context for a useCustomStyle hook within the useComponentStyle hook.
If this hook was defined, it is called at the end of the method before returning state.

> These example use Component as a substitute for a component like Button or Avatar.

```tsx
const customStyles = useContextSelector(ComponentCustomStylesContext, context => context?.useCustomStyles);

//...component styling here

return customStyles ? customStyles(state) : state;
```

Each component defines own types for props and state, so would need to define its own context value types,
context, and context provider.

```tsx
export type ComponentCustomStylesContextValue = {
  useCustomStyles?: (state: ComponentState) => ComponentState;
};

export const ComponentCustomStylesContext: Context<ComponentCustomStylesContextValue> = createContext<ComponentCustomStylesContextValue>(
  {},
);

export const ComponentCustomStylesContextProvider = ComponentCustomStylesContext.Provider;
```

When a caller wanted to customize the component, they use the provider. Callers would be able to control custom
styling scope just like Fluent Provider. While they would need to use a provider per custom styled component,
these could be aggregated into a component that transcludes children.

```tsx
<App>
  <FluentProvider theme={webLightTheme}>
    <ComponentCustomStylesContextProvider value={{ useCustomStyles }}>
      {/* other component hierarchy */}
      <Component>Hello custom styles!</Component>
    </ComponentCustomStylesContextProvider>
  </FluentProvider>
</App>
```

### 👍

- Custom styling gets the same power as the default component useStyles hook.
- This builds on using slots as the addressable items for applying styles.
- The custom styles can be built using Griffel with build-time optimization.
- Can be applied at different scope like FluentProvider.
- Does not require composing or introduce a new component type that must be adopted in lieu of the default component.
- Fewer CSS specificity problems as styles can get overwritten.
- Provides the type-safety expected from Fluent UI React.
- Minimal code to add to each component. Could be put into the code generation template.
- Does not significantly effect rendering performance.
- Partners building components can follow the same practice to support custom styling in their libraries.

### 👎

- Custom styling all components requires adding and configuration lots of context providers.
- Requires writing new code for every component, adding a story, and documenting the feature.
- Context is harder to discover as it is outside the props contract.
- Callers doing custom styling may still take a dependency on the CSS internals of the component if they don't replace a
  style block completely.

### 🤔 Centralized and singular custom styling method

It would be nice to have a single method on context that could apply for all components. This proves difficult
with each component having its own props and state types.

Another approach would be to define single context value type in the react-shared-contexts package that had
a method for each component, but that causes a circular dependency problem for components.

There may some typescript trickery that would allow for a single context value type, but having each component define
the context type it will inspect for custom styling follows SOLID dependency inversion.

## Option B: Encourage recomposition | make recomposition easier

The hooks composition model was architected to separate concerns of component behavior, style, and rendering.
Rather than provide an additional mechanism for custom styling, this option would assist partners with leveraging
existing hooks to recompose components with a different styling mechanism.

Each component would be recomposed.

For example, imagine this Button.tsx is defined in a partner component library to export a custom styled button.
The component exported is named `Button` so that it can replace Fluent UI's `Button`.

The partner would define the useCustomButtonStyles hooks to style the component however they like.
This could include exposing a similar centralized custom styling mechanism as in Option A or applying styles
through a different mechanism than Griffel (such as SASS, emotion, or tailwind).

```tsx
import * as React from 'react';
import { renderButton_unstable, useButton_unstable } from '@fluentui/react-components';
import type { ButtonProps, ForwardRefComponent } from '@fluentui/react-components';
import { useCustomButtonStyles } from '../styling/button';

export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);
  useCustomButtonStyles(state);
  return renderButton_unstable(state);
}) as ForwardRefComponent<ButtonProps>;

Button.displayName = 'Button';
```

### 💡 Improvement - making recomposition easier with compose()

Recomposing every component could be made easier with a compose method that hid some of the details of the ForwardRef
and sequencing the hook.

```tsx
import * as React from 'react';
import { compose } from '@fluentui/react-components';
import type { ButtonProps } from '@fluentui/react-components';
import { useCustomButtonStyles } from '../styling/button';

// This is a rough idea of what a compose method might look like.
export const Button = compose<ButtonProps>('Button', useButton_unstable, useCustomButtonStyles, renderButton_unstable);
```

> Ben Howell is working on a proof-of-concept for this compose method.
> It is likely something worth doing regardless of the outcome of this RFC.
> The compose method could be called from our own components to reduce boilerplate code.

### 💡 Improvement - generating a recomposed package

We could create an nx generator that produces all the boilerplate component recomposition code.
This would allow partners to create an unstyled or custom library easily.
Partners could re-run the tool to keep up with new components shipping in react-components.

```
yarn create-recomposed-library my-components
```

### 👍

- doesn't add yet another way to customize styles to the architecture
- uses the hooks composition model for its intended purpose, to handle special cases of customization
- partners get complete control over customization (vs. limitations that may come from a style-only customizer)
- allows replacement of Griffel with a different styling system
- supports tree-shaking out the hooks that are not used
- follows out recommended dependency abstraction approach for partners with large and complex code bases to make future migration easier.

### 👎

- does not provide partners with an out-of-the-box solution
- non-trivial effort to create a library with every component re-exported
- maintenance cost keeping up with new and changed components
- our style hooks are currently monolithic. We may need to create building block style hooks designed for re-use
- no consistency between approaches partners might take in creating centralized custom styling solutions

## Option C: Component level CSS custom properties

### 💡 Improvement - Remove dependency on classNames and DOM order

### 💡 Improvement - Explicit APIs for modifying commonly modified styles

checkboxCheckedBackground = 'foo' vs ':enabled:not(:checked):not(:indeterminate)': { background: 'foo'}

### 💡 Improvement - Perf - complex selectors are much slower than local CSS variables

### 👍

### 👎

### 🤔

## Option D: component CSS var references with fallbacks to design token CSS vars

//TODO @Geoff | @Micah

## Option E: Component token constants referencing design token constants

Each component would define a hierarchy component-level token constants.
Component tokens would reference alias tokens.
The hierarchy would have levels for slot and state variations.
The component style hook would then use the component tokens rather than alias tokens.
The component's tokens could be substituted at build time for a mapping to other tokens (CSS var references)

```ts
// Button.tokens.ts (limited example)
export const buttonTokens = {
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
    hover: {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    }
    active: {
      backgroundColor: tokens.colorNeutralBackground1Pressed
    },
    outline: {
      backgroundColor: tokens.colorTransparentBackground,
      hover: {
        backgroundColor: tokens.colorTransparentBackgroundHover
      },
      active: {
        backgroundColor: tokens.colorTransparentBackgroundPressed
      }
    }
  },
  icon: {
    small: {
      spacing: tokens.spacingHorizontalXS
    },
    medium: {
      spacing: tokens.spacingHorizontalSNudge
    },
    large: {
      spacing: tokens.spacingHorizontalSNudge
    }
  }
}
```

### 👍

- Codifies the mapping of component part style to alias token.
- Build time substitution allows for continued build time style optimizations
- Runtime CSS vars are unchanged and works with existing themes
- Provides a similar experience to custom styles and theme component styles from v8, but mapped to slots.

### 👎

- Exports yet another set of constants for the bundle
- Adds some complexity to the style hooks

### 🤔

- Would the hierarchy of component tokens be a contract?

## Decision making

//TODO @Geoff

## Appendix: Partner scenarios

### MADS: Centro use case

from Mason Tejera

Our primary customer for applying component specific styles via the ThemeProvider has been Centro. The Core mission of Centro is to allow engineering team to build experiences (UX + Backend) one time and ship them to any hosting application(s). They are a horizontal engineering team that services Commercial and Consumer experiences. They surface many of their experiences across multiple apps & platforms and require them to look native to the end user. This sort of functionality saves Centro and their consumers a LOT of engineering time. A couple specific examples of how they use it:

Centro built an embedded admin feature that’s currently used in MetaOS app in Teams, Office, and soon Outlook. In their web instance, the paradigm is to show widget details in a panel. Teams reserves panels for more specific purposes (chats), so to get a native look, they apply a style to all their panels to appear as a modals. Doing this with the ThemeProvider styles in v8 took less than a week of dev time. There are 13 other components touched with this mechanism in the Teams Theme.

Centro supports a Feedback team that needs to feel native and branded in all Office apps on every platform, ie. Windows, macOS, iOS, Android & Teams. They currently have a dedicated Windows theme that touches the styles for 8 Fluent components. This team also ingests the above Teams theme, which saved 2 months of engineering cycles and lead time.

In total there are nearly 100 experiences that are reused across approximately 30 apps, each app has some overlap in experience but also some uniqueness beyond color. Easy and powerful theming has helped Centro convince consuming teams to opt into Fluent who otherwise would have turned to different technologies. It has made both Centro and Fluent more successful.

### MADS: Fluent extension use case

from Mason Tejera

This is also an extremely powerful tool for Fluent extension libraries. Both MADS & Security & Compliance use styles from the ThemeProvider to solve a diverse range of problems.

We use it to inject styling opinions within the context of a specific section of the application. Examples include changing background colors within panels, setting icon button colors to black within a nav bar.

We often use it to disagree with subtle styling opinions of specific components (ie, pivots being indented, buttons having borders, etc). Having the wrapper baked into fluent keeps our code consistent with other teams and reduces the surface area of what we need to support.

We sometimes use this to patch regressions in CSS caused at the Fluent level. It’s faster for us to fix in place rather than go through the process of getting it fixed directly in Fluent.

We regularly use this functionality to fix color contrast ratio bugs related to a11y, especially when the brand colors are changed. There are many instances where re-mapping color slots at a central location has hard to track ripple effects. The best way to fix the issue is often assigning a new semantic slot or palette color to a specific element in the component’s styles.
