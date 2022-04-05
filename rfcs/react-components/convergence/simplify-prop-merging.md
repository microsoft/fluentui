# RFC: Simplify prop merging with slots

---

@layershifter @ling1726 @bsunderhus

## Summary

This RFC proposes a set of changes in three major steps:

1. Fixing the use of slots in `mergeProps` and usage of the `as` prop, so that JSX elements in slots can be configured using shorthand `as` prop.
2. Stricter typing for shorthand slots that render native HTML tags with the goal of improving type safety internally and for consumers.
3. A logical conclusion of the two above steps which results in completely removing `mergeProps` in favour of object spreading over deep merge.

The later sections will go into the details of what each step will do and the potential benefits.

## Background

`mergeProps` is a layer over which quite a complicated deep merging functionality is built to handle object merges with React elements properties, this results in quite complicated typings. Recently, efforts have been made to make the usage safer from a typescript point of view thanks to concerned engineers who give up some of their project cycles.

This proposal aims to tackle the following problems more fundamentally in the design of shorthands and `mergeProps` itself:

- `as` prop is broken when passed to JSX elements through shorthand slots
- No type safety declaring HTML attributes with `as`
- Unsafe generic typings for shorthand, that require complex helper types above the internal implementation to make it work
- Deep merges are costly
- className merges are not done with `mergeClasses`, which handles scoped directional styles and dedupes atomic declarations
- Functions are not really merged but simply replaced similar to native object spreading

```tsx
const props = { button: { customHandleClick /* a custom handler */ } };
const state = mergeProps(
  { button: { handleClick /* a require handler by our component */ } },
  resolveShorthandProps(props),
);
// Results in => { button: { customHandleClick /* 💣 handlers are not merged */ } }
```

- When merging different types, simply replaces most recent usage. Although not a problem with slots because of `resolveShorthandProps`

## Problem statement

### Broken `as` prop

Let's say we have following contrived `state` and `render` function definitions for `Button` component:

```tsx
// `Button` state hook
export const useButton = () => {
  const state = mergeProps({
    // ...
    // Loader component used as shorthand slot
    loader: { as: Loader },
  });
};

// `Button` render function
export function renderButton(state) {
  const { slots, slotProps } = getSlots(state);
  return (
    <button>
      {/* ... */}
      {/* 👇 "slots.loader" will render Loader component */}
      <slots.loader {...slotProps.loader} />
    </button>
  );
}
```

Now lets use use loaders slot with `{as:'div'}` shorthand to render underlying `Loader` component via `div` tag

```tsx
// During usage, want to use `Loader` as `div`
<Button loader={{ as: 'div' }} />
```

This will produce following result:

```tsx
<Button>
  {/* 👇 this is just a plain div, Loader is not rendered 🚨 */}
  <div />
</Button>
```

Instead of Expected result:

```tsx
// Expected Result ✅
<Button>
  <Loader as="div" />
</Button>
```

In the above example `as` is intended to represent the `loader` prop, not to define the component to be rendered. This is a result of special handling of the `as` prop which will always be omitted from the slot props and used as the component to be rendered.

### Complex typings and unsafe internal implementation

