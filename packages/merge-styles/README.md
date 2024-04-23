# @fluentui/merge-styles

The `merge-styles` library provides utilities for loading styles through javascript. It is designed to make it simple to style components through javascript. It generates css classes, rather than using inline styling, to ensure we can use css features like pseudo selectors (:hover) and parent/child selectors (media queries).

The library was built for speed and size; the entire package is 2.62k gzipped. It has no dependencies other than `tslib`.

Simple usage:

```ts
import { mergeStyles, mergeStyleSets } from '@fluentui/merge-styles';

// Produces 'css-0' class name which can be used anywhere
mergeStyles({ background: 'red' });

// Produces a class map for a bunch of rules all at once
mergeStyleSets({
  root: { background: 'red' },
  child: { background: 'green' },
});

// Returns { root: 'root-0', child: 'child-1' }
```

Both utilities behave similar to a deep Object.assign; you can collapse many objects down into one class name or class map.

The basic idea is to provide tools which can take in one or more css styling objects representing the styles for a given element, and return a single class name. If the same set of styling is passed in, the same name returns and nothing is re-registered.

## Motivation

Defining rules at runtime has a number of benefits over traditional build time staticly produced css:

- Only register classes that are needed, when they're needed, reducing the overall selector count and improving TTG.

- Dynamically create new class permutations based on contextual theming requirements. (Use a different theme inside of a DIV without downloading multiple copies of the css rule definitions.)

- Use JavaScript to define the class content (using utilities like color converters, or reusing constant numbers becomes possible.)

- Allow control libraries to merge customized styling in with their rules, avoiding complexities like css selector specificity.

- Simplify RTL processing; lefts become rights in RTL, in the actual rules. No complexity like `html[dir=rtl]` prefixes necessary, which alleviates unexpected specificity bugs. (You can use `/* noflip */` comments to avoid flipping if needed.)

- Reduce bundle size. Automatically handles vendor prefixing, unit providing, RTL flipping, and margin/padding expansion (e.g. margin will automatically expand out to margin TRBL, so that we avoid specificity problems when merging things together.)

- Reduce the build time overhead of running through CSS preprocessors.

- TypeScript type safety; spell "background" wrong and get build breaks.

## What tradeoffs are there? Are there downsides to using JavaScript to process styling?

In static solutions, there is very little runtime evaluation required; everything is injected as-is. Things like auto prefixing and language specific processing like sass mixins are all evaluated at build time.

In runtime styling, much of this is evaluated in the browser, so you are paying a cost in doing this. However, with performance optimizations like memoization, you can minimize this quite a bit, and you gain all of the robustness enumerated above.

# API

The api surfaces consists of 3 methods and a handful of interfaces:

`mergeStyles(..args[]: IStyle[]): string` - Takes in one or more style objects, merges them in the right order, and produces a single css class name which can be injected into any component.

`mergeStyleSets(...args[]: IStyleSet[]): { [key: string]: string }` - Takes in one or more style set objects, each consisting of a set of areas, each which will produce a class name. Using this is analogous to calling mergeStyles for each property in the object, but ensures we maintain the set ordering when multiple style sets are merged.

`concatStyleSets(...args[]: IStyleSet[]): IStyleSet` - In some cases you simply need to combine style sets, without actually generating class names (it is costs in performance to generate class names.) This tool returns a single set merging many together.

`concatStyleSetsWithProps(props: {}, ...args[]: IStyleSet[]): IStyleSet` - Similar to `concatStyleSet` except that style sets which contain functional evaluation of styles are evaluated prior to concatenating.

Example:

```tsx
const result = concatStyleSetsWithProps<IFooProps, IFooStyles>(
  { foo: 'bar' },
  (props: IFooProps) => ({ root: { background: props.foo } }),
  (props: IFooProps) => ({ root: { color: props.foo } }),
);
```

## Vocabulary

A **style object** represents the collection of css rules, except that the names are camelCased rather than kebab-cased. Example:

```tsx
let style = {
  backgroundColor: 'red',
  left: 42,
};
```

Additionally, **style objects** can contain selectors:

```tsx
let style = {
  backgroundColor: 'red',
  ':hover': {
    backgroundColor: 'blue';
  },
  '.parent &': { /* parent selector */ },
  '& .child': { /* child selector */ }
};
```

A **style set** represents a map of area to style object. When building a component, you need to generate a class name for each element that requires styling. You would define this in a **style set**.

```tsx
let styleSet = {
  root: { background: 'red' },
  button: { margin: 42 },
};
```

## Basic usage

When building a component, you will need a **style set** map of class names to inject into your elements' class attributes.

The recommended pattern is to provide the classnames in a separate function, typically in a separate file `ComponentName.classNames.ts`.

```tsx
import { IStyle, mergeStyleSets } from '@fluentui/merge-styles';

export interface IComponentClassNames {
  root: string;
  button: string;
  buttonIcon: string;
}

export const getClassNames = (): IComponentClassNames => {
  return mergeStyleSets({
    root: {
      background: 'red',
    },

    button: {
      backgroundColor: 'green',
    },

    buttonIcon: {
      margin: 10,
    },
  });
};
```

The class map can then be used in a component:

```tsx
import { getClassNames } from './MyComponent.classNames';

export const MyComponent = () => {
  let { root, button, buttonIcon } = getClassNames();

  return (
    <div className={root}>
      <button className={button}>
        <i className={buttonIcon} />
      </button>
    </div>
  );
};
```

## Selectors

### Basic pseudo-selectors (:hover, :active, etc)

Custom selectors can be defined within `IStyle` definitions:

```tsx
{
  background: 'red',
  ':hover': {
    background: 'green'
  }
}
```

By default, the rule will be appended to the current selector scope. That is, in the above scenario, there will be 2 rules inserted when using `mergeStyles`:

```css
.css-0 {
  background: red;
}
.css-0:hover {
  background: green;
}
```

### Parent/child selectors

In some cases, you may need to use parent or child selectors. To do so, you can define a selector from scratch and use the `&` character to represent the generated class name. When using the `&`, the current scope is ignored. Example:

```tsx
{
  // selector relative to parent
  '.ms-Fabric--isFocusVisible &': {
    background: 'red'
  }

  // selector for child
  '& .child' {
    background: 'green'
  }
}
```

This would register the rules:

```css
.ms-Fabric--isFocusVisible .css-0 {
  background: red;
}
.css-0 .child {
  background: green;
}
```

### Global selectors

While we suggest avoiding global selectors, there are some cases which make sense to register things globally. Keep in mind that global selectors can't be guaranteed unique and may suffer from specificity problems and versioning issues in the case that two different versions of your library get rendered on the page.

To register a selector globally, wrap it in a `:global()` wrapper:

```tsx
{
  ':global(button)': {
    overflow: 'visible'
  }
}
```

### Media and feature queries

Media queries can be applied via selectors. For example, this style will produce a class which has a red background when above 600px, and green when at or below 600px:

```tsx
mergeStyles({
  background: 'red',
  '@media(max-width: 600px)': {
    background: 'green',
  },
  '@supports(display: grid)': {
    display: 'grid',
  },
});
```

Produces:

```css
.css-0 {
  background: red;
}

@media (max-width: 600px) {
  .css-0 {
    background: green;
  }
}

@supports (display: grid) {
  .css-0 {
    display: grid;
  }
}
```

### Referencing child elements within the mergeStyleSets scope

One important concept about `mergeStyleSets` is that it produces a map of class names for the given elements:

```tsx
mergeStyleSets({
  root: { background: 'red' }
  thumb: { background: 'green' }
});
```

Produces:

```css
.root-0 {
  background: red;
}
.thumb-1 {
  background: green;
}
```

In some cases, you may need to alter a child area by interacting with the parent. For example, when the parent is hovered, change the child background. We recommend using global, non-changing static classnames
to target the parent elements:

```tsx
const classNames = {
  root: 'Foo-root',
  child: 'Foo-child',
};

mergeStyleSets({
  root: [classNames.root, { background: 'lightgreen' }],

  child: [
    classNames.child,
    {
      [`.${classNames.root}:hover &`]: {
        background: 'green',
      },
    },
  ],
});
```

The important part here is that the selector does not have any mutable information. In the example above,
if `classNames.root` were dynamic, it would require the rule to be re-registered when it mutates, which
would be a performance hit.

## Custom class names

By default when using `mergeStyles`, class names that are generated will use the prefix `css-` followed by a number, creating unique rules where needed. For example, the first class name produced will be 'css-0'.

When using `mergeStyleSets`, class names automatically use the area name as the prefix.

Merging rules like:

```ts
mergeStyleSets({ a: { ... }, b: { ... } })
```

Will produce the class name map:

```ts
{ a: 'a-0', b: 'b-1' }
```

If you'd like to override the default prefix in either case, you can pass in a `displayName` to resolve this:

```tsx
{
  displayName: 'MyComponent',
  background: 'red'
}
```

This generates:

```css
.MyComponent-0 {
  background: red;
}
```

## Managing conditionals and states

Style objects can be represented by a simple object, but also can be an array of the objects. The merge functions will handle arrays and merge things together in the given order. They will also ignore falsey values, allowing you to conditionalize the results.

In the following example, the root class generated will be different depending on the `isToggled` state:

```tsx
export const getClassNames = (isToggled: boolean): IComponentClassNames => {
  return mergeStyleSets({
    root: [
      {
        background: 'red',
      },
      isToggled && {
        background: 'green',
      },
    ],
  });
};
```

## RTL support

By default, nearly all of the major rtl-sensitive CSS properties will be auto flipped when the dir="rtl" flag is present on the `HTML` tag of the page.

There are some rare scenarios (linear-gradients, etc) which are not flipped, for the sake of keeping the bundle size to a minimum. If there are missing edge cases, please submit a PR to address.

In rare condition where you want to avoid auto flipping, you can annotate the rule with the `@noflip` directive:

```tsx
mergeStyles({
  left: '42px @noflip',
});
```

## Optimizing for performance

Resolving the class names on every render can be an unwanted expense especially in hot spots where things are rendered frequently. To optimize, we recommend 2 guidelines:

1. For your `getClassNames` function, flatten all input parameters into simple immutable values. This helps the `memoizeFunction` utility to cache the results based on the input.

2. Use the `memoizeFunction` function from the `@fluentui/utilities` package to cache the results, given a unique combination of inputs. Example:

```tsx
import { memoizeFunction } from '@fluentui/utilities';

export const getClassNames = memoizeFunction((isToggled: boolean) => {
  return mergeStyleSets({
    // ...
  });
});
```

## Registering fonts

Registering font faces example:

```tsx
import { fontFace } from '@fluentui/merge-styles';

fontFace({
  fontFamily: `"Segoe UI"`,
  src: `url("//cdn.com/fontface.woff2) format(woff2)`,
  fontWeight: 'normal',
});
```

Note that in cases like `fontFamily` you may need to embed quotes in the string as shown above.

## Registering keyframes

Registering animation keyframes example:

```tsx
import { keyframes, mergeStyleSets } from '@fluentui/merge-styles';

let fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const getClassNames = () => {
  return mergeStyleSets({
    root: {
      animationName: fadeIn,
    },
  });
};
```

## Controlling where styles are injected

By default `merge-styles` will initially inject a `style` element into the document head as the first node and then append and new `style` elements as next sibling to the previous one added.

In some cases you may want to control where styles are injected to ensure some stylesheets are more specific than others. To do this, you can add a placeholder `style` element in the head with `data-merge-styles` attribute:

```html
<head>
  <style data-merge-styles></style>
</head>
```

Merge styles will ensure that any generated styles are added after the placeholder.

## Server-side rendering

You can import `renderStatic` method from the `/lib/server` entry to render content and extract the css rules that would have been registered, as a string.

Example:

```tsx
import { renderStatic } from '@fluentui/merge-styles/lib/server';

let { html, css } = renderStatic(() => {
  return ReactDOM.renderToString(...);
});
```

Caveats for server-side rendering:

- Rules registered in the file scope of code won't be re-evaluated and therefore won't be included in the result. Try to avoid using classes which are not evaluated at runtime.

For example:

```tsx
const rootClass = mergeStyles({ background: 'red' });
const App = () => <div className={rootClass} />;

