# Box component Migration guide

## Overview:

`Box` component is replaced by `Primitive`.

Before:

After:

## How to migrate props:

| Box props                 | migrate guide                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| as, className             | keep it as is                                                                                            |
| content                   | see [Migrate content prop](##migrate-content-prop) in this document                                      |
| variables, design, styles | see [Migrate style overrides](#migrate-style-overrides) in this document                                 |
| accessibility             | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |

---

## Migrate `content` prop

Move `content` to JSX children.

Before:

After:

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:
