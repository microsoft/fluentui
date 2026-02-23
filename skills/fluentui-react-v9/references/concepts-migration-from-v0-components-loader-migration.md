# Loader component Migration guide

`Loader` component is replaced by `Spinner` component in V9.

## Overview:

Before:

After:

The `Spinner` in V9 looks slightly different than the `Loader` in V0 but it is expected.

## How to migrate props:

| Loader props              | migrate guide                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessibility             | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs)                                                 |
| as, className             | keep it as is                                                                                                                                            |
| variables, styles, design | see [Migrate style overrides](#migrate-style-overrides) in this document                                                                                 |
| delay                     | not supported                                                                                                                                            |
| indicator                 | not supported                                                                                                                                            |
| inline                    | use mixin `inline`                                                                                                                                       |
| label                     | keep it as is but font styles will be different; use mixin `v0SpinnerLabelStyle` to keep the V0 label font styles. [See example](#./Keep-V0-font-styles) |
| labelPosition             | same prop but different values, see [Migrate labelPosition prop](#./Migrate-labelPosition-props)                                                         |
| secondary                 | change to `appearance` prop with `inverted` value instead                                                                                                |
| size                      | keep it as is                                                                                                                                            |
| svg                       | not supported                                                                                                                                            |

- this may be changed Here is comparison for both versions: [Sandbox](https://codesandbox.io/s/loader-migration-fluentui-forked-xfngje?file=/example.tsx)

---

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:

### Migrate labelPosition props

We change the `labelPosition` values in V9: `start` from V0 is now `before` and `end` from V0 is now `after`.

The default value is also different: In V0 default `labelPosition` is `below` and in V9, the default `labelPosition` is `after`.

Before:

After:

### Keep V0 font styles

The label font style is also different in V9. [Here is a comparison](https://codesandbox.io/s/loader-migration-fluentui-forked-xfngje?file=/loader-examples/loader-with-label.tsx) of the default `Loader`/`Spinner` with a label:

We added mixin to the repo, so you can easily keep the original label font styles.
