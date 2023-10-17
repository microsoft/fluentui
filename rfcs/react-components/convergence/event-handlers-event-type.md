# RFC: Extending Event Handlers Event Typing

This RFC proposes solutions to enhance event typing within callbacks.

---

@yuanboxue-amber

## Summary

We encounter challenges when attempting to extend event types within callbacks without introducing breaking changes. This RFC offers potential solutions to manage such event type changes for v9 components.
Notably, this RFC explores alternatives for v10 in discarded solutions, but it is not aiming for proposing a v10 callback type design.

## Problem Statement

Our current design for event callbacks in v9 has the type signature `onSomeEvent: (e: SomeEvents, data: SomeData) => void;`, where `SomeEvents` represents specific event types like MouseEvent or KeyboardEvent, or a union of specific event types. While our intention is to maintain strong type checking, this design complicates the process of expanding or altering event types without causing breaks.

We experienced this challenge when when adding a scroll event listener to the Popover `onOpenChange` callback. The callback has type `onOpenChange?: (e: OpenPopoverEvents, data: OnOpenChangeData) => void;`, where `OpenPopoverEvents` is a union of specific events. But the scroll event has just type `Event`. And we are facing issues when updating the type:

```ts
export type OpenPopoverEvents = KeyboardEvent | MouseEvent;
type Props = {
  onOpenChange: (e: OpenPopoverEvents) => void;
};
const onOpenChange = (e: MouseEvent | KeyboardEvent) => {};
const props: Props = { onOpenChange }; // 💣 This breaks when we add Event to OpenPopoverEvents. The error: '(e: MouseEvent | KeyboardEvent) => void' is not assignable to type '(e: OpenPopoverEvents) => void'.
```

We cannot just add the `Event` type to the existing callbacks as this is a breaking change for any code that explicitly types its event argument. This is a challenge especially when unforeseen events need to be added in the future.

## Detailed Proposal

### Proposal

Change callbacks arrow functions to method declarations when event type needs to be extended:

```ts
type OpenPopoverEvents = KeyboardEvent | MouseEvent | Event;
type Props = {
  onOpenChange(e: OpenPopoverEvents): void; // method instead of arrow function
};
const onOpenChange = (e: MouseEvent | KeyboardEvent) => {};
const props: Props = { onOpenChange }; // ✅
```

### Reasoning

The error described in the "Problem Statement" only occurs in TypeScript when the `strictFunctionType` option is enabled. This happens because the type `KeyboardEvent | MouseEvent | Event` is more specific than `KeyboardEvent | MouseEvent`. When attempting to assign a function with a less specific argument type (`const onOpenChange = (e: MouseEvent | KeyboardEvent) => {}`) to a function expecting a more specific argument type `onOpenChange: (e: KeyboardEvent | MouseEvent | Event) => void;`, TypeScript's `strictFunctionType` check fails.

However, this stricter checking does not apply to method or constructor declarations: https://github.com/microsoft/TypeScript/pull/18654. This is why we don't see the error in the following example:

`strictFunctionType` check is a valuable TypeScript feature. However, there is no harm to use method to bypass this check for our callbacks. This is because we commit to only adding event types to the events union, never removing them (removal would be a breaking change). Therefore we can permit less specific event type arguments on the user side without compromising overall type safety.