// App will render, but "rootClass" is a string which won't get re-evaluated in this call.
renderStatic(() => ReactDOM.renderToString(<App/>);
```

- Using `memoizeFunction` around rule calculation can help with excessive rule recalc performance overhead.

- Rehydration on the client may result in mismatched rules. You can apply a namespace on the server side to ensure there aren't name collisions.

## Working with content security policy (CSP)

Some content security policies prevent style injection without a nonce. To set the nonce used by `merge-styles`:

```ts
Stylesheet.getInstance().setConfig({
  cspSettings: { nonce: 'your nonce here' },
});
```

If you're working inside a Fluent UI React app ([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)), this setting can also be applied using the global `window.FabricConfig.mergeStyles.cspSettings`. Note that this must be set before any Fluent UI React code is loaded, or it may not be applied properly.

```ts
window.FabricConfig = {
  mergeStyles: {
    cspSettings: { nonce: 'your nonce here' },
  },
};
```

## Shadow DOM

`merge-styles` has support for [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM). This feature is opt-in and incrementally adoptable. To enable the feature you need to include two [React Providers](https://react.dev/reference/react/createContext#provider):

1. `MergeStylesRootProvider`: acts as the "global" context for your application. You should have one of these per page.
2. `MergeStylesShadowRootProvider`: a context for each shadow root in your application. You should have one of these per shadow root.

`merge-styles` does not provide an option for creating shadow roots in React as how you get a shadow root doesn't matter, just that you have a reference to one. [`react-shadow`](https://www.npmjs.com/package/react-shadow) is one library that can create shadow roots in React and will be used in examples.

### Shadow DOM example

```tsx
import { PrimaryButton } from '@fluentui/react';
import { MergeStylesRootProvider, MergeStylesShadowRootProvider } from '@fluentui/utilities';
import root from 'react-shadow';

const ShadowRoot = ({ children }) => {
  // This is a ref but we're using state to manage it so we can force
  // a re-render.
  const [shadowRootEl, setShadowRootEl] = React.useState<HTMLElement | null>(null);

  return (
    <MergeStylesRootProvider>
      <root.div className="shadow-root" delegatesFocus ref={setShadowRootEl}>
        <MergeStylesShadowRootProvider shadowRoot={shadowRootEl?.shadowRoot}>{children}</MergeStylesShadowRootProvider>
      </root.div>
    </MergeStylesRootProvider>
  );
};

<ShadowRoot>
  <PrimaryButton>I'm in the shadow DOM!</PrimaryButton>
</ShadowRoot>
<PrimaryButton>I'm in the light DOM!</PrimaryButton>
```

### Scoping styles for more efficient CSS

You do not _need_ to update your `merge-styles` styles to support shadow DOM but you can make styles more efficient with some updates.

Shadow DOM support is achieved in `merge-styles` by using [constructable stylesheets](https://web.dev/articles/constructable-stylesheets) and is scoped by "stylesheet keys". `merge-styles` creates one stylesheet per key and in Fluent this means each component has its own stylesheet. Each `MergeStylesShadowRootProvider` will only adopt styles for components it contains plus the global sheet (we cannot be certain whether we need this sheet or not so we always adopt it). This means a `MergeStylesShadowRootProvider` that contains a button will only adopt button styles (plus the global styles) but not checkbox styles, making styling within the shadow root more efficient.

If you use `customizable` or `styled` the existing "scope" value provided to these functions is used a unique key. If no key is provided `merge-styles` falls back to a "global" key. This global key is a catch-all and allows us to support code that was written before shadow DOM support was added or code that is called outside of React context.

All `@fluentui/react` styles are scoped via `customizable` and `styled` (and some updates to specific component styles where needed). If your components use these functions and you set the "scope" property your components will automatically be scoped.
If you're using `mergeStyles()` (and other `merge-styles` APIs) directly, your styles will be placed in the global scope and still be available in shadow roots, just not as optimally as possible.

#### Style scoping example

```tsx
import { useMergeStylesHooks } from '@fluentui/react';
import { mergeStyles } from '@fluentui/merge-styles';
import type { ShadowConfig } from '@fluentui/merge-styles';

// This must be globally unique for the application
const MY_COMPONENT_STYLESHEET_KEY: string = 'my-unique-key';

const MyComponent = props => {
  const { useWindow, useShadowConfig, useAdoptedStylesheet } = useMergeStylesHooks();

  // Make sure multi-window scenarios work (e.g., pop outs)
  const win: Window = useWindow();
  const shadowConfig: ShadowConfig = useShadowConfig(MY_COMPONENT_STYLESHEET_KEY, win);

  const styles = React.useMemo(() => {
    // shadowConfig must be the first parameter when it is used
    return mergeStyles(shadowConfig, myStyles);
  }, [shadowConfig, myStyles]);

  useAdoptedStylesheet(MY_COMPONENT_STYLESHEET_KEY);
};
```
