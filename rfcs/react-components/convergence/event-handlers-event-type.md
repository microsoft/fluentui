# RFC: Standardize Event Handlers Event Typing

This RFC proposes solutions to enhance event typing within callbacks.

---

@yuanboxue-amber

## Summary

We encounter challenges when attempting to extend event types within callbacks without introducing breaking changes. This RFC offers potential solutions to manage such event type changes for both current stable components and future components.

## Problem statement

Our current design for event callbacks in v9 has the type signature `callback: (e: SomeEvents, data: SomeData) => void;`, where `SomeEvents` represents specific event types like MouseEvent or KeyboardEvent, or a union of specific event types. While our intention is to maintain strong type checking, this design complicates the process of expanding or altering event types without causing breaks.

We experienced this challenge when when adding a scroll event listener to the Popover `onOpenChange` callback. The callback has type `onOpenChange?: (e: OpenPopoverEvents, data: OnOpenChangeData) => void;`, where `OpenPopoverEvents` is a union of specific events. But the scroll event has just type `Event`. And we are facing issues when updating the type:

```ts
export type OpenPopoverEvents = KeyboardEvent | MouseEvent;
type Props = {
  onOpenChange: (e: OpenPopoverEvents) => void;
};
const onOpenChange = (e: MouseEvent | KeyboardEvent) => {};
const props: Props = { onOpenChange }; // 💣 This breaks when we add Event to OpenPopoverEvents. The error: '(e: MouseEvent | KeyboardEvent) => void' is not assignable to type '(e: OpenPopoverEvents) => void'.
```

This is a challenge especially when unforeseen events need to be added in the future.

## Detailed Design or Proposal

### 1. Solution for existing components in v9:

We cannot introduce generic Event type to the existing callbacks as this is a breaking change for any code that explicitly types its event argument (as in the example in "Problem statement").

#### Solution 1 - cast the new event to the existing type

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

- Pros 👍: No modifications to types.
- Cons 👎: Run-time type inaccuracies as illustrated in the code comment above.

### 2. Solutions for both existing components and upcoming components:

For new components without backward compatibility concerns, new type signatures can be directly adopted.

#### Solution 2 - callbacks with generic event type:

```ts
// For an existing component
export type PopoverProps = {
  /**
   * @deprecated Use onOpenChange2 instead.
   */
  onOpenChange?: (e: OpenPopoverEvents, data: OnOpenChangeData) => void;

  onOpenChange2?: (e: OpenPopoverEvents | Event, data: OnOpenChangeData) => void;
};

// For a new component
export type SomeProps = {
  callback?: (e: MouseEvent | Event, data: SomeData) => void;
};
```

- Pros 👍: Ensures correct typing and it can accommodate future, unforeseen event types.
- Cons 👎:

  1. Consumers will need to use type assertion or type predict to use a strongly-typed event:

     ```ts
     function isMouseEvent(e: Event): e is MouseEvent {
       return e instanceof MouseEvent;
     }
     const onOpenChange = (e: Event | MouseEvent | TouchEvent) => {
       console.log(e.clientX); // ❌ type error - Property 'clientX' does not exist on type 'Event'
       if (isMouseEvent(e)) {
         console.log(e.clientX); // ✅
       }
       if (e instanceof MouseEvent) {
         console.log(e.clientX); // ✅
       }
     };
     ```

- Extra cons 👎 for existing components:
  1. This is fragile - old `onOpenChange` won't be invoked when generic event happens (for example on scroll).
  2. Code bloat - we have many callbacks, there will be a bunch of extra codes to keep both versions of callbacks working.

Also perhaps there will be a case where generic event is inappropriate. For instance, if we can confidently assert that a callback only triggers on keyboard events. Although no such cases are identified yet, it remains a potential concern.

#### Solution 3 - "Data Bag" Approach - strongly-typed events are passed in the data argument.

Here, if the event could be a mouse or keyboard event, the callback receives two data fields (mouseEvent and keyboardEvent) which could be undefined.

```ts
export type OnOpenChangeData = { open: boolean; mouseEvent?: MouseEvent; keyboardEvent?: KeyboardEvent };
export type PopoverProps = {
  onOpenChange?: (e: OpenPopoverEvents, data: OnOpenChangeData) => void;
};
```

- Pros 👍:

  1. Ensures correct typing and it can accommodate future, unforeseen event types.
  2. Consumers can use the strongly-typed event in data without runtime checks.

- Cons 👎:

  1. The complexity of the callback signature increases. Users need to discern the differences between the event argument and the events within the data argument.
