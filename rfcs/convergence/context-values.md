# RFC: Handling React context values in components

---

@layershifter @bsunderhus

## Summary

This RFC affects converged components and proposes multiple options detailing how to handle memoized context values for React Contexts.

## Background

There are cases when we need to pass some `props` or parts of `state` to child components, for this purpose we are using [React Context](https://reactjs.org/docs/context.html). To avoid unnecessary updates during components rerenders we are using either [context selector approach](https://github.com/dai-shi/use-context-selector) or [memoizing context value](https://reactjs.org/docs/context.html#contextprovider).

```tsx
// 💡 an example of memoization approach

function Baz(props) {
  const { inline, size } = props;
  const value = React.useMemo(() => ({ inline, open }), [inline, open]);

  // consumers of "SampleContext" will be notified only when "value" changes
  return <SampleContext.Provider value={value} />;
}
```

Currently, a few components (at least `Accordion`, `AccordionHeader`, `AccordionItem`) are defining a value for React Context on its state to use it in `render*` functions:

```tsx
// ⚠ simplified example

function useBazState(props) {
  const { inline, size } = props;
  const [open, setOpen] = React.useState();

  const contextValue = React.useMemo(() => ({ inline, open }), [inline, open]);
  const state = {
    inline,
    size,
    open,
    // 👇 "contextValue" is a part of component's state
    contextValue,
  };

  return state;
}

function renderBaz(state) {
  // 👇 "value" is memoized, consumer components will not rerender without need
  return (
    <SampleContext.Provider value={state.contextValue}>
      <div />
    </SampleContext.Provider>
  );
}
```

## Problem statement

The problem comes from multiple places:

- (_design issue_) `contextValue` is not a part of `state`, it's useless from component's perspective
- (_usage issue_) in a case of composition state mutations are not intuitive

The last item is a really serious problem as customers should be aware about our implementation details 🕵️‍

```tsx
// 🛠 In this example I would like to override `size` based on a condition
function useSuperBazState(props) {
  const state = useBazState(props);

  // ❌ is broken because `state.contextValue.size` remains the same
  if (props.reallyBig) {
    state.size = 'xxl';
  }

  // ❌ is broken because `state.contextValue` is a stable object and will not trigger
  //     a rerender
  if (props.reallyBig) {
    state.size = 'xxl';
    state.contextValue.size = 'xxl';
  }

  // ✅ only this solution will work as expected
  state.size = 'xxl';
  state.contextValue = React.useMemo(
    () => ({
      ...contextValue,
      ...(props.reallyBig && { size: 'xxl' }),
    }),
    [state.contextValue, props.reallyBig],
  );
}
```

Ideally, we can simply remove `contextValue` from `state` and move it into `render*` function. And it's already done in few components:

```tsx
function renderBaz(state) {
  const { open, inline } = state;

  // 💥 this violates rules of hooks: hooks should be called inside components or other hooks
  const contextValue = React.useMemo(() => ({ inline, open }), [inline, open]);

  return (
    <SampleContext.Provider value={contextValue}>
      <div />
    </SampleContext.Provider>
  );
}
```

The problem is this approach violates [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) as we are calling `React.useMemo()` inside a function. Actually, it's the reason why `contextValue` is being declared in `use*State()` hooks.

It's clear that we would like to avoid having values for React Context in `state` objects and we don't want to violate Rules of Hooks 🤔

## Solution

### Option 3: Modify render functions to accept context value

Another option is to modify a signature of render functions to include context values as the second param and compute them inside component.

```diff
function FooComponent() {
  const state = useFooState()

+ const barContextValue = React.useMemo(/* ... */)
+ const bazContextValue = React.useMemo(/* ... */)

- return renderFoo(state)
+ return renderFoo(state, { bar: barContextValue, baz: bazContextValue })
}

// ---

-function renderFoo(state) {
-  return <SampleContext.Provider value={state.bazContextValue} />
+function renderFoo(state, contextValues) {
+  return <SampleContext.Provider value={contextValues.baz} />
}
```

To improve experience for customers and ourselves we can extract creation of values in a separate hook:

```tsx
function useFooContextValues() {
  const barContextValue = React.useMemo(/* ... */);
  const bazContextValue = React.useMemo(/* ... */);

  return { bar: bazContextValue, baz: bazContextValue };
}

function FooComponent() {
  const state = useFooState();
  const contextValues = useFooContextValues(state);

  return renderFoo(state, contextValues);
}

function renderFoo(state, contextValues) {
  return <SampleContext.Provider value={contextValues.baz} />;
}
```

- 👎 we should call additional hooks in a component itself

## Discarded solutions

### Option 1: Make `render` functions hooks

We can transform existing render functions to be React hooks:

```diff
-function renderBaz(state) {
+function useRenderBaz(state) {
  const { open, inline } = state;
  // ✅ now we can use hooks
  const contextValue = React.useMemo(() => ({ inline, open }), [inline, open]);

  // ...
}
```

It's one of the easiest options, but it could cause issues in future as it breaks separation of concerns. For example, other hooks can be also called now in `useRender`:

```tsx
function useRenderBaz(state) {
  const { open, inline } = state;

  // 💣 other hooks can be also declared there
  React.useEffect(() => {
    // ...
  }, [open]);
}
```

- 👎 breaks separation of concerns as allows to use other hooks in render functions

### Option 2: Use `useContextSelector()` everywhere

For `context-selector` memoization is not required as it will happen in consumers. In this case we don't need to transform `render` functions to React hooks.

```tsx
function renderBaz(state) {
  const { open, inline } = state;

  return (
    <SampleContext.Provider value={{ inline, open }}>
      <div />
    </SampleContext.Provider>
  );
}

// ---

function useBazItem() {
  // ✅ only if "open"/"inline" will change a rerender will be triggered
  const open = useContextSelector(SampleContext, value => value.open);
  const inline = useContextSelector(SampleContext, value => value.inline);
}
```

- 👍 Allows to keep existing API design

- 👎 Even if it's enough performant option, it will be anyway slower than `React.useContext()` as we are evaluating additional code during render cycles
- 👎 (_potentially_) This implementation is tested with React's Concurrent mode, but still could cause issues with React 18
- 👎 Sooner or later `useContextSelector` will be implemented in React's core ([facebook/react#20646](https://github.com/facebook/react/pull/20646)) and it could have different API than our implementation
