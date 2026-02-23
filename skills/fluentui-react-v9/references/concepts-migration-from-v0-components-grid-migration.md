# Grid component Migration guide

## Overview:

To help with the migration we also offer a shim that [can be checked here](./?path=/docs/migration-shims-v0-gridshim--default)

Before:

After:

## How to migrate props:

| `Grid` props              | migrate guide                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| className                 | keep it as is                                                                                            |
| content                   | see [Migrate content prop](#migrate-content-prop) in this document                                       |
| variables, design, styles | see [Migrate style overrides](#migrate-style-overrides) in this document                                 |
| accessibility             | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |
| columns                   | see [Migrate columns and rows](#migrate-columns-and-rows)                                                |
| rows                      | see [Migrate columns and rows](#migrate-columns-and-rows)                                                |

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

## Migrate columns and rows

Classes for grids up to 3 rows and columns are prepared in the V9 component:

Before:

After:

If the number of columns/rows is higher than 3 or if custom template is used, style overrides need to be used:

Before:

After:
