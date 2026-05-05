# Tooltip Migration

## Overview:

Before:

After:

## How to migrate props:

| Tooltip props              | migrate guide                                                                                                                                                                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className, mountNode       | keep it as is                                                                                                                                                                                                                                                                                                           |
| content                    | see Migrate content prop in this document                                                                                                                                                                                                                                                                               |
| trigger                    | Move `trigger` to JSX children                                                                                                                                                                                                                                                                                          |
| accessibility              | see Migrate accessibility in this document                                                                                                                                                                                                                                                                              |
| defaultOpen                | Use controlled `visible` prop with default value `true` ([codesandbox example](<[https://codesandbox.io/s/tooltip-migration-2gy8r1?file=/DefaultOpenExample.jsx:353-410](https://codesandbox.io/s/tooltip-migration-2gy8r1?file=/DefaultOpenExample.jsx:353-410)>))                                                     |
| open                       | Replace with `visible`                                                                                                                                                                                                                                                                                                  |
| onOpenChange               | Replace with `onVisibleChange`                                                                                                                                                                                                                                                                                          |
| mouseEnterDelay            | Replace with `showDelay`                                                                                                                                                                                                                                                                                                |
| mouseLeaveDelay            | Replace with `hideDelay`                                                                                                                                                                                                                                                                                                |
| pointing                   | Replace with `withArrow`                                                                                                                                                                                                                                                                                                |
| subtle                     | Replace `subtle=` with `inverted`                                                                                                                                                                                                                                                                                       |
| dismissOnContentMouseEnter | Use controlled `visible` prop with custom `onMouseEnter` handler on `content` ([codesandbox example](<[https://codesandbox.io/s/tooltip-migration-2gy8r1?file=/DismissOnContentMouseEnterExample.jsx:246-279](https://codesandbox.io/s/tooltip-migration-2gy8r1?file=/DismissOnContentMouseEnterExample.jsx:246-279)>)) |

Postioning props: `align`, `autoSize`, `flipBoundary`, `offset`,`overflowBoundary`,`popperRef`,`position`,`positionFixed`,`target`, `unstable_disableTether`, `unstable_pinned` are now attributes of the `positioning` prop. v9 positioning shorthand is recommended when only `positon` or/and `align` is used: `<Tooltip position="below" align="end" />` can be migrated to a string like `<Tooltip positioning="below-end" />`. See [Migrate positioning props](?path=/docs/concepts-migration-from-v0-positioning--docs) for more.

Here's a [codesandbox](https://codesandbox.io/s/tooltip-migration-2gy8r1?file=/example.js) comparing v0 and v9 Tooltip.

---

## Migrate `content` prop

When `content` value is JSX, keep it as is.

When `content` value is shorthand object, for example

Migrate variables to use `makeStyles` API. Before:

After:

⚠️ **If this is your first time migrating style overrides**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

## Migrate accessibility

In v0, Tooltip has default `accessibility={tooltipAsLabelBehavior}`. If you are using the default accessibility, please add `relationship="label"` on v9 Tooltip.

If you are using `accessibility={tooltipAsDescriptionBehavior}`, replace it with `relationship="description"`.

If you are overriding Tooltip accessibility to be empty function, replace it with `relationship="inaccessible"`
