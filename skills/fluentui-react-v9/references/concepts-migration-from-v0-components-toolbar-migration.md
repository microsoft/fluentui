# Toolbar Migration

## Overview:

Before:

After:

## Controlled

V0 only allows to set an item active in a controlled way through `active` property in a toolbar item. V9 Toolbar doesn't need that by default by can also be controlled.

V9 Controlled:

## How to migrate props:

| `Toolbar` props           | migrate guide                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as, className             | keep it as is                                                                                                                                           |
| variables, styles, design | see [Migrate style overrides](#migrate-style-overrides) in this document                                                                                |
| accessibility             | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs)                                                |
| content                   | see [Migrate content prop](##migrate-content-prop) in this document                                                                                     |
| ref, key                  | keep it as is                                                                                                                                           |
| getOverflowItems          | REMOVED: Use @fluentui/react-overflow to render overflow items                                                                                          |
| items                     | REMOVED: Only supports children API                                                                                                                     |
| onOverflow                | use `isOverflowing` from `useOverflowMenu` from @fluentui/react-overflow. See [migrate overflow props](#migrate-%60overflow%60-props)                   |
| onOverflowOpenChange      | REMOVED: handle the needed changes in the overflow component. See [migrate overflow props](#migrate-%60overflow%60-props)                               |
| overflow                  | REMOVED: Use @fluentui/react-overflow                                                                                                                   |
| overflowItem              | REMOVED: Should be implemented in the Overflow component that is using `useOverflowMenu`. See [migrate overflow props](#migrate-%60overflow%60-props)   |
| overflowOpen              | REMOVED: Should be handled by the component that will be using `useOverflowMenu`                                                                        |
| overflowSentinel          | REMOVED: Can be set as `padding` in the `Overflow` component from @fluentui/react-overflow. See [migrate overflow props](#migrate-%60overflow%60-props) |

| `ToolbarItem` props | migrate guide                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| as, className       | keep it as is                                                                                                       |
| content             | see [Migrate content prop](##migrate-content-prop) in this document                                                 |
| variables, styles   | see [Migrate style overrides](#migrate-style-overrides) in this document                                            |
| accessibility       | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs)            |
| circular            | replace with `shape="circular"`                                                                                     |
| disabled            | keep it as is                                                                                                       |
| disabledFocusable   | keep it as is                                                                                                       |
| fluid               | replace with `block`                                                                                                |
| icon                | keep it as is.                                                                                                      |
| menu                | REMOVED: use `@fluentui/react-menu`                                                                                 |
| menuOpen            | REMOVED: use `@fluentui/react-menu`                                                                                 |
| onMenuOpenChange    | REMOVED: use `@fluentui/react-menu`                                                                                 |
| popup               | REMOVED: use `@fluentui/react-popover`, [see example](?path=/docs/preview-components-toolbar--default#with-popover) |
| wrapper             | REMOVED                                                                                                             |

`ToolbarCustomItem` in V9 is replaced by direct adding the content as `Toolbar` children.

V0

V9

Here is comparison for both versions: [Sandbox](https://codesandbox.io/s/toolbar-migration-fluentui-iyhl1j)

---

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:

### Example for migrate namespaced styles, with conditional styles via `variableProps`:

Before:

After:

## Migrate `overflow` props

Before:

After:

See [Toolbar Overflow Items example](https://react.fluentui.dev/docs/preview-components-toolbar--default#overflow-items)
