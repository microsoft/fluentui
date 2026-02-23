# Segment component Migration guide

## Overview:

To help with the migration we also offer a shim that [can be checked here](./?path=/docs/migration-shims-v0-segmentshim--default)

Before:

After:

## How to migrate props:

| `Segment` props           | migrate guide                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| as, className             | keep it as is                                                                                            |
| content                   | move `content` to JSX children.                                                                          |
| variables, styles, design | see [Migrate style overrides](#migrate-style-overrides) in this document                                 |
| accessibility             | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |
| ref, key                  | keep it as is                                                                                            |
| color                     | REMOVED: use styles and color tokens to style it properly                                                |
| disabled                  | REMOVED: use styles and color tokens to style it properly                                                |
| inverted                  | REMOVED: use styles and color tokens to style it properly                                                |

---

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:
