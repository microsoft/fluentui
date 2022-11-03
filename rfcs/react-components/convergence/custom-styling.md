# RFC: Custom Styling

Geoff Cox
Ben Howell
Mason Tejera
Brandon Thomas

## Summary

Fluent UI React v9 is built today to enforce adopting the Fluent 2 design styles. Partners creating component
libraries don't know how provide their customers the ability to deviate from Fluent 2 design like they could
with v0, v7, or v8.

We need to define a custom styling mechanism or pattern for these partners.

## Background

Fluent UI React v9 strongly conforms to the Fluent 2 Design to provide consistency in component behavior, layout,
and style. Most partners are expected to adopt the Fluent 2 Design and remove custom styling that deviates from the
design direction for Microsoft.

Some of our partner teams are building component libraries on top of Fluent UI React.
They have customers who need to diverge from the Fluent 2 design for both the partners components and our components.
Our partners need a way for their customers to customize the specific style elements of components
(e.g. button border) without undue effort.

v9 provides several mechanisms to customize components:

- custom themes
- custom design tokens
- CSS classes & styles built with Griffel
- component part replacement using slots
- component recomposition using hooks

These mechanisms have several limitations:

- design tokens don't provide the same granularity of customization as v0, v7, or v8
- the number of CSS vars has an upper limit of ~300 before performance degrades
- CSS classes create tight binding to style selector implementation or encounter CSS specificity issues
- slot replacement and CSS classes require code modification at each call site
- recomposing every component currently requires significant effort

These limitations exist to either meet performance requirements, avoid bloating the API with kitchen-sink props,
are limitations from target browsers or web languages/frameworks, or avoid past mistakes in previous versions.

### Case: _Partner customer who needs centralized custom styling_

//TODO: Mason and/or Brandon to fill in from admin-controls
//TODO: Geoff to fill in power-platform customer

## Problem statement

We need to ensure partners and customers have a mechanism to allow:

- consumers of Fluent UI React to centrally customize styles of components
- partners building component libraries have a pattern to follow to allow style customization of their components
- avoid per call site code modification

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

### Open issue: Centralized and singular custom styling method

It would be nice to have a single method on context that could apply for all components. This proves difficult
with each component having its own props and state types.

Another approach would be to define single context value type in the react-shared-contexts package that had
a method for each component, but that causes a circular dependency problem for components.

There may some typescript trickery that would allow for a single context value type, but having each component define
the context type it will inspect for custom styling follows SOLID dependency inversion.

### Pros

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

### Cons

- Custom styling all components requires adding and configuration lots of context providers.
- Requires writing new code for every component, adding a story, and documenting the feature.
- Context is harder to discover as it is outside the props contract.
- Callers doing custom styling may still take a dependency on the CSS internals of the component if they don't replace a
  style block completely.

## Option B: Demonstrate recomposition for partners to define their own style customization systems

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

### Improvement - making recomposition easier with compose()

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

### Improvement - generating a recomposed package

We could create an nx generator that produces all the boilerplate component recomposition code.
This would allow partners to create an unstyled or custom library easily.
Partners could re-run the tool to keep up with new components shipping in react-components.

```
yarn create-recomposed-library my-components
```

### Open issues

### Pros

- doesn't add yet another way to customize styles to the architecture
- uses the hooks composition model for its intended purpose, to handle special cases of customization
- partners get complete control over customization (vs. limitations that may come from a style-only customizer)
- allows replacement of Griffel with a different styling system
- supports tree-shaking out the hooks that are not used
- follows out recommended dependency abstraction approach for partners with large and complex code bases to make future migration easier.

### Cons

- does not provide partners with an out-of-the-box solution
- non-trivial effort to create a library with every component re-exported
- maintenance cost keeping up with new and changed components
- our style hooks are currently monolithic. We may need to create building block style hooks designed for re-use
- no consistency between approaches partners might take in creating centralized custom styling solutions

## Decision making
