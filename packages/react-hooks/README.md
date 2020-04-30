# @uifabric/react-hooks

**[Fluent UI React](https://developer.microsoft.com/en-us/fluentui) hooks**

Helpful hooks not provided by React itself. These hooks were built for use in Fluent UI React ([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)) but can be used in React apps built with any UI library.

- [useConst](#useconst) - Initialize and return a value that's always constant
- [useConstCallback](#useconstcallback) - Like `useConst` but for functions
- [useId](#useid) - Get a globally unique ID
- [useBoolean](#useboolean) - Return a boolean value and callbacks for setting it to true or false, or toggling

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

## useBoolean

`function useBoolean(initialState: boolean): [boolean, IUseBooleanCallbacks]`

Hook to store a boolean state value and generate callbacks for setting the value to true or false, or toggling the value.

The hook returns a tuple containing the current value and an object with callbacks for updating the value.

### `IUseBooleanCallbacks` properties

- `setTrue: () => void`: Set the value to true. Always has the same identity.
- `setFalse: () => void`: Set the value to false. Always has the same identity.
- `toggle: () => void`: Toggle the value. Always has the same identity.

### Example

```jsx
import { useBoolean } from '@uifabric/react-hooks';

const MyComponent = () => {
  const [value, { setTrue: showDialog, setFalse: hideDialog, toggle: toggleDialogVisible }] = useBoolean(false);
  // ^^^ Instead of:
  // const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  // const showDialog = useConstCallback(() => setIsDialogVisible(true));
  // const hideDialog = useConstCallback(() => setIsDialogVisible(false));
  // const toggleDialogVisible = isDialogVisible ? setFalse : setTrue;

  // ... code that shows a dialog when a button is clicked ...
};
```

## useControllableValue

`function useControllableValue<TValue, TElement extends HTMLElement>( controlledValue: TValue | undefined, defaultUncontrolledValue: TValue | undefined, ): Readonly<[TValue | undefined, (newValue: TValue | undefined) => void]>`

`function useControllableValue< TValue, TElement extends HTMLElement, TCallback extends ChangeCallback<TElement, TValue> | undefined \>( controlledValue: TValue | undefined, defaultUncontrolledValue: TValue | undefined, onChange: TCallback, ): Readonly<[TValue | undefined, (newValue: TValue | undefined, ev: React.FormEvent<TElement>) => void]>`

Hook to manage the current value for a component that could be either controlled or uncontrolled, such as a checkbox or input field.

Its two required parameters are the `controlledValue` (the current value of the control in the controlled state), and the `defaultUncontrolledValue` (for the uncontrolled state). Optionally, you may pass a third `onChange` callback to be notified of any changes triggered by the control.

The return value will be a setter function that will set the internal state in the uncontrolled state, and invoke the `onChange` callback if present.

See [React docs](https://reactjs.org/docs/uncontrolled-components.html) about the distinction between controlled and uncontrolled components.

## useMergedRefs

`function useMergedRefs<T>(...refs: React.Ref<T>[]): (instance: T) => void`

Hook to merge multiple refs (such as one passed in as a prop and one used locally) into a single ref callback that can be passed on to a child component.

```typescriptreact
const Example = React.forwardRef(function Example(props:{}, forwardedRef: React.Ref<HTMLDivElement>) {
  const localRef = React.useRef<HTMLDivElement>();
  const mergedRef = useMergedRef(localRef, forwardedRef);

  React.useEffect(() => { localRef.current.focus() }, []);

  return <div>Example</div>;
})
```
