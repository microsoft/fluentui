# Avatar Migration

## Overview:

Before:

After:

## How to migrate props:

| Avatar props              | migrate guide                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| as, className             | keep it as is                                                                                            |
| variables, design, styles | see Migrate style overrides in this document                                                             |
| accessibility             | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |
| key, ref                  | keep it as is                                                                                            |
| getInitials               | use `initials` prop instead                                                                              |
| icon                      | keep it as is                                                                                            |
| image                     | see Migrate image prop in this document                                                                  |
| label                     | use `initials` prop instead                                                                              |
| name                      | keep it as is                                                                                            |
| size                      | see Migrate size prop in this document                                                                   |
| square                    | replace with `shape="square"`                                                                            |
| status                    | see Migrate status prop in this document                                                                 |

---

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:

## Migrate `image` prop

To migrate `image` prop use following object structure:

Before:

After:

## Migrate `size` prop

Introduced new size values:

| Value before | Value after |
| ------------ | ----------- |
| smallest     | 20          |
| smaller      | 24          |
| small        | 28          |
| medium       | 32          |
| large        | 64          |
| largest      | 96          |

Before:

After:

## Migrate `status` prop

`status` property was replaced with `badge` property. There were introduced simplified status indicators: `busy`, `outOfOffice`, `away`, `available`, `offline`, `doNotDisturb`.

Before:

After:

All status indicators can be used with `outOfOffice` property:
