# Label Migration

## STATUS: WIP

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

- `Label`
  - `componentRef` => `componentRef`
  - `disabled` => `disabled`
  - `required` => `required`

## Migration from v0

The converged API does not support many of the features offered in v0. Some could potentially by addressed by already made slots or by adding either the additional features or more slots if needed.

- `Label`
  - `circular` => Not supported
  - `color` => Not supported
  - `content` => The child of `Label`
  - `design` => Not supported
  - `fluid` => Not supported
  - `icon` => Not supported
  - `iconPosition` => Not supported
  - `image` => Not supported
  - `imagePosition` => Not supported
