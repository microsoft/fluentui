# RFC: Extending Event Handlers Event Typing

This RFC proposes solutions to enhance event typing within callbacks.

---

@yuanboxue-amber @@bsunderhus @behowell

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

Change the first argument of event handlers to be generic [`Event`](https://github.com/microsoft/TypeScript/blob/cf73e5af5d225c9d963dd501f24c6e0fc0bf8314/src/lib/dom.generated.d.ts#L7971) or [`React.SyntheticEvent`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/6c9c7db2ac452f97b8e20e0d8b99bcf47625ed54/types/react/index.d.ts#L1251) types, and include strongly-typed events in the second `data` argument.

### Implementation

Define two helper types `EventData` and `EventHandler` to ensure consistency across all components:

```ts
export type EventData<Type extends string, TEvent> =
  | { type: undefined; event: React.SyntheticEvent | Event }
  | { type: Type; event: TEvent };

export type EventHandler<TData extends EventData<string, unknown>> = (
  ev: React.SyntheticEvent | Event,
  data: TData,
) => void;
```

- Add `EventData<...>` to the `data` argument of all existing events in the library.
- If a new event type needs to be added to an existing event handler that has a strongly-typed event:

  - Deprecate the existing `onSomeEvent` handler and introduce `onSomeEvent2` with the new proposed type signatures.
  - Continue to call the deprecated `onSomeEvent` in all cases. If the event object is of the wrong type for the existing function, do a cast.

- For new event handlers (and the "2" versions of existing ones):
  - Always use `EventHandler` type for the callback. It ensures the first argument is `React.SyntheticEvent | Event`.
  - Add strongly-typed events to the data object using `EventData` type.
    - `EventData` makes data a discriminated union, where each object requires `event` and `type` property. `event` is the specific event type, and `type` is a string literal that serves as a clear identifier of the event type. Developers can use the `type` property to easily verify and filter events of interest.
      > Note that we have similar approach to `data` in [`TreeItemOpenChangeData`](https://github.com/microsoft/fluentui/blob/2eedc2ec54397253a4e3076fbfa382f4fe3c1175/packages/react-components/react-tree/src/components/TreeItem/TreeItem.types.ts#L25C1-L31C3), [`DialogOpenChangeData`](https://github.com/microsoft/fluentui/blob/a0bd42391c0a259558383e0ea6077617485aa234/packages/react-components/react-dialog/src/components/Dialog/Dialog.types.ts#L10-L25)
    - `EventData` includes `{ type: undefined; event: React.SyntheticEvent | Event }` to ensure the event type of the data union is narrowed down to generic event. Developers must check `data.type` before using type-specific event.

```ts
import * as React from 'react';

// ======= For an existing component =======
{
  type OpenPopoverEvents = KeyboardEvent | MouseEvent; // existing event type

  type MyComponentElement = HTMLElement;

  type OnOpenChangeData = (
    | EventData<'click', React.MouseEvent<MyComponentElement>>
    | EventData<'keydown', React.KeyboardEvent<MyComponentElement>>
    | EventData<'scroll', Event>
  ) & {
    open: boolean;
  };

  type PopoverProps = {
    /**
     * @deprecated Use onOpenChange2 instead.
     */
    onOpenChange?: (e: OpenPopoverEvents, data: OnOpenChangeData) => void;

    onOpenChange2?: EventHandler<OnOpenChangeData>;
  };
}

// ======= For a new component =======
{
  type MyComponentElement = HTMLElement;

  type OnSomeEventData = EventData<'click', React.MouseEvent<MyComponentElement>> & {
    open: boolean;
  };
  // If one day we need to add more events, we can just add them to the union:
  // type OnSomeEventData = (
  //     | EventData<'click', React.MouseEvent<MyComponentElement>>
  //     | EventData<'focus', React.FocusEvent<MyComponentElement>>
  //   ) & {
  //     open: boolean;
  //   };

  type SomeProps = {
    onSomeEvent?: EventHandler<OnSomeEventData>;
  };
}
```

- Pros 👍:

  1. Ensures correct typing and it can accommodate future, unforeseen event types.
  2. Currently we use unions to type events in cases where a callback may be triggered by multiple events. Consumers will need to use type assertion or type predict to use a strongly-typed event. But this solution provides an easier way:

     ```ts
     {
       // Current way:
       function isMouseEvent(e: MouseEvent | TouchEvent): e is MouseEvent {
         return e instanceof MouseEvent; // This type check is just for demo purpose. There are issues with using `instanceof` in multi-window scenarios: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
       }
       const onOpenChange = (e: MouseEvent | TouchEvent) => {
         console.log(e.clientX); // ❌ type error - Property 'clientX' does not exist on type 'TouchEvent'
         if (isMouseEvent(e)) {
           console.log(e.clientX); // ✅
         }
       };
     }

     {
       // Proposed way:
       type OnSomeEventData =
         | EventData<'click', React.MouseEvent<MyComponentElement>>
         | (EventData<'focus', React.FocusEvent<MyComponentElement>> & {
             open: boolean;
           });
       const onOpenChange = (_e: Event, data: OnSomeEventData) => {
         console.log(data.event.currentTarget); // ✅ base event data can be used without checking data.type
         console.log(data.event.clientX); // ❌ Typescript will give an error here as expected
         if (data.type === 'click') {
           console.log(data.event.clientX); // ✅ this won't blow as `data.type` verification will ensure `data.event` is a mouse event
         }
       };
     }
     ```

- Cons 👎:
  1. The complexity of the callback signature increases. Users need to discern the differences between the event argument and the events within the data argument.
  2. Code bloat - as there are many callbacks, maintaining both versions of callbacks can become cumbersome. This is a problem that can only be solved in v10. But this is less of an issue since this proposal specifies deprecating/replacing the events on an as-needed basis.
  3. there may be a case where generic event is inappropriate. For instance, if we can confidently assert that a callback only triggers on keyboard events. Although no such cases are identified yet, it remains a potential concern.

We explored various alternatives, but this particular option stands out as the only secure choice for runtime, and therefore its drawbacks become inconsequential.

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

#### Discarded Solution 2 - use method declaration type

Change callbacks arrow functions to method declarations when event type needs to be extended:

```ts
type OpenPopoverEvents = MouseEvent | PointerEvent;
type Props = {
  onOpenChange(e: OpenPopoverEvents): void; // method instead of arrow function
};
const onOpenChange = (e: MouseEvent) => {
  console.log(e.clientX);
};
const props: Props = { onOpenChange }; // ✅
```

- Why typing works:
  The error described in the "Problem Statement" only occurs in TypeScript when the `strictFunctionType` option is enabled. This happens because the type `KeyboardEvent | MouseEvent | Event` is more specific than `KeyboardEvent | MouseEvent`. When attempting to assign a function with a less specific argument type (`const onOpenChange = (e: MouseEvent | KeyboardEvent) => {}`) to a function expecting a more specific argument type `onOpenChange: (e: KeyboardEvent | MouseEvent | Event) => void;`, TypeScript's `strictFunctionType` check fails.

  However, this stricter checking does not apply to method or constructor declarations: https://github.com/microsoft/TypeScript/pull/18654. This is why we don't see the error in the above code snippet.

- Where this solution fails 💣:
  This solution is similar to solution 1 (casting). In the above example, when adding `KeyboardEvent` to `OpenPopoverEvents`, there will not be any typing error, but there is a potential for runtime type inaccuracies - because `KeyboardEvent` does not have `clientX`.

Note that another option following the same principle is [bivarance hack](https://www.typescriptlang.org/play?#code/C4TwDgpgBAQglgNwIYCc5IHYGMIAklYDWAPACoBiGUEAHsBBgCYDOUAFAHReoDmzAXFEwgA2gF0AlFAC8APiEYQ86VADeAKChQARolTpseAoU7cUfQQAVUSALYR6KZmUqyJggEoOArigylwCBcMWQBudQBfEQByXWQ0TBx8ImixcPVQSCgAeUgMSwB7MAKECBQAUVKMYFYVAGkIEG0C1EZKhmAoAB8oAFkC72YIduruqBHgcMzoSxQi2rVNKAKMXIYAYQALTB4IQXh4gyTjYjY9nLzC4tKKqpqpOSgEArhGMMjwrBXmTpW1jC2O2gKjOgn6g2GdzGDSaLRQbTuD3kqgin2+nTAczAAigs3mMjUy1WeUBGF2UFRUAA9FSoIBQcnU6i+GB+RP+pN2MCQjAJoLUKEwjAKtkEGG8tm0ZQiSLUqKZ6KgmPmXMYVixC1UbJJ2zJ5z+2qBKopoWptLp1BokCw9B5wAKOmgZTmTiAA) which is widely used in open-source repositories.
