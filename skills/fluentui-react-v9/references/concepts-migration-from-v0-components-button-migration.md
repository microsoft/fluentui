# Button Migration

## Overview:

To help with the migration we also offer a mixin that [can be checked here](./?path=/docs/migration-shims-v0-buttonmixins--disabled-cursor)

Before:

After:

## How to migrate props:

| Button props      | migrate guide                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| as, className     | keep it as is                                                                                            |
| content           | see Migrate content prop in this document                                                                |
| variables, styles | see Migrate style overrides in this document                                                             |
| accessibility     | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |
| circular          | replace with `shape="circular"`                                                                          |
| disabled          | keep it as is                                                                                            |
| disabledFocusable | keep it as is                                                                                            |
| flat              | REMOVED: it's a default view now, we're moving away from shadows                                         |
| fluid             | REMOVED: use styles to set width to 100% and flex grow to 1                                              |
| icon              | keep it as is. See Button + Icon integration in this document                                            |
| iconOnly          | REMOVED: see Migrate iconOnly prop in this document                                                      |
| iconPosition      | keep it as is                                                                                            |
| inverted          | REMOVED: use styles and color tokens to set a proper styling \*                                          |
| loader, loading   | REMOVED: see Migrate loading and loader props in this document                                           |
| primary           | use `appearance="primary"`                                                                               |
| secondary         | REMOVED: the button appears with the default style                                                       |
| size              | keep it as is. Values: `small`, `medium`(default) and `large`                                            |
| text              | use `appearance="transparent"`                                                                           |
| tinted            | REMOVED: use Default button instead                                                                      |

- this may be changed Here is comparison for both versions: [Sandbox](https://codesandbox.io/s/exciting-liskov-y5u5hy?file=/example.tsx)

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

### Example for migrate namespaced styles, with conditional styles via `variableProps`:

Before:

After:

### Migrate `iconOnly` prop

Before:

After:

### Button + Icon integration

During migration it's possible to have different cases for Button + Icon usage, when you need to use v0 + v9 versions together.

**Usage with v9 Button:**

**Usage with v0 Button:**

For usage v9 Icon with v0 Button it's required to add additional styles to keep similar behaviour:

**v0 Icon + v9 Button:**

Live example is here: [https://codesandbox.io/s/button-icon-migration-lkt6o5?file=/example.tsx](https://codesandbox.io/s/button-icon-migration-lkt6o5?file=/example.tsx)

### Migrate `loading` and `loader` props

Props `loading` and `loader` were removed. To replace old functionality can be used this method:

Before:

After:
