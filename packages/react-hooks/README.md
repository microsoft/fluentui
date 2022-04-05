# @fluentui/react-hooks

**[Fluent UI React](https://developer.microsoft.com/en-us/fluentui) hooks**

Helpful hooks not provided by React itself. These hooks were built for use in Fluent UI React ([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)) but can be used in React apps built with any UI library.

- [useBoolean](#useboolean) - Return a boolean value and callbacks for setting it to true or false, or toggling
- [useConst](#useconst) - Initialize and return a value that's always constant
- [useControllableValue](#usecontrollablevalue) - Manage the current value for a component that could be either controlled or uncontrolled
- [useForceUpdate](#useforceupdate) - Force a function component to update
- [useId](#useid) - Get a globally unique ID
- [useIsomorphicLayoutEffect](#useisomorphiclayouteffect) - Calls `useLayoutEffect` in browser and `useEffect` in SSR, to avoid warnings
- [useMergedRefs](#usemergedrefs) - Merge multiple refs into a single ref callback
- [useOnEvent](#useonevent) - Attach an event handler on mount and handle cleanup
- [usePrevious](#useprevious) - Get a value from the previous execution of the component
- [useRefEffect](#userefeffect) - Call a function with cleanup when a ref changes. Like `useEffect` with a dependency on a ref.
- [useSetInterval](#usesetinterval) - Version of `setInterval` that automatically cleans up when component is unmounted
- [useSetTimeout](#usesettimeout) - Version of `setTimeout` that automatically cleans up when component is unmounted
- [useTarget](#usetarget) - Logic used by several popup components to determine the target element or point to position against
- [useWarnings](#usewarnings) - Display debug-only warnings for invalid or deprecated props or other issues

## useBoolean

```ts
function useBoolean(initialState: boolean): [boolean, IUseBooleanCallbacks];

interface IUseBooleanCallbacks {
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}
```

Hook to store a boolean state value and generate callbacks for setting the value to true or false, or toggling the value.

The hook returns a tuple containing the current value and an object with callbacks for updating the value.

Each callback will always have the same identity.

### Example

```jsx
import { useBoolean } from '@fluentui/react-hooks';

const MyComponent = () => {
  const [value, { setTrue: showDialog, setFalse: hideDialog, toggle: toggleDialogVisible }] = useBoolean(false);
  // ^^^ Instead of:
  // const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  // const showDialog = React.useCallback(() => setIsDialogVisible(true), []);
  // const hideDialog = React.useCallback(() => setIsDialogVisible(false), []);
  // const toggleDialogVisible = isDialogVisible ? setFalse : setTrue;

  // ... code that shows a dialog when a button is clicked ...
};
```

## useConst

```ts
function useConst<T>(initialValue: T | (() => T)): T;
```

Hook to initialize and return a constant value. Unlike `React.useMemo`, this will **always** return the same value (and if the initializer is a function, only call it once). This is similar to setting a private member in a class constructor.

Its one parameter is the initial value, or a function to get the initial value. Similar to `useState`, only the first value/function passed in is respected.

If the value should ever change based on dependencies, use `React.useMemo` instead.

### Example

```jsx
import { useConst } from '@fluentui/react-hooks';

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

## useControllableValue

```ts
// Without onChange
function useControllableValue<TValue, TElement extends HTMLElement>(
  controlledValue: TValue | undefined,
  defaultUncontrolledValue: TValue | undefined,
): Readonly<[TValue | undefined, (update: React.SetStateAction<TValue | undefined>) => void]>;

// With onChange
function useControllableValue<
  TValue,
  TElement extends HTMLElement,
  TCallback extends ChangeCallback<TElement, TValue> | undefined
>(
  controlledValue: TValue | undefined,
  defaultUncontrolledValue: TValue | undefined,
  onChange: TCallback,
): Readonly<
  [TValue | undefined, (update: React.SetStateAction<TValue | undefined>, ev: React.FormEvent<TElement>) => void]
>;

type ChangeCallback<TElement extends HTMLElement, TValue> = (
  ev: React.FormEvent<TElement> | undefined,
  newValue: TValue | undefined,
) => void;
```

Hook to manage the current value for a component that could be either controlled or uncontrolled, such as a checkbox or input field. (See the [React docs](https://reactjs.org/docs/uncontrolled-components.html) about the distinction between controlled and uncontrolled components.)

Parameters:

- `controlledValue` (required): the current value if the component is controlled
- `defaultUncontrolledValue` (required): the default value if the component is uncontrolled (will not be used if `controlledValue` is defined)
- `onChange` (optional): callback to be notified of any changes triggered by the user

The returned value is an array with two elements:

- The current value
- A function that will update the internal state if uncontrolled, and invoke the `onChange` callback if present.
  - Like the setter returned by `React.useState`, the identity of this callback will never change.
  - Also like `React.useState`, you can call this function with either a value, or an updater function which takes the previous value as a parameter and returns the new value.

## useForceUpdate

```ts
function useForceUpdate(): () => void;
```

Returns a function which, when called, will force update a function component by updating a fake state value.

The returned function always has the same identity.

## useId

```ts
function useId(prefix?: string): string;
```

Hook to generate a unique ID (with optional `prefix`) in the global scope. This will return the same ID on every render.

Useful for cases in which a component may be rendered multiple times on the same page and needs to use an ID for internal purposes, such as associating a label and an input.

### Example

```jsx
import { useId } from '@fluentui/react-hooks';

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

## useIsomorphicLayoutEffect

```ts
// Type is the same as React.useEffect (not fully specifying here)
function useIsomorphicLayoutEffect(effect, deps?): void;
```

To avoid warnings about `useLayoutEffect` when server-side rendering, this calls `useEffect` on the server (no-op) and `useLayoutEffect` on the client. SSR is determined based on `setSSR` from `@fluentui/utilities`.

Prefer `useEffect` unless you have a specific need to do something after mount and before paint.

## useMergedRefs

```ts
function useMergedRefs<T>(...refs: React.Ref<T>[]): (instance: T) => void;
```

Hook to merge multiple refs (such as one passed in as a prop and one used locally) into a single ref callback that can be passed on to a child component.

```tsx
const Example = React.forwardRef(function Example(props: {}, forwardedRef: React.Ref<HTMLDivElement>) {
  const localRef = React.useRef<HTMLDivElement>();
  const mergedRef = useMergedRef(localRef, forwardedRef);

  React.useEffect(() => {
    localRef.current.focus();
  }, []);

  return <div>Example</div>;
});
```

## useMount

```ts
const useMount: (callback: () => void) => void;
```

Hook which asynchronously executes a callback once the component has been mounted using [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)..

```tsx
import { useMount } from '@fluentui/react-hooks';

const MyComponent = () => {
  useMount(() => {
    console.log('Example');
   })

  return <div />;
};
});
```

## useOnEvent

```ts
function useOnEvent<TElement extends Element, TEvent extends Event>(
  element: React.RefObject<TElement | undefined | null> | TElement | Window | undefined | null,
  eventName: string,
  callback: (ev: TEvent) => void,
  useCapture?: boolean,
): void;
```

Attach an event handler on mount and handle cleanup. The event handler is attached using `on()` from `@fluentui/utilities`.

## usePrevious

```ts
function usePrevious<T>(value: T): T | undefined;
```

Hook keeping track of a given value from a previous execution of the component the Hook is used in. See [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state).

## useRefEffect

```ts
function useRefEffect<T>(callback: (value: T) => (() => void) | void, initial: T | null = null): RefCallback<T>;

type RefCallback<T> = ((value: T | null) => void) & React.RefObject<T>;
```

Creates a ref, and calls a callback whenever the ref changes to a non-null value. The callback can optionally return a cleanup function that'll be called before the value changes, and when the ref is unmounted.

The return value is a function that should be called to set the ref's value. The returned object also has a `.current` member that can be used to access the ref's value (like a normal `RefObject`). This can be hooked up to an element's `ref` property.

`useRefEffect` can be used to work around a limitation that [`useEffect` cannot depend on `ref.current`](https://github.com/facebook/react/issues/14387#issuecomment-503616820).

### Example

```tsx
import { useRefEffect } from '@fluentui/react-hooks';

const MyComponent = () => {
  const myDivRef = useRefEffect<HTMLElement>(myDiv => {
    const observer = new ResizeObserver(entries => {
      console.log(`myDiv is ${entries[0].contentRect.width} px wide`);
    });
    observer.observe(myDiv);

    // Return a function to clean up the ResizeObserver when the ref is unmounted
    return () => observer.disconnect();
  });

  return <div ref={myDivRef} />;
};
```

## useSetInterval

```ts
function useSetInterval(): {
  setInterval: (callback: () => void, duration: number) => number;
  clearInterval: (id: number) => void;
};
```

Hook which returns safe `setInterval` and `clearInterval` methods. Intervals set up using this hook will be automatically cleared when the component is unmounted.

The returned callbacks always have the same identity.

### Example

```jsx
import { useSetInterval } from '@fluentui/react-hooks';

const MyComponent = () => {
  const { setInterval, clearInterval } = useSetInterval();

  // Set an interval
  const id = setInterval(() => console.log('test'), 500);

  // If needed, clear an interval manually.
  clearInterval(id);
};
```

## useSetTimeout

```ts
function useSetTimeout(): {
  setTimeout: (callback: () => void, duration: number) => number;
  clearTimeout: (id: number) => void;
};
```

Hook which returns safe `setTimeout` and `clearTimeout` methods. Timeout callbacks set up using this hook will be automatically cleared when the component is unmounted.

The returned callbacks always have the same identity.

### Example

```jsx
import { useSetTimeout } from '@fluentui/react-hooks';

const MyComponent = () => {
  const { setTimeout, clearTimeout } = useSetTimeout();

  // Set a timeout
  const id = setTimeout(() => console.log('test'), 500);

  // If needed, clear an timeout manually.
  clearTimeout(id);
};
```

## useTarget

```ts
type Target = Element | string | MouseEvent | Point | null | React.RefObject<Element>;

function useTarget<TElement extends HTMLElement = HTMLElement>(
  target: Target | undefined,
  hostElement?: React.RefObject<TElement | null>,
): Readonly<[React.RefObject<Element | MouseEvent | Point | null>, React.RefObject<Window | undefined>]>;
```

Hook which queries the document for the element indicated by a CSS query string (if provided), or returns the element/event/point provided. Also attempts to determine the Window object for the provided target.

## useUnmount

```ts
const useUnmount: (callback: () => void) => void;
```

Hook that asynchronously fires a callback during unmount using [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect).

```tsx
import { useUnmount } from '@fluentui/react-hooks';

const MyComponent = () => {
  useUnmount(() => {
    console.log('Example');
  });

  return <div />;
};
```

## useWarnings

```ts
function useWarnings<P>(options: IWarningOptions<P>): void;
```

Display console warnings when certain conditions are met. If using webpack, the warning code will automatically be stripped out in production mode.

The following types of warnings are supported (see typings for details on how to specify all of these):

- `other`: Generic string messages.
- `conditionallyRequired`: Warns about props that are required if a condition is met.
- `deprecations`: Warns when deprecated props are being used.
- `mutuallyExclusive`: Warns when two props which are mutually exclusive are both being used.
- `controlledUsage`: Warns on any of the following error conditions in a form component (mimicking the warnings React gives for these error conditions on an input element):
  - A value prop is provided (indicated it's being used as controlled) without a change handler, and the component is not read-only
  - Both the value and default value props are provided
  - The component is attempting to switch between controlled and uncontrolled

Note that all warnings except `controlledUsage` will only be shown on first render. New `controlledUsage` warnings may be shown later based on prop changes. All warnings are shown synchronously during render (not wrapped in `useEffect`) for easier tracing/debugging.
