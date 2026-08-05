A split button groups two interactive surfaces: interacting with the primary segment triggers a
default action, while interacting with the secondary segment opens a menu of related actions.

The headless `SplitButton` is unstyled and composes the headless `Button` and `MenuButton`
primitives internally — it renders no default menu icon of its own, so consumers must provide one
through the `menuIcon` slot when a visual indicator is desired.

The `menuButton` slot is meant to be used as a `Menu`'s trigger. Use `MenuTrigger`'s render-prop
child to forward the generated trigger props (`aria-expanded`, `aria-haspopup`, and the click
handler that opens the menu) into `SplitButton`'s `menuButton` prop. See the
[Menu](?path=/docs/components-menu--docs) stories for full menu composition with `MenuPopover`,
`MenuList`, and `MenuItem`.

If neither the primary segment nor the menu segment is given an explicit accessible name, the menu
segment falls back to `aria-labelledby` pointing at the primary segment, so screen readers describe
the menu's purpose relative to the primary action.

`SplitButton` itself does not own any interaction or disabled state: the nested `Button` and
`MenuButton` remain the sole owners of `data-disabled`, `data-disabled-focusable`, and
`data-icon-only`, and each can be set independently through the `primaryActionButton` and
`menuButton` slot props.
