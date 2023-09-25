# `@fluentui/react-context-selector`

React `useContextSelector()` and `useContextSelectors()` hooks in userland.

## Introduction

[React Context](https://reactjs.org/docs/context.html) and [`useContext()`](https://reactjs.org/docs/hooks-reference.html#usecontext) is often used to avoid prop drilling,
however it's known that there's a performance issue. When a context value is changed, all components that are subscribed with `useContext()` will re-render.

[useContextSelector](https://github.com/reactjs/rfcs/pull/119) is recently proposed. While waiting for the process, this library provides the API in userland.

# Installation

**NPM**

```bash
npm install --save @fluentui/react-context-selector
```

**Yarn**

```bash
yarn add @fluentui/react-context-selector
```

## Usage

### Getting started

```tsx
import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';

interface CounterContextValue {
  count1: number;
  count2: number;
  incrementCount1: () => void;
  incrementCount2: () => void;
}

// 💡 The same syntax as native React context API
//    https://reactjs.org/docs/context.html#reactcreatecontext
const CounterContext = createContext<CounterContextValue>({});

const CounterProvider = CounterContext.Provider;

// not necessary but can be a good layer to mock for unit testing
const useCounterContext = <T>(selector: ContextSelector<CounterCountext, T>) =>
  useContextSelector(CounterContext, selector);

const Counter1 = () => {
  // 💡 Context updates will be propagated only when result of a selector function will change
  //    "Object.is()" is used for internal comparisons
  const count1 = useCounterContext(context => context.count1);
  const increment = useCounterContext(context => context.incrementCount1);

  return <button onClick={increment}>Counter 1: {count1}</button>;
};

const Counter2 = () => {
  const count1 = useCounterContext(context => context.count2);
  const increment = useCounterContext(context => context.incrementCount2);

  return <button onClick={increment}>Counter 1: {count1}</button>;
};

export default function App() {
  const [state, setState] = React.useState({ count1: 0, count2: 0 });

  const incrementCount1 = React.useCallback(() => setState(s => ({ ...s, count1: s.count1 + 1 })), [setState]);
  const incrementCount2 = React.useCallback(() => setState(s => ({ ...s, count2: s.count2 + 1 })), [setState]);

  return (
    <div className="App">
      <CounterProvider
        value={{
          count1: state.count1,
          count2: state.count2,
          incrementCount1,
          incrementCount2,
        }}
      >
        <Counter1 />
        <Counter2 />
      </CounterProvider>
    </div>
  );
}
```

### useHasParentContext

This helper hook will allow you to know if a component is wrapped by a context selector provider

```tsx
const Foo = () => {
  // An easy way to test if a context provider is wrapped around this component
  // since it's more complicated to compare with a default context value
  const isWrappedWithContext = useHasParentContext(CounterContext);

  if (isWrappedWithContext) {
    return <div>I am inside context selector provider</div>;
  } else {
    return <div>I can only use default context value</div>;
  }
};
```

## Technical memo

React context by nature triggers propagation of component re-rendering if a value is changed. To avoid this, this library uses undocumented feature of `calculateChangedBits`. It then uses a subscription model to force update when a component needs to re-render.

## Limitations

- In order to stop propagation, `children` of a context provider has to be either created outside of the provider or memoized with `React.memo`.
- `<Consumer />` components are not supported.
- The [stale props](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children) issue can't be solved in userland. (workaround with try-catch)

## Related projects

The implementation is heavily inspired by:

- [use-context-selector](https://github.com/dai-shi/use-context-selector)
- [react-tracked](https://github.com/dai-shi/react-tracked)
