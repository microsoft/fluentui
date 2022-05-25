# Checkbox Migration

## STATUS: WIP

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v0

- `Checkbox`
  - `checked` => `checked`.
  - `defaultChecked` => `defaultChecked`.
  - `disabled` => `disabled`.
  - `indicator` => `icon`.
  - `label` => `label`.
  - `labelPosition` => `labelPosition`.
  - `onChange` => `onChange`.
  - `onClick` => Consider using `onChange`.
  - `toggle` => Toggle checkbox is not supported in vNext.

## Migration from v8

- `Checkbox`
  - `boxSide` => `labelPosition`.
  - `checked`, `indeterminate` => `checked`.
  - `checkmarkIconProps` => `icon`.
  - `componentRef` => Not supported.
  - `defaultChecked`, `defaultIndeterminate` => `defaultChecked`.
  - `disabled` => `disabled`.
  - `id` => `rootId`.
  - `label` => `label`.
  - `name` => Not supported.
  - `onChange` => `onChange`.
  - `onRenderLabel` => Not supported.
  - `required` => `required`.
  - `title` => Not supported.