Another option following the same principle is [bivarance hack](https://www.typescriptlang.org/play?#code/C4TwDgpgBAQglgNwIYCc5IHYGMIAklYDWAPACoBiGUEAHsBBgCYDOUAFAHReoDmzAXFEwgA2gF0AlFAC8APiEYQ86VADeAKChQARolTpseAoU7cUfQQAVUSALYR6KZmUqyJggEoOArigylwCBcMWQBudQBfEQByXWQ0TBx8ImixcPVQSCgAeUgMSwB7MAKECBQAUVKMYFYVAGkIEG0C1EZKhmAoAB8oAFkC72YIduruqBHgcMzoSxQi2rVNKAKMXIYAYQALTB4IQXh4gyTjYjY9nLzC4tKKqpqpOSgEArhGMMjwrBXmTpW1jC2O2gKjOgn6g2GdzGDSaLRQbTuD3kqgin2+nTAczAAigs3mMjUy1WeUBGF2UFRUAA9FSoIBQcnU6i+GB+RP+pN2MCQjAJoLUKEwjAKtkEGG8tm0ZQiSLUqKZ6KgmPmXMYVixC1UbJJ2zJ5z+2qBKopoWptLp1BokCw9B5wAKOmgZTmTiAA) which is widely used in open-source repositories. This RFC propose the method solution because of its simplicity compared to the bivariance hack.

### Lint/Test

We do not have lint rules for event callbacks.
We have conformance test `'consistent-callback-args'` to ensure the consistency of callback arguments. This test checks prop type for [property signature](https://github.com/microsoft/fluentui/blob/d8ccb09308a24eea6adf419896254116546296ee/packages/react-conformance/src/utils/getCallbackArguments.ts#L286C32-L286C32). It will need to be updated to look for method signature as well.

## Discarded Solutions

#### Discarded Solution 1 - cast the new event to the existing type

```ts
// Within our codebase:
export type OpenPopoverEvents = KeyboardEvent | MouseEvent;

const usePopover = () => {
  const handleScroll = (e: Event) => {
    onOpenChange(e as OpenPopoverEvents, data);
  };
};

// In consumer implementations:
const onOpenChange = (e: MouseEvent | KeyboardEvent) => {
  console.log(e.shiftKey); // 💣 This would fail since shiftKey doesn't exist on 'Event'
};
const props: Props = { onOpenChange };
```

This solution has been discarded due to its potential for runtime type inaccuracies as illustrated in the code comment above.

#### Discarded Solution 2 - generic [`Event`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v17/global.d.ts#L10) type and strongly-typed events in "data bag"

- For existing event handlers where we can't change the type:

  - Deprecate the existing `onSomeEvent` handler and introduce `onSomeEvent2` with the new proposed type signatures.
  - Continue to call the deprecated `onSomeEvent` in all cases. If the event object is of the wrong type for the existing function, do a cast.

- For new event handlers (and the "2" versions of existing ones):
  - Always use the type `React.SyntheticEvent | Event | undefined` for the first argument.
  - "Data bag" - always add a strongly-typed event to the data object for all currently possible event types, as optional (?) properties.

```ts
export type CallbackEvents = React.SyntheticEvent | Event | undefined;

// ======= For an existing component =======
export type OnOpenChangeData = {
  open: boolean;
  // Assuming 'open' state change can be triggered by mouse or keyboard events:
  mouseEvent?: MouseEvent;
  keyboardEvent?: KeyboardEvent;
};

export type PopoverProps = {
  /**
   * @deprecated Use onOpenChange2 instead.
   */
  onOpenChange?: (e: OpenPopoverEvents, data: OnOpenChangeData) => void;

  onOpenChange2?: (e: CallbackEvents, data: OnOpenChangeData) => void;
};

// ======= For a new component =======
export type onSomeEventData = {
  open: boolean;
  // Assuming state change can be triggered by focus event:
  focusEvent?: FocusEvent;
};
export type SomeProps = {
  onSomeEvent?: (e: CallbackEvents, data: SomeData) => void;
};
```

- Pros 👍:

  1. Ensures correct typing and it can accommodate future, unforeseen event types.
  2. Consumers can use the strongly-typed event in data without runtime checks.

- Cons 👎:
  1. The complexity of the callback signature increases. Users need to discern the differences between the event argument and the events within the data argument.
  2. Code bloat - as there are many callbacks, maintaining both versions of callbacks can become cumbersome. This is a problem that can only be solved in v10.

Additionally, there may be a case where generic event is inappropriate. For instance, if we can confidently assert that a callback only triggers on keyboard events. Although no such cases are identified yet, it remains a potential concern.

✨ Even though this solution has been discarded, it offers insights into how we can improve the event typing in v10.
In v9 we use unions to type events when a callback can be triggered by multiple events. Consumers will need to use type assertion or type predict to use a strongly-typed event:

```ts
function isMouseEvent(e: MouseEvent | TouchEvent): e is MouseEvent {
  return e instanceof MouseEvent; // This type check is just for demo purpose. There are issues with using `instanceof` in multi-window scenarios: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
}
const onOpenChange = (e: MouseEvent | TouchEvent) => {
  console.log(e.clientX); // ❌ type error - Property 'clientX' does not exist on type 'TouchEvent'
  if (isMouseEvent(e)) {
    console.log(e.clientX); // ✅
  }
};
```

We can consider the data bag approach in v10 to eliminate the need for type assertion. V9 Tree is already implementing a similar approach in [`TreeItemOpenChangeData`](https://github.com/microsoft/fluentui/blob/2eedc2ec54397253a4e3076fbfa382f4fe3c1175/packages/react-components/react-tree/src/components/TreeItem/TreeItem.types.ts#L25C1-L31C3).
