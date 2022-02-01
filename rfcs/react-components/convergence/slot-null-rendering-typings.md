# RFC: Fix typings for slot null rendering

---

@behowell

RFC Pull Request: [#21414](https://github.com/microsoft/fluentui/pull/21414)

## Summary

All of our slots currently accept `null` as values, but our components aren't necessarily built to work with some slots missing. This proposes requiring the slot's type to explicitly include `null` if the slot supports not being rendered.

## Background

[RFC: Slot null rendering refactoring](./slot-null-rendering.md) ([#18949](https://github.com/microsoft/fluentui/pull/18949)) introduced the concept of slots being able to null-render by the user passing in `slot={null}`.

## Problem statement

### Primary issue: Slots can be set to `null` even if they're required

Users can set any slot of any of our components to `null` to make that slot not render. However, most of our component code is not written to handle that case. If a component marks a slot as "required" in the call to `resolveShorthand`, it can still be `null` even though that's not reflected in the return type of `resolveShorthand`. As a result, setting a "required" slot to null will likely cause the component to crash.

Additionally, some slots may be critical to the functionality of a component (for example, `Input`'s `input` slot), and it is not reasonable to allow them to be not rendered.

### Secondary issue: There is no way to control the types added to slots by `ComponentProps`

The helper type `ComponentProps` adds ShorthandProps to every slot, which includes `null` and other shorthand values. In addition to `null` not being appropriate for every slot, shorthand values aren't appropriate for every slot either. For example, a slot of type `img` should not allow shorthand because the `img` tag can never have children.

## Detailed Design

### Proposal

The basic idea is as follows:

- Add `ShorthandValue` and `null` on the types of slots defined in `{Component}Slots`.
- Update `ComponentProps` to not add ShorthandValue or null, because the slot types already have it.
- Update `ComponentState` to _remove_ ShorthandValue, because the shorthand needs to be resolved before going on state.
- Update `resolveShorthand` to include `null` in its return type if the slot is potentially null. That should either force null checks in code, or force the dev to add `NonNullable` to the slot.

Here are some usage examples:

```ts
type ExampleSlots = {
  // The proposal is to include ShorthandValue and null in the type of slots:
  slot?: IntrinsicSlotProps<'span'> | ShorthandValue | null;

  // ... except with a new helper type Slot that ensures all slots support shorthand and null by default:
  slot?: Slot<'span'>; // ==  IntrinsicSlotProps<'span'> | ShorthandValue | null;

  // The Slot helper type also supports components:
  slot?: Slot<typeof Button>; // ==  ComponentSlotProps<'span'> | ShorthandValue | null;

  // Slots can prevent being set to null using NonNullable:
  slot?: NonNullable<Slot<'span'>>;

  // Slots can also opt out of shorthand.
  // Since the only good reason to opt out of shorthand is when children aren't allowed,
  // there's a special type SlotNoChildren, which also prevents children from being added via slot props:
  slot?: SlotNoChildren<'img'>;
};
```

### Implementation

There is a PR with the proposed implementation here: https://github.com/microsoft/fluentui/pull/21518. The most relevant part is in react-utilities.
