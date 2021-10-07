# Label Migration

## STATUS: WIP

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

- `Label`
  - `componentRef` => Not supported.
  - `disabled` => `disabled`.
  - `required` => `required`.

## Migration from v0

The converged API does not support many of the features offered in v0. Some could potentially by addressed by already made slots or by adding either the additional features or more slots if needed.

- `Label`
  - `circular` => Not supported. Consider using `Badge` component.
  - `color` => Not supported. Consider using `Badge` component.
  - `content` => The child of `Label`.
  - `design` => Not applicable.
  - `fluid` => Not supported. Use CSS styling such as flex-grow.
  - `icon`, `iconPosition` => Not supported. Consider using `Badge` component or add as a child.
  - `image`, `imagePosition` => Not supported. Add as a child.
