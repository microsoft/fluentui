# RFC: Adding extensibility path to the `as` prop

---

@khmakoto

## Summary

We had previously restricted the `as` prop to accept only HTML elements due to issues this created with the developer experience. While this makes sense in general, we might be able to add a bit of an extensibility story while still supporting most of the restrictions we still have in place.

## Proposal

What we are proposing here is to allow slots typed as `slotName: Slot<typeof Component>` to be able to be passed in only components whose props extend the props interface of the original type passed in.

A prime example of this would be having the `primaryActionButton` slot of the `SplitButton` be a `ToggleButton` instead of a regular button.

`SplitButtonSlots` type definition:

```ts
export type SplitButtonSlots = {
  /**
   * Root of the component that wraps the primary action button and menu button.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: Slot<typeof MenuButton>;
  /**
   * Button to perform primary action in SplitButton.
   */
  primaryActionButton?: Slot<typeof Button>;
};
```

`ToggleButtonProps` type definition:

```ts
type ToggleButtonCommons = {
  /**
   * Defines the controlled checked state of the `ToggleButton`.
   * If passed, `ToggleButton` ignores the `defaultChecked` property.
   * This should only be used if the checked state is to be controlled at a higher level and there is a plan to pass the
   * correct value based on handling `onClick` events and re-rendering.
   * @default false
   */
  checked: boolean;
};

export type ToggleButtonProps = ButtonProps &
  Partial<ToggleButtonCommons> & {
    /**
     * Defines whether the `ToggleButton` is initially in a checked state or not when rendered.
     * @default false
     */
    defaultChecked?: boolean;
  };
```

Since `primaryActionButton` is typed as `Slot<typeof Button>` and `ToggleButtonProps` extends from `ButtonProps`, the idea is that we could do:

```tsx
<SplitButton primaryActionButton={{ as: ToggleButton }} />
```

And it would work correctly replacing the primary action button with a `ToggleButton`, while at the same time prohibiting components whose props do not extend those of `Button`. For example:

```tsx
<SplitButton primaryActionButton={{ as: Menu }} />
```

Would error as `MenuProps` does not extend `ButtonProps`.

## Detailing the changes

Extend `as` so that it can take in components whose props extend the props of `[ComponentName]` whenever a slot is typed as `slotName: Slot<typeof [ComponentName]>`.

With this change we make `as` more extensible while still maintaining type safety:

```tsx
<>
  {/* ✅ renders primaryActionButton as <Button /> */}
  <SplitButton />
  {/* ✅ renders primaryActionButton as <Button as="a" /> */}
  <SplitButton primaryActionButton={{ as: 'a' }} />
  {/* ✅ renders primaryActionButton as <ToggleButton /> */}
  <SplitButton primaryActionButton={{ as: ToggleButton }} />
  {/* ❌ throws a compiler error */}
  <SplitButton primaryActionButton={{ as: Menu }} />
</>
```

### Pros and Cons

- 👍 We add extensibility to the `as` prop for the most used scenarios
- 👍 We keep type safety
- 👍 Backwards compatible change, we can make it so everything that already works keeps working and all the guardrails we have stay there

- 👎 Makes types more complex than they already are

- ❓ Accessibility might be a concern but for the most part that would just happen if we are changing the accessibility model of something we are extending so this should not be as prevalent as one might otherwise think.

## Discarded Solutions

NA

## Open Issues

NA
