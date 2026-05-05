# Slider component Migration guide

## Overview:

To help with the migration we also offer a mixin that [can be checked here](./?path=/docs/migration-shims-v0-slidermixin--docs)

Before:

After:

More examples: [Sandbox](https://codesandbox.io/s/slider-migration-fluentui-forked-e3zdj5?file=/example.tsx)

Slider upgrade doc in V9: [Slider upgrade to V9](https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-components-slider-migration--docs)

## How to migrate props:

| Slider props                | migrate guide                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| accessibility               | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs) |
| as, className               | keep it as is                                                                                            |
| defaultValue                | keep it as is                                                                                            |
| disabled                    | keep it as is                                                                                            |
| getA11yValueMessageOnChange | create your own message for a11y attr `aria-valuetext` by listening `onChange` and updating state value  |
| fluid                       | use `slider.fluid()` mixin in Slider component's style file                                              |
| input                       | keep it as is                                                                                            |
| max, min                    | keep it as is                                                                                            |
| onChange                    | keep it as is                                                                                            |
| step                        | keep it as is                                                                                            |
| value                       | keep it as is                                                                                            |
| vertical                    | keep it as is                                                                                            |
| variables, styles, design   | see [Migrate style overrides](#migrate-style-overrides) in this document                                 |

Here is comparison for both versions: [Sandbox](https://codesandbox.io/s/slider-migration-fluentui-forked-e3zdj5?file=/example.tsx)

---

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:

Find more examples here: [Sandbox](https://codesandbox.io/s/slider-migration-fluentui-forked-e3zdj5?file=/example.tsx)
