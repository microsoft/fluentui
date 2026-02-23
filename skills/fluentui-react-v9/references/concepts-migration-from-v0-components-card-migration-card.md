# Card Migration

## Overview

Before:

After:

## How to migrate props:

| Card props        | migration guide                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| as, className     | keep it as is                                                                                                                               |
| variables, styles | see Migrate `style` overrides in this document                                                                                              |
| accessibility     | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs). Also check the focusMode new prop |
| centered          | REMOVED: see Migrate `centered` prop in this document                                                                                       |
| compact           | use `size="small"`                                                                                                                          |
| disabled          | REMOVED: No equivalent functionality. Can be created by overriding the styles.                                                              |
| elevated          | REMOVED: All cards are now elevated by default. To change that, use the `appearance` property.                                              |
| expandable        | REMOVED: No equivalent functionality.                                                                                                       |
| fluid             | REMOVED: see Migrate `fluid` prop in this document                                                                                          |
| ghost             | use `appearance="subtle"`                                                                                                                   |
| inverted          | use `appearance="filled-alternative"`                                                                                                       |
| size              | keep it as is. Values: `small`, `medium`(default) and `large`                                                                               |

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:

### Example for migrate namespaced styles, with conditional styles via `variableProps`:

Before:

After:

## Migrate `centered` prop

Can be achieved by overriding the styles of the Card component.

Before:

After:

## Migrate `size` prop

All cards are fluid by default. To change that, use a parent container with a defined size.

Before:

After:
