A split button combines a primary action with a menu trigger for related actions.

The headless `SplitButton` has no default menu icon. Provide one through the `menuIcon` slot when
needed.

To compose with `Menu`, use `MenuTrigger`'s render prop to forward its generated trigger props to
the `menuButton` slot.

When no accessible name is provided for the menu trigger, `SplitButton` generates an
`aria-labelledby` fallback that references the primary action.
