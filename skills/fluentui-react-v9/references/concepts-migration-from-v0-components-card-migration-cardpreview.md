# Card Preview Migration

## Overview

Before:

After:

## How to migrate props:

| CardPreview props | migration guide                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| as, className     | keep it as is                                                                                                                               |
| variables, styles | see Migrate `style` overrides in this document                                                                                              |
| accessibility     | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs). Also check the focusMode new prop |
| fitted            | REMOVED: by default, all Previews are fitted                                                                                                |
| horizontal        | REMOVED: no longer supported                                                                                                                |

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Follow the same patterns as in the Card [migration guide](?path=/docs/concepts-migration-from-v0-components-card-migration-card--docs).
