# Header Migration

## Overview:

`Header` component is removed. Instead, use `Text` or typography components and specify heading in the `as` property. Typography components are based on the `Text` component, they share the same props but comes with added styles.

Typography components: `Display`, `LargeTitle`, `Title1`, `Title2`, `Title3`, `Headline`, `Subheadline`, `Body`, `Caption`

Before:

After:

Examples using typography components for matching styles:

Before:

After:

## How to migrate props:

| Header props              | migrate guide                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| align                     | keep it as is                                                                                            |
| as                        | keep it as is or specify it as `h1`                                                                      |
| className                 | keep it as is                                                                                            |
| content                   | see Migrate content prop in this document                                                                |
| variables, design, styles | see Migrate style overrides in this document                                                             |
| accessibility             | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |
| color                     | REMOVED: use styles and color tokens to set the color                                                    |
| ref, key                  | keep it as is                                                                                            |

Here is comparison for both versions: [Sandbox](https://codesandbox.io/s/header-text-fluentui-rcy2u4?file=/example.tsx)

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

You can replace certain styles with supported `Text` props in V9. Boolean props: `wrap`, `truncate`, `block`, `italic`, `underline`, `strikethrough`. Other props for font styling: `size`, `font`, `weight`.
