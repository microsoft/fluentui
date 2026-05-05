# ItemLayout component Migration guide

## Overview:

When `ListItem` component was used **only** for layouting purposes it can be replaced by `ItemLayout`.

> Notes:
>
> - `ItemLayout` uses [CSS Grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).
> - `ItemLayout`'s `endMedia` is always visible (`ListItem` makes it visible only on `hover`)

Before:

After:

## How to migrate props:

| `ItemLayout` props        | migrate guide                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| className                 | keep it as is                                                                                            |
| content                   | see [Migrate content prop](##migrate-content-prop) in this document                                      |
| variables, design, styles | see [Migrate style overrides](#migrate-style-overrides) in this document                                 |
| accessibility             | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |

---

## Migrate `content` prop

Move `content` to JSX children.

Before:

After:

To pass props to a wrapping element use `contentWrapper` slot:

Before:

After:

## Migrate style overrides

> Note: **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs). Also check examples in ["how to migrate styles" for Box component](./migrate-Box.md#Migrate-style-overrides).

### Example for migrate boolean `variables`:

Before:

After:
