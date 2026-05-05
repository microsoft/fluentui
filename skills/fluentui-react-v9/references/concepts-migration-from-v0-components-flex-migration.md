# Flex component Migration guide

## Overview:

To help with the migration we also offer a mixin and a shim that [can be checked here](./?path=/docs/migration-shims-v0-flexshim--default)

Before:

After:

## How to migrate props:

| `Flex` props              | migrate guide                                                            |
| ------------------------- | ------------------------------------------------------------------------ |
| className                 | keep it as is                                                            |
| content                   | see [Migrate content prop](##migrate-content-prop) in this document      |
| variables, design, styles | see [Migrate style overrides](#migrate-style-overrides) in this document |
| debug                     | not supported, use custom style overrides if needed                      |
| column                    | keep it as is                                                            |
| fill                      | keep it as is                                                            |
| gap                       | keep it as is                                                            |
| hAlign                    | keep it as is                                                            |
| inline                    | keep it as is                                                            |
| padding                   | keep it as is                                                            |
| space                     | keep it as is                                                            |
| vAlign                    | keep it as is                                                            |
| wrap                      | keep it as is                                                            |

---

## Migrate `content` prop

Move `content` to JSX children.

Before:

After:

## Migrate style overrides

> Note: **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs). Also check examples in ["how to migrate styles" for Box component](./migrate-Box.md#Migrate-style-overrides).

### Example for migrate boolean `variables`:

Before:

After:

## Migrate flex items

Flex from Fluent UI v9 can work together with FlexItem from Fluent UI react-northstar. For details about FlexItem migration, see [FlexItem component Migration guide](./migrate-FlexItem.md).

If `Flex.Item` (dot notation) is used, replace these with `FlexItem`, if the items have not yet been migrated to V9.
