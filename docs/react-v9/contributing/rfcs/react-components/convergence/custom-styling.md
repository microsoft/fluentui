# RFC: Custom Styling

## Contributors

- Geoff Cox
- Mason Tejera - MADS use cases
- Ben Howell - easier recomposition
- Micah Godbolt - component CSS vars
- Miroslav Statsny, Oleksandr Fediashov, Lingfan Gao - provider/context optimizations

## Summary

Fluent UI React v9 is built today to adopt the Fluent 2 design as its default style. We strongly recommend that
Microsoft applications leverage the default style and limit customization to a brand-based theme.

Currently, v9 has mechanisms to support several customization scenarios:

- Custom themes => Customize style values for all components
- `classname` prop => Customize the style of one instance of a component
- Extended design tokens => Support theme for a custom component or custom class/style
- Hooks recomposition => Create a new component customizing the behavior, style, or rendering of an existing component.

See the appendix for more detailed analysis of the capabilities and limitations of each of these mechansisms.

## Problem

Partners migrating from v0/v8 to v9 have brought up that v9's custom styling does not provide the same granularity of
customization as previous versions. See the appendix for detailed partner use cases and scenarios.

Partners producing component libraries or component design surfaces are the most concerned about the lack of
customization. They would like to customize the style of a single type of component without changing the style of
other components.

Example: Change the border radius and border width of all Button components without changing those styles for
Input components.

## Solution

We chose to define a set of custom style hooks available on React context.

A `CustomStyleHook` takes state and updates the className to customize styles.
The type of the state is `unknown` to avoid circular dependencies between shared context and component packages,
and to force casting to a known component state type.

```ts
type CustomStyleHook = (state: unknown) => void;
```

The `CustomStyleHooksContext` provides the set of hooks for all the components exported from react-components.

```tsx
export type CustomStyleHooksContextValue = Partial<{
  useAccordionHeaderStyles_unstable: CustomStyleHook;
  //...
};

export const CustomStyleHooksContext = React.createContext<CustomStyleHooksContextValue | undefined>(undefined);
```

Initially every hook had to be defined and the default was a large object of no-op methods.
This bloated bundle size, so the context value was set to be partial, the default is undefined, and
an accessor hook was defined to get a single custom style hook. If the hook is not defined, a no-op function is returned.

The custom style hooks are set using `FluentProvider`. When providers are nested, a shallow merge is done on the
hooks object allowing for inheritance and overrides.

```ts
export type FluentProviderProps = Omit<ComponentProps<FluentProviderSlots>, 'dir'> & {
  //...
  customStyleHooks_unstable?: FluentProviderCustomStyleHooks;
  //...
};
```

Components call the useCustomStyleHooks_unstable to access a custom style hook and then call it after the default styling hook.
The default and custom style hooks are always called to avoid conditional hook calls.

```tsx
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  //...

  useButtonStyles_unstable(state);
  useCustomStyleHook_unstable('useButtonStyles_unstable')(state);

  //...
});
```

## Options Considered

### Option A: React.Context useCustomStyles hooks

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

export const ComponentCustomStylesContext: Context<ComponentCustomStylesContextValue> =
  createContext<ComponentCustomStylesContextValue>({});

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

#### 👍

- Custom styling gets the same power as the default component useStyles hook.
- This builds on using slots as the addressable items for applying styles.
- The custom styles can be built using Griffel with build-time optimization.
- Can be applied at different scope like FluentProvider.
- Does not require composing or introducing a new component type that must be adopted in lieu of the default component.
- Fewer CSS specificity problems as styles can get overwritten.
- Provides the type-safety expected from Fluent UI React.
- Minimal code to add to each component. Could be put into the code generation template.
- Does not significantly affect rendering performance.
- Partners building components can follow the same practice to support custom styling in their libraries.

#### 👎

- Custom styling all components requires adding and configuring lots of context providers.
- Requires writing new code for every component, adding a story, and documenting the feature.
- Context is harder to discover as it is outside the props contract.
- Callers doing custom styling may still take a dependency on the CSS internals of the component if they don't replace a
  style block completely.

#### 🤔 Centralized and singular custom styling method

It would be nice to have a single method on context that could apply for all components. This proves difficult
with each component having its own props and state types.

Another approach would be to define single context value type in the react-shared-contexts package that had
a method for each component, but that causes a circular dependency problem for components.

There may some typescript trickery that would allow for a single context value type, but having each component define
the context type it will inspect for custom styling follows SOLID dependency inversion.

### Option A2: Add global custom styling hook

A global object would be defined having custom styling hooks for each known component.
To avoid circular references and preventing tree-shaking, each hook takes state as `unknown`.

```tsx
export type FluentStyleCustomizer = {
  useCustomButtonStyles_unstable: (state: unknown) => void;
};
```

The global will have no-op methods defined so components can call unconditionally.

```
export const fuiCustomizer: FuiCustomizer = {
  useCustomButtonStyles_unstable: () => {},
  //...
};
```

Components would call the custom styling hook immediately after their own styling hook.

```tsx
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);

  useButtonStyles_unstable(state);

  fuiCustomizer.useButtonCustomStyles_unstable(state);

  return renderButton_unstable(state);
}) as ForwardRefComponent<ButtonProps>;
```

Callers can customize styles by replacing the default hook for a component.

Callers are encouraged to use Griffel to define styles. They can use makeStyles and mergeClasses to default, override, or replace. The classes applied by the component style hook.

A good implementation will switch to typesafe methods.

```ts
export const useFancyButtonStyles = (state: unknown) => {
  const styles = useStyles();

  const buttonState = state as ButtonState;

  buttonState.root.className = mergeClasses(
    buttonState.root.className,
    styles.root,
    buttonState.size === 'small' && styles.small,
    buttonState.size === 'medium' && styles.medium,
    buttonState.size === 'large' && styles.large,
  );
};
```

When the application is created, the customizer hooks can be set.

```tsx
const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

fuiCustomizer.useButtonCustomStyles = useFancyButtonStyles;

root.render(<App />);
```

#### 👍

- Custom styling gets the same power as the default component useStyles hook.
- This builds on using slots as the addressable items for applying styles.
- The custom styles can be built using Griffel with build-time optimization.
- Single, centralized point of customization.
- Only one new type introduced (FluentStyleCustomizer)
- One line of code to add to each component.
- Does not significantly affect rendering performance.
- Partners building components can follow the same practice to support custom styling in their libraries.
- Hooks are not conditionally called and should not lead to unstable hook react errors.
- Can restyle without having to recompile component libraries.
- Globally traverses multiple render roots.

#### 👎

- Custom style hook state is not typesafe. With the component-specific hooks, there is less chance for error.
- Very powerful. Only modifying classes is an implicit agreement but state modification is possible.
- Callers doing custom styling may still take a dependency on the CSS internals of the component.

### Option A3: Add custom styling hooks at FluentProvider

A blend of using React.Context from A1 and having a tree-shakable hooks object from A2.

This defines the same hooks object from A2. I've renamed it to ComponentStyleHooks as it has the same feel as the ComponentStyles in v8 that were attached to v8's Theme.

```tsx
export type ComponentStyleHooks = {
  useCustomButtonStyles_unstable: (state: unknown) => void;
};
```

As in A2, a default is defined with noop implementation.

```tsx
export const defaultComponentStyleHooks: ComponentStyleHooks = {
  useCustomButtonStyles_unstable: () => {},
};
```

A context and provider similar to other react-shared-context objects would be defined.
An additional `componentStyles` param would be added to FluentProvider.
💡 We can optionally only allow componentStyles to be set at the top-most FluentProvider if we want to avoid confusion with the behavior of nested componentStyles.
💡 We could also put the componentStyles on the theme object.

```tsx
export type ComponentStylesContextValue = ComponentStyleHooks;

const ComponentStylesContext = React.createContext<ComponentStylesContextValue | undefined>(
  undefined,
) as React.Context<ComponentStylesContextValue>;

export const Provider = ComponentStylesContext.Provider;

export function useComponentStyles(): ComponentStylesContextValue {
  return React.useContext(ComponentStylesContext) ?? defaultComponentStyleHooks;
}
```

Like in option A1, components use the context to call the hooks.
Because of the default, the call does not have to be conditional.

```tsx
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);

  useButtonStyles_unstable(state);

  const componentStyles = useComponentStyles();
  componentStyles.useCustomButtonStyles_unstable(state);

  return renderButton_unstable(state);
}) as ForwardRefComponent<ButtonProps>;
```

Like option A2, callers can define their custom style hooks object, but rather than replacing a global object,
they pass it to FluentProvider.

```ts
export const useFancyButtonStyles = (state: unknown) => {
  const styles = useStyles();

  const buttonState = state as ButtonState;

  buttonState.root.className = mergeClasses(
    buttonState.root.className,
    styles.root,
    buttonState.size === 'small' && styles.small,
    buttonState.size === 'medium' && styles.medium,
    buttonState.size === 'large' && styles.large,
  );
};
```

```tsx
const customStyles : ComponentStyleHooks = {
  useCustomButtonStyles_unstable = useFancyButtonStyles;
}

<App>
  <FluentProvider theme={webLightTheme} componentStyles={customStyles}>
      <Component>Hello custom styles!</Component>
  </FluentProvider>
</App>
```

#### 👍

- Same benefits of leveraging Griffle and slots. Additionally, this solution leverages FluentProvider.
- Same benefit of a tree-shakable set of hooks from A2.
- Same benefit of minimal code and type introduction from A2.

#### 👎

- Same state:unknown type-safety issue from A2.

### Option B: Encourage recomposition | make recomposition easier

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

#### 💡 Improvement - making recomposition easier with compose()

Recomposing every component could be made easier with a compose method that hides some of the details of the ForwardRef
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

#### 💡 Improvement - generating a recomposed package

We could create an nx generator that produces all the boilerplate component recomposition code.
This would allow partners to create an unstyled or custom library easily.
Partners could re-run the tool to keep up with new components shipping in react-components.

```
yarn create-recomposed-library my-components
```

#### 👍

- doesn't add yet another way to customize styles to the architecture
- uses the hooks composition model for its intended purpose, to handle special cases of customization
- partners get complete control over customization (vs. limitations that may come from a style-only customizer)
- allows replacement of Griffel with a different styling system
- supports tree-shaking out the hooks that are not used
- follows out recommended dependency abstraction approach for partners with large and complex code bases to make future migration easier.

#### 👎

- does not provide partners with an out-of-the-box solution
- non-trivial effort to create a library with every component re-exported
- maintenance cost keeping up with new and changed components
- our style hooks are currently monolithic. We may need to create building block style hooks designed for re-use
- does not affect (reusable) components which are implemented outside the application's source.
- no consistency between approaches partners might take in creating centralized custom styling solutions

### Option C: Component level CSS custom properties

#### 💡 Improvement - Remove dependency on classNames and DOM order

```tsx
// Button with component tokens and global fallbacks
const ButtonTokens = {
  background: '--fui-button-background',
  color: '--fui-button-color',
  border: '--fui-button-complex-selector',
};
const useButtonStyles = makeResetStyles({
  backgroundColor: `var(${ButtonTokens.background}, ${tokens.colorBrandBackground})`,
  color: `var(${ButtonTokens.color}, ${tokens.colorNeutralForegroundOnBrand})`,
  border: '4px solid',
  ':enabled:not(:checked):not(:indeterminate)': {
    borderColor: `var(${ButtonTokens.border}, orange)`,
  },
});

const Button = props => {
  const styles = useButtonStyles();
  return (
    <button {...props} className={mergeClasses(styles, props.className)}>
      {props.children}
    </button>
  );
};
```

```tsx
// Customizing button via className
const useCustomButtonStyle = makeResetStyles({
  [ButtonTokens.background]: 'red',
  [ButtonTokens.color]: 'white',
  [ButtonTokens.border]: 'green',
  ':hover': {
    [ButtonTokens.background]: 'green',
    [ButtonTokens.color]: 'pink',
    [ButtonTokens.border]: 'blue',
  },
  ':active': {
    [ButtonTokens.background]: 'orange',
    [ButtonTokens.color]: 'black',
    [ButtonTokens.border]: 'purple',
  },
});

export const CustomButton = props => {
  const rootStyle = useCustomButtonStyle();
  return <Button className={rootStyle}>Hello</Button>;
};
```

```tsx
// making changes in composition
const useCustomButtonStyle = makeResetStyles({
  [ButtonTokens.background]: 'red',
  [ButtonTokens.color]: 'white',
  [ButtonTokens.border]: 'green',
  ':hover': {
    [ButtonTokens.background]: 'green',
    [ButtonTokens.color]: 'pink',
    [ButtonTokens.border]: 'blue',
  },
  ':active': {
    [ButtonTokens.background]: 'orange',
    [ButtonTokens.color]: 'black',
    [ButtonTokens.border]: 'purple',
  },
});

export const CustomButton: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);
  const rootStyle = useCustomButtonStyle();
  state.root.className = rootStyle;
  useButtonStyles_unstable(state);

  return renderButton_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ButtonProps>;
```

#### 💡 Improvement - Explicit APIs for modifying commonly modified styles

checkboxCheckedBackground = 'foo' vs ':enabled:not(:checked):not(:indeterminate)': { background: 'foo'}

#### 💡 Improvement - Perf - complex selectors are much slower than local CSS variables

Single className adding multiple css variables is much more performant than complex selectors targeting individual parts of the control

```
.foo {
  --a: green;
  --b: yellow;
}

vs

.foo:enabled:not(:checked):not(:indeterminate)' > svg
```

Composition approach would be difficult to adjust at runtime because css vars are already set on the root, and new styles would either need to replace the old one, be more specific, or not use makeResetStyles so user could override individual css vars

#### 👍

- Provides increased control of individual aspects of components similar to v8.
- Extends theming without introducing unused CSS vars.
- A less fragile API that the raw CSS customization through className.

#### 👎

- May break Griffel optimization as each var() with default would be a unique style.
- Adopters providing customization of all components would likely introduce a vast number component vars that that could hurt performance.
- Introduces complexity at every token usage for the component author and for debugging style issues.
- Does not provide full control over the CSS, adopters still limited to a specific set of tokens.

## Decision

Option A: Discarded - too much additional code, circular reference problems, unwieldy for consumers.
Option A2: Discarded - global function is no-go
Option A3: **Chosen** - minmimal introduction of new types, support tree-shaking, provides full styling escape-hatch to consumers.
Option B: Deferred/Parallel - recomposition is the recommended approach for many scenarios and we should continue making it easier. It is not the centralized escape-hatch solution.
Option C: Deferred - component-level tokens will require longer term investigation and solution brainstorming, including CSS parts. They would make the existing Fluent 2 tokens more customizable, but would still have built-in limitations that prevent them from being a complete escape-hatch.

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

## Appendix: Current mechanisms analysis

There are several mechanisms for customizing the theme and style of components in v9.
Different mechanisms allow different scopes of customization: all components, components of a specific type, or
individual instances of a component.

### Custom Themes

`FluentProvider` has a `theme` prop to define the CSS variable values corresponding to the Fluent 2 design tokens.
A complete theme or a partial theme can be passed to `FluentProvider`.
`FluentProvider` can be used multiple times at different levels of the DOM hierarchy to customize a subset of component instances.

#### Capabilities

- Can customize multiple component instances at once
- Components remain consistently styled
- Themes are not fragile because the tokens are not component specific
- High performance of rendering and theme switching because of a limited number of CSS variables.

#### Limitations

- Cannot change a specific component type because Fluent 2 design tokens are general purpose and used by multiple components.
- Expensive to change a single instance of a component
- Difficult to discover which design tokens a component uses without reading the style hook code

### Extended Design Tokens

`FluentProvider` will also accept a theme with additional name/value pairs to define extended CSS variables.
Callers can use the `themeToTokensObject` method to get the set of tokens to be referenced when creating styles.

#### Capabilities

- Handles special cases where no appropriate Fluent 2 design token exists

#### Limitations

- Themes using extended tokens are fragile and not portable across applications
- Adding too many CSS variables degrades performance (limit is around ~300 tokens total)
- `themeToTokens` prevents tree-shaking of tokens

### `classname` Prop

All v9 components have a `className` prop which applies custom styles.
Each slot also has a `className` props which applies custom styles to a part of a component.
Custom styles can be built with Griffel `makeStyles()` and `mergeClasses()`.

#### Capabilities

- Component instances can be custom styled

#### Limitations

- Custom style selectors are tightly bound to the implementation of the component's CSS (e.g. pseudo-elements)
- CSS specificity can make overriding styles very difficult
- Custom styles cannot leverage props or state easily from outside the component hooks
- A wrapper is required to customize all instances of a component type without having to pass the className to every instance usage
- Griffel still emits the overridden classes.
- Can be difficult to debug custom styles in the browser with Griffel's creation of atomic CSS classes

### Recomposition with Hooks

Components are built using v9's hooks composition architecture.

- Each _Component_.tsx calls use*Component* and use*Component*Styles hooks, then call the render*Component* method.
- The use*Component* hook maps props to state by setting default values, slot components, and component behavior.
- The use*Component*Styles hooks builds styles and the className on each slot.
- The render*Component* method renders the slot elements or components with their associated props.

Recomposing a component allows behavior, style, or layout to be fully customized.

#### Capabilities

- Component types can be custom styled
- Caller get complete control of customization with access to props and state.
- Unused styles can be tree-shaken
- Allows replacement of Griffel with a different styling system
- Easier to avoid tight binding to CSS implementation as entire chunks of CSS can be replaced.
- Uses the hooks composition model for its intended purpose, to handle special cases of customization
- Follows the recommended approach for partners with large products to create an abstraction layer that manages the Fluent dependency.

#### Limitations

- Does not provide partners with an out-of-the-box solution
- Non-trivial effort to create a library with every component re-exported
- Increased maintenance cost keeping up with new and changed components
- Style hooks are currently monolithic. We may need to create building block style hooks designed for re-use
