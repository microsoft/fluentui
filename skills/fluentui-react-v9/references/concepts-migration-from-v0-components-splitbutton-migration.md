# SplitButton component Migration guide

`SplitButton` is now a combination of following components: `Menu`, `MenuTrigger`, `SplitButton`, `MenuPopover`, `MenuList` and `MenuItem`.

## Overview:

Before:

After:

More examples: [Sandbox](https://codesandbox.io/s/splitbutton-migration-fluentui-forked-4tvr9v?file=/example.tsx)

## How to migrate props:

| SplitButton props                       | migrate guide                                                                                                                                                                                                                                                                                                   |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessibility                           | In V0, we recommended to use `aria-roledescription` and `aria-describedby` on a `button` slot. This is no longer needed in V9 as a `SplitButton` in V9 is two tabs stop. Also see this a11y migration doc: [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |
| as, className                           | keep it as is                                                                                                                                                                                                                                                                                                   |
| align, autoSize                         | use `positioning` on `Menu` component; see [Migrate positioning props](../migrate-positioning.md)                                                                                                                                                                                                               |
| button                                  | use `primaryActionButton` instead                                                                                                                                                                                                                                                                               |
| content                                 | see [Migrate content prop](##migrate-content-prop) in this document                                                                                                                                                                                                                                             |
| defaultOpen                             | move `defaultOpen` prop to `Menu` component                                                                                                                                                                                                                                                                     |
| disabled                                | keep it as is                                                                                                                                                                                                                                                                                                   |
| flat                                    | use `appearance` prop with `outline` as a value                                                                                                                                                                                                                                                                 |
| flipBoundary, overflowBoundary          | use `positioning` on `Menu` component; see [Migrate positioning props](../migrate-positioning.md)                                                                                                                                                                                                               |
| menu                                    | replace with `MenuItem` wrapped in `MenuList` and `MenuPopover`                                                                                                                                                                                                                                                 |
| offset                                  | use `positioning` on `Menu` component; see [Migrate positioning props](../migrate-positioning.md)                                                                                                                                                                                                               |
| onMainButtonClick                       | add `primaryActionButton` prop with `onClick`                                                                                                                                                                                                                                                                   |
| onMenuItemClick                         | use `onClick` on `MenuItem`                                                                                                                                                                                                                                                                                     |
| onOpenChange                            | use `onOpenChange` on `Menu` component                                                                                                                                                                                                                                                                          |
| open                                    | use this prop on `Menu` component                                                                                                                                                                                                                                                                               |
| position, positionFixed                 | use `positioning` on `Menu` component; see [Migrate positioning props](../migrate-positioning.md)                                                                                                                                                                                                               |
| primary                                 | use `appearance` prop with `primary` as a value                                                                                                                                                                                                                                                                 |
| secondary                               | it's the default value without any prop needed                                                                                                                                                                                                                                                                  |
| size                                    | keep it as is                                                                                                                                                                                                                                                                                                   |
| toggleButton                            | use `ToggleButton` component                                                                                                                                                                                                                                                                                    |
| variables, styles, design               | see [Migrate style overrides](#migrate-style-overrides) in this document                                                                                                                                                                                                                                        |
| unstable_disableTether, unstable_pinned | use `positioning` on `Menu` component                                                                                                                                                                                                                                                                           |

Postioning props: `align`, `autoSize`, `flipBoundary`, `offset`,`overflowBoundary`,`popperRef`,`position`,`positionFixed`,`target`, `unstable_disableTether`, `unstable_pinned` are now attributes of the `positioning` prop. V9 positioning shorthand is recommended when only `positon` or/and `align` is used: `<MenuButton position="below" align="end" />` can be migrate to a string like `<Menu positioning="below-end" />`. See [Migrate positioning props](../migrate-positioning.md) for more.

Here is comparison for both versions: [Sandbox](https://codesandbox.io/s/splitbutton-migration-fluentui-forked-4tvr9v?file=/example.tsx)

---

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:

### Others

If the `MenuPopover` is not rendered in the correct position or is displaced due to ref changes, you can manually add the ref. This could be also useful if the Menu instance needs to be reused in different places. Please see the [`Anchor to Custom Target` example in the `Menu` V9 documentation](https://react.fluentui.dev/iframe.html?viewMode=docs&id=components-menu-menu--default#anchor-to-custom-target).

Find more examples here: [Sandbox](https://codesandbox.io/s/splitbutton-migration-fluentui-forked-4tvr9v?file=/example.tsx)