[microsoft/fluentui#17508](https://github.com/microsoft/fluentui/pull/17508/files) includes type fixes for `mergeProps` which provides extra type safety to validate shorthand slots.

However, the result still leads to complicated component state types benefiting from the stricter typing through generics.

### Native attribute filtering needs to happen by default

For slots that render native elements, it's difficult to provide type safety in order to avoid unsafe DOM attribute spreads as shown in the below example:

```tsx
// ComponentState
const state = {
  buttonSlot: { as: 'button', type: 'submit' },
};

function App() {
  // 🚨 No TS Error
  return <Component buttonSlot={{ as: 'div' }} />;
}
```

```html
<!-- Thankfully {as:'div'} still works, but props must be filtered on every render -->
<div></div>
```

The above example still works thanks to the the native attribute filtering that is done as part of `getSlots`. However, these filters always need to be run when resolving shorthand slots. During each render, every prop of a component is iterated and re-filtered.

The current filtering also needs to iterate all the allowed props during a nested loop, although this could be optimized quite easily.

While the existence of these helpers is necessary (as explained in the below proposals), it seems unnecessary that it needs to happen on every render.

### Extending a component by adding/modifying slots

One common use case as seen in `Menu`, `Avatar` and `Badge` is to extend a base component by adding or modifying a slot. There are two ways where it is possible to do this currently:

```tsx
// Extend by modifying existing slots
// call resolveShorthandprops on defaultProps
const state = mergeProps(
  {
    as: 'span',
    label: { as: 'span' },
    getInitials: defaultGetInitials,
    ref,
  },
  defaultProps && resolveShorthandProps(defaultProps, avatarShorthandProps),
  resolveShorthandProps(props, avatarShorthandProps),
);
```

```tsx

const extendedComponentShorthandProps = [...avatarShorthandProps, 'extraSlot']

// Extend by adding a slot
// Mutate state in extended component and call mergeProps again
const baseState = useBaseComponent(props, ref);

// React elements cannot be extended and will break `resolveShorthandProps`
// set to undefined since it will be resolved again anyway
(baseState as unknown) as ExtendedComponentProps).slot = undefined;
const state = mergeProps(baseState, defaultProps, resolveShorthandProps(props, extendedComponentShorthandProps));
```

Both of the examples above are quite opinionated and require knowledge of the internals of `mergeProps` and `resolveShorthands` to understand without guidance.

Ideally, conformance tests would be required to validate `defaultProps` always goes through `resolveShorthandProps`.

In the case where a component is extended by adding slots, it's pretty hard to validate both in terms of functionality and type safety.

### Merging functions and primitive values

Functions or primitives used in `mergeProps` will simply replace the value in the order that they were defined. This is extremely similar to native object spreading but without a deep merge functionality.

Prop objects tend to be relatively flat, and in cases where objects/arrays are used that need to be deep merged on each render we should examine those cases and make exceptions.

## Detailed Design or Proposal

### Declare `as` and the rendered `component` separately

```tsx
const state = {
  fooSlot: { type: "submit" },
  barSlot: { as: "button" },
  components: {
    fooSlot: "button",
    barSlot: Loader, // JSX element
  },
};

// let's use our `Component`
<Component fooSlot={{ as: 'div' }} barSlot={{as: "div"}} />

// result
<Component>
  <div type="submit">button</div>
  <Loader as="div" />
</Component>
```

The `as` prop is now a prop of the component being rendered in the slot and no longer defines what is rendered in the slot.

### Retire mergeProps 🙊

Since internally even the Fluent team is mutating state, there is no clear reason why we should prevent consumers from doing so with `defaultProps`. In fact even if consumers do use `defaultProps` there is still nothing that **stops** them from mutating state. We show in the following example, two ways of doing the exact same thing. Both options are currently equally possible and valid.

```tsx
const state = mergeProps(
  {
    foo: {},
  },
  defaultProps,
  resolveShorthandProps(props, buttonShorthandProps),
);

// Option 1 - defaultProps
useComponentState(props, { foo: { bar: 'bar' } });

// Option 2 - mutate state
const state = useComponentState(props);
state.foo.bar = 'bar';
```

With this statement in mind, we can propose solution with `mergeProps`. Let's also simplify shorthand resolution to resolve shorthands for each slot separately. Let's also apply the previous solutions to see the final before/after.

#### Current usage of `mergeProps()`

```tsx
const state = mergeProps(
  {
    ref: resolvedRef,
    as: 'button',
    icon: { as: 'span' },
    content: { as: 'span', children: props.children },
    loader: { as: Loader, role: 'presentation' },
  },
  defaultProps,
  resolveShorthandProps(props, buttonShorthandProps),
);
```

#### Proposed usage

```tsx
const state: FooState = {
  as: "button",

  components: {
    icon: "span",
    content: "span",
    loader: Loader,
  },

  // user props
  ...props,

  ref: resolvedRef,
  content: resolveShorthand(
    props.content,
    { children: props.children } /* defaultProps for a slot */
  ),
  icon: resolveShorthand(props.icon),
  loader: resolveShorthand(
    props.loader,
    { role: "presentation" } /* defaultProps for a slot */
  ),
};

export interface FooProps extends ComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>;
  content?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>;
  Loader?: ShorthandProps<LoaderProps>;
};

export interface FooState extends FooProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>;
  content: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>;
  Loader: ObjectShorthandProps<LoaderProps>;
};
```

Typings there are 100% clear since they directly map to types 🎉

Now when either internally or externally we want to extend/add slots:

```ts
const state = useComponentState();
state.components.extraSlot = 'div';
state.extraSlot = resolveShorthand({
  /** Shorthand props */
});

state.components.icon = 'button';
state.icon = filterNativeButtonProps(state.icon);
```

This results in the use of standard object spread and explicit resolution of slots in state, rather than deep merging all user and default props.

Without `defaultProps` there is now only one way to extend component state - by mutating it.

Mutating state has **always** been possible, and can only be stopped if we decide to introduce true immutability.

##### Basic implementation of `resolveShorthand`

```tsx
function resolveShorthand<T extends Record<string, any>>(
  value: ShorthandProps<T>,
  defaultProps?: T,
): ObjectShorthandProps<T> {
  let resolvedShorthand: ObjectShorthandProps<T> = {} as T;

  if (typeof value === 'string' || typeof value === 'number' || React.isValidElement(value)) {
    resolvedShorthand = { children: value } as ObjectShorthandProps<T>;
  }

  if (typeof value === 'object') {
    resolvedShorthand = value as ObjectShorthandProps<T>;
  }

  return { ...(defaultProps as ObjectShorthandProps<T>), ...resolvedShorthand };
}
```

### Pros and Cons

#### Pros

- Simplification for most common cases without harming the possibility of more complex ones
- Better Typings

#### Cons

- Encourages mutation outside internal components
