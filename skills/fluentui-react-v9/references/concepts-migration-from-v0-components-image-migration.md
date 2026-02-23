# Image Migration

## Overview:

Before:

After:

## How to migrate props:

| Image props                    | migrate guide                                                                                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as, className                  | keep it as is                                                                                                                                                                           |
| src, alt, aria-label, key, ref | keep it as is                                                                                                                                                                           |
| aria-hidden                    | if `alt` property is empty and image is illustrative or not relevant for screen reader users, it's **required** to add `aria-hidden="true"` attribute (in v0 it was applied bt default) |
| variables, design, styles      | see Migrate style overrides in this document                                                                                                                                            |
| accessibility                  | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs)                                                                                |
| fluid                          | replace with `fit="contain"`                                                                                                                                                            |
| circular                       | replace with `shape="circular"`                                                                                                                                                         |
| avatar                         | see Migrate avatar prop in this document                                                                                                                                                |

---

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:

## Migrate `avatar` prop

Use `Avatar` component instead of `Image` with prop `avatar` when you need to render avatar.

Before:

After:
