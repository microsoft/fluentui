# TabList component Migration guide

## Overview:

This document will guide you how to migrate from `Menu` component with `TabList` accessibility behavior from Fluent V0 to the `TabList` component in Fluent V9.

Before:

After:

## How to migrate props:

| Menu props                | migrate guide                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| as, className             | keep it as is                                                                                                                       |
| accessibility             | remove tabListBehavior and see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |
| variables, design, styles | see [Migrate style overrides](#migrate-style-overrides) in this document                                                            |
| activeIndex               | replace with `selectedValue` prop                                                                                                   |
| disabled                  | you can either disable the entire `TabList` or individual `TabItem` components                                                      |
| defaultActiveIndex        | replace with `defaultSelectedValue` prop                                                                                            |
| fluid                     | irrelevant (see Menu migration) or use styles                                                                                       |
| icon                      | move to `Tab` component                                                                                                             |
| items                     | map items to `Tab` component                                                                                                        |
| onActiveIndexChange       | remove, use `onTabSelect`                                                                                                           |
| onItemClick               | replace with `onTabSelect`                                                                                                          |
| ref, key                  | keep it as is                                                                                                                       |
| underlined                | remove, has underlined by default or use styles                                                                                     |
| vertical                  | keep it as is                                                                                                                       |

Here is a comparison for both versions: [Sandbox](https://codesandbox.io/s/tablist-migration-fluentui-forked-lmdx81?file=/example.tsx)

---

## Migrate `Menu` with `tabListBehavior` a11y prop

Replace `Menu` with `TabList` component and `items` props with `Tab` components as JSX children of `TabList`.

Before:

After:

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:
