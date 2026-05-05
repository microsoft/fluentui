# FlexItem component Migration guide

## Overview:

FlexItem component is replaced with matching style functions. This allows the code to be more robust, customizable and performant.

`flexItem` mixins are provided to make the transition easier. The mixins have very similar API as the `FlexItem` react-northstar component.

Before:

After:

If you are using `Flex` with horizontal direction, please use `pushRow` instead of `pushColumn`.

## How to migrate props:

| `FlexItem` props          | migrate guide                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| className                 | apply on the child component                                                                                                                                                               |
| variables, design, styles | apply on the child component (see corresponding migration guide for the particular component                                                                                               |
| align                     | use `flexItem.align()` mixin in child component's style file                                                                                                                               |
| flexDirection             | ignore                                                                                                                                                                                     |
| grow                      | use `flexItem.grow()` mixin in child component's style file                                                                                                                                |
| push                      | use `flexItem.pushRow()` or `flexItem.pushColumn()` mixin in child component's style file depending on the parent Flex direction                                                           |
| shrink                    | use `flexItem.shrink()` mixin in child component's style file                                                                                                                              |
| size                      | use `flexItem.size()` mixin in child component's style file. For arbitrary (pixel or rem) values, use style overrides as described in [Migrate style overrides](#migrate-style-overrides). |

---

## Migrate style overrides

> Note: **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs). Also check examples in ["how to migrate styles" for Box component](./migrate-Box.md#Migrate-style-overrides).

Styles applied to `FlexItem` using variables need to be moved to the child component.

### Example for migrate boolean `variables`:

Before:

After:

## Migrate flex items

Flex from Fluent UI v9 can work together with FlexItem from Fluent UI react-orthstar. For details about Flex migration, see [Flex component Migration guide](./migrate-Flex.md).
