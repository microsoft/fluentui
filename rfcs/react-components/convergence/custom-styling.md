# RFC: Custom Styling

Geoff Cox

## Summary

Fluent UI React v9 is built today to enforce adopting the Fluent 2 design styles.
Partners creating component libraries cannot provide their customers the ability to deviate from Fluent 2 design
like they could with v0, v7, or v8.
We need to define a custom styling escape hatch and pattern for these partners.

## Background

Fluent UI React v9 strongly conforms to the Fluent 2 Design to provide consistency in component behavior, layout, and style. Most partners are expected to adopt the Fluent 2 Design and remove custom styling that deviates from the design direction for Office.

v9 provides several mechanisms to customize components:

- custom themes
- custom design tokens
- CSS classes & styles built with Griffel
- component part replacement using slots
- component recomposition using hooks

Some of our partner teams are building component libraries on top of Fluent UI React.
They have customers who need to diverge from the Fluent 2 design for both the partners components and our components.
Our partners need a mechanism where their customers could customize the specific style elements of components
(e.g. button border) without undue effort.

Our current customization mechanisms have several limitations:

- design tokens don't provide the granularity of customization needed
- the CSS vars for each design token have a ceiling of ~300 before performance degrades
- CSS classes create tight binding to style selector implementation or encounter CSS specificity issues.
- slot replacement and CSS classes require code modification at each call site
- recomposing every component requires signficant effort and creates a new component type that
  must be adopted at each call site.

These limitations are by design to either meet performance requirements, avoid bloating the API with kitchen-sink props,
are limitations from target browsers or web languages/frameworks, or avoid past mistakes in previous versions.

### Case: _Partner customer who needs centralized custom styling_

//TODO: Mason and/or Brandon to fill in from admin-controls
//TODO: Geoff to fill in power-platform custom

## Problem statement

We need to define a mechanism to allow:

- consumers of Fluent UI React to centrally customize styles of components
- partners building component libraries could follow to allow style customization of their components
- avoid per call site code modification
- avoid requiring partners or consumers to wrap/recompose every component

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
- Callers doing custom styling may still take a dependency on the CSS internals of the component if the don't replace a
  style block completely.

## Option B: Reduce the cost of hook composition

//TODO: Ben to fill in here

### Open issues

### Pros

### Cons

## Decision making
