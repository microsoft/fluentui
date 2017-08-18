# [Office UI Fabric - merge-styles](http://dev.office.com/fabric)

The merge-styles library provides a number of utilities for loading styles through javascript. It is designed to make it simple to style components through javascript. It generates css rules, rather than using inline styling, to ensure we can use css features like pseudo selectors (:hover) and parent/child selectors (media queries).

The library was built for speed and size; the entire package is 2.7k gzipped.

The basic idea is to provide a method which can take in one or more style objects css styling javascript objects representing the styles for a given element, and return a single class name. If the same set of styling is passed in, the same name returns and nothing is re-registered.

This has a number of benefits over traditional build time staticly produced css:

* Only register classes that are needed, when they're needed, reducing the overall selector count.

* Dynamically create new class permutations based on contextual theming requirements. (Use a different theme inside of a DIV without downloading multiple copies of the css rule definitions.)

* Use JavaScript to define the class content (using utilities like color converters, or reusing constant numbers becomes possible.)

* Allow control libraries to merge customized styling in with their rules, avoiding complexities like css selector specificity.

* Simplify RTL processing; lefts become rights in RTL, in the actual rules. No complexity like `html[dir=rtl]` prefixes necessary, which alleviates unexpected specificity bugs.

* Reduce bundle size. Automatically handles vendor prefixing, unit providing, RTL flipping, and margin/padding expansion (e.g. margin will automatically expand out to margin TRBL, so that we avoid specificity problems when merging things together.)

* Reduce the build time overhead of running through CSS preprocessors.

* TypeScript type safety; spell "background" wrong and get build breaks.

The api surfaces consists of TypeScript interfaces and a few important methods:

`mergeStyles(..args[]` - Takes in one or more style objects, merges them in the right order, and produces a single css class name which can be injected into any component.

`mergeStyleSet` - Takes in one or more style set objects, each consisting of a set of areas, each which will produce a class name. Using this is analogous to calling mergeStyles for each property in the object, but ensures we maintain the set ordering when multiple style sets are merged.

`concatStyleSet` - In some cases you simply need to combine style sets, without actually generating class names (it is costs in performance to generate class names.) This tool returns a single set merging many together.

## Vocabulary

Let's clear up a few definitions before we start;

A *style object* represents the collection of css rules, except that the names are camelCased rather than kebab-cased. Example:

```tsx
let style = {
  backgroundColor: 'red',
  left: 42
};
```

Additionally, *style objects* can contain selectors under the `selectors` property:

```tsx
let style = {
  backgroundColor: 'red',
  selectors: {
    ':hover': {
      backgroundColor: 'blue';
    },
    '.parent &': { /* parent selector */ },
    '& .child': { /* child selector */ }
  }
};
```

A *style set* represents a map of area to style object. When building a component, you need to generate a class name for each element that requires styling. You would defint this in a *style set*.

```tsx
let styleSet = {
  root: { background: 'red' },
  button: { margin: 42 }
}
```

## Basic usage

When building a component, you will need a *style set* map of class names to inject into your elements' class attributes.

The recommended pattern is to provide the classnames in a separate function, typically in a separate file `ComponentName.classNames.ts`.

```tsx
import { IStyle, mergeStyleSets } from '@uifabric/merge-styles';

export interface IComponentClassNames {
  root: string;
  button: string;
  buttonIcon: string;
}

export const getClassNames = () => {
  return mergeStyleSets({
    root: {
        background: 'red'
      }
    ),

    button: {
      backgroundColor: 'green',
      selectors: {
        ':hover': {
          backgroundColor: 'blue'
        }
      }
    },

    buttonIcon: {
      margin: 10
    }
  });
};
```

The class map can then be used in a component:

```tsx
import { getClassNames } from './MyComponent.classNames';

export const MyComponent = () => {
  let { root, button, buttonIcon } = getClassNames();

  return (
    <div className={ root }>
      <button className={ button }>
        <i className={ buttonIcon } />
      </button>
    </div>
  );
};
```

## Managing conditionals and states

Style objects can be represented by a simple object, but also can be an array of the objects. The merge functions will handle arrays and merge things together in the given order. They will also ignore falsey values, allowing you to conditionalize the results.

In the following example, the root class generated will be different depending on the `isToggled` state:

```tsx
export const getClassNames = (
  isToggled: boolean
): IComponentClassNames => {

  return mergeStyleSet({
    root: [
      {
        background: 'red'
      },
      isToggled && {
        background: 'green'
      }
    ]
  })
};
```

## Optimizing for performance

Resolving the class names on every render can be an unwanted expense especially in hot spots where things are rendered frequently. To optimize, we recommend 2 guidelines:

1. For your `getClassNames` function, flatten all input parameters into simple immutable values. This helps the `memoizeFunction` utility to cache the results based on the input.

2. Use the `memoizeFunction` function from the `@uifabric/utilities` package to cache the results, given a unique combination of inputs. Example:

```tsx
import { memoizeFunction } from '@uifabric/utilities';

export const getClassNames = memoizeFunction((
  isToggled: boolean
) => {
  return mergeStyleSet({
    // ...
  });
});
```

## Registering fonts

Registering font faces example:

```tsx
import { fontFace } from '@uifabric/merge-styles';

fontFace({
  fontFamily: `"Segoe UI"`,
  src: `url("//cdn.com/fontface.woff2) format(woff2)`,
  fontWeight: "normal"
});
```

Note that in cases like `fontFamily` you may need to embed quotes in the string as shown above.

## Registering keyframes

Registering animation keyframes example:

```tsx
import { keyframes, mergeStyleSets } from '@uifabric/merge-styles';

let fadeIn = keyframes({
  "from": {
    opacity: 0
  },
  "to": {
    opacity: 1
  }
});

export const getClassNames = () => {
  return mergeStyleSets({
    root: {
      animationName: fadeIn
    }
  });
};
```

## Server-side rendering

You can import `renderStatic` method from the `/lib/server` entry to render content and extract the css rules that would have been registered, as a string.

Example:

```tsx
import { renderStatic } from '@uifabric/merge-styles/lib/server';

let { html, css } = renderStatic(() => {
  return ReactDOM.renderToString(...);
});
```

Caveats for server-side rendering (TODOs):

* Currently font face definitions and keyframes won't be included in the result.

* Using the `memoizeFunction` utility may short circuit calling merge-styles APIs to register styles, which may cause the helper here to skip returning css. This can be fixed, but it is currently a known limitation.

* Until all Fabric components use the merge-styles library, this will only return a subset of the styling. Also a known limitation and work in progress.

* The rehydration logic has not yet been implemented, so we may run into issues when you rehydrate.
