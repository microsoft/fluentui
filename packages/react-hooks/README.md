# @uifabric/react-hooks

**UI Fabric React hooks**

Helpful hooks not provided by React itself.

- [useConst](#useconst) - Initialize and return a value that's always constant
- [useConstCallback](#useconstcallback) - Like `useConst` but for functions
- [useId](#useid) - Get a globally unique ID

## useConst

`function useConst<T>(initialValue: T | (() => T)): T`

Hook to initialize and return a constant value. Unlike `React.useMemo`, this will **always** return the same value (and if the initializer is a function, only call it once). This is similar to setting a private member in a class constructor.

Its one parameter is the initial value, or a function to get the initial value. Similar to `useState`, only the first value/function passed in is respected.

If the value should ever change based on dependencies, use `React.useMemo` instead.

If the value itself is a function, consider using [`useConstCallback`](#useconstcallback) instead.

### Example

```jsx
import { useConst } from '@uifabric/react-hooks';

const MyComponent = () => {
  const value = useConst(() => {
    /* some computation that must only run once or has side effects */
  });
  const valueThatMustNeverChange = useConst(/*...*/);
  ...
};
```

### Why not just `useMemo`?

According to the [React docs](https://reactjs.org/docs/hooks-reference.html#usememo):

> **You may rely on `useMemo` as a performance optimization, not as a semantic guarantee.** In the future, React may choose to “forget” some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without `useMemo` — and then add it to optimize performance.

In cases where the value **must** never change, the recommended workaround is to store it with `useRef`, but refs are more awkward to initialize and don't enforce or even communicate that the value should be immutable. An alternative workaround is `const [value] = useState(initializer)`, but this is semantically wrong and more costly under the hood.

## useConstCallback

`function useConstCallback<T extends (...args: any[]) => any>(callback: T): T`

Hook to ensure a callback function always has the same identity. Unlike `React.useCallback`, this is guaranteed to always return the same value.

Its one parameter is the callback. Similar to `useState`, only the first value/function passed in is respected.

If the callback should ever change based on dependencies, use `React.useCallback` instead.

`useConstCallback(fn)` has the same behavior as `useConst(() => fn)`.

## useId

`function useId(prefix?: string): string`

Hook to generate a unique ID (with optional `prefix`) in the global scope. This will return the same ID on every render.

Useful for cases in which a component may be rendered multiple times on the same page and needs to use an ID for internal purposes, such as associating a label and an input.

### Example

```jsx
import { useId } from '@uifabric/react-hooks';

const TextField = ({ labelText, defaultValue }) => {
  const id = useId('field');
  return (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type="text" defaultValue={defaultValue} />
    </div>
  );
};
```
