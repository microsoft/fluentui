# Menu component Migration guide

## Overview:

`Menu` component is a replacement for `MenuButton`.

Before:

After:

## How to migrate props:

| `MenuButton` props        | migrate guide                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| as, className             | keep it as is                                                                                            |
| variables, styles, design | see [Migrate style overrides](#migrate-style-overrides) in this document                                 |
| accessibility             | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |
| ref, key                  | keep it as is                                                                                            |
| contextMenu               | use `openOnContext` instead                                                                              |
| menu                      | see [Migrate menu and trigger props](#./Migrate-`menu`-and-`trigger`-props) in this document             |
| mouseLeaveDelay           | replace with `hoverDelay`                                                                                |
| on                        | replace `on='hover'` with `openOnHover`; `on='context'` with `openOnContext`                             |
| onMenuItemClick           | use `onClick` with each `MenuItem` instead                                                               |
| defaultOpen               | keep it as is                                                                                            |
| onOpenChange              | keep it as is                                                                                            |
| open                      | keep it as is                                                                                            |
| trigger                   | see [Migrate menu and trigger props](#./Migrate-`menu`-and-`trigger`-props) in this document             |

Postioning props: `align`, `autoSize`, `flipBoundary`, `offset`,`overflowBoundary`,`popperRef`,`position`,`positionFixed`,`target`, `unstable_disableTether`, `unstable_pinned` are now attributes of the `positioning` prop. v9 positioning shorthand is recommended when only `positon` or/and `align` is used: `<MenuButton position="below" align="end" />` can be migrate to a string like `<Menu positioning="below-end" />`. See [Migrate positioning props](../migrate-positioning.md) for more.

---

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:

## Migrate `menu` and `trigger` props

`menu` and `trigger` props were moved to JSX children using `MenuTrigger` and `MenuItem` components:

Before:

After:
