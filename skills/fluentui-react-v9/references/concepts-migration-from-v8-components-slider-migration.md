# Slider Migration

Fluent UI V8 provides the `Slider` control to represents an input that allows user to choose a value from within a specific range. Fluent UI v9 provides a `Slider` control with a different API.

## Examples

### Basic Migration

Basic usage of `Slider` V8

An equivalent `Slider` in v9 is

## Props Mapping

## Migration from v8

- `ariaLabel` => use `aria-label` instead
- `ariaValueText` => explicitly set `aria-valuetext`
- `buttonProps` => Slider props, other than className and id, are passed to `input` element
- `componentRef` => use `ref` instead.
- `inline` => use css, or wrap in flex parent
- `label` => Use `Label` control with `htmlFor` and `id`
- `onChanged` => use onChange and onMouse events
- `origin` => no longer supported
- `originFromZero` => no longer supported
- `ranged`, `defaultLowerValue` and `lowerValue` => Not supported. Multi value slider will be future work in separate control.
- `showValue` and `valueFormat` => use explicitly rendered value instead
- `snapToStep` => use `step` instead
- `styles` => pass classNames to individual slots
- `theme` => use `FluentProvider` HOC instead

## Property mapping

| v8 `Slider`         | v9 `Slider`      |
| ------------------- | ---------------- |
|                     |                  |
| `ariaLabel`         | `aria-label`     |
| `ariaValueText`     | `aria-valuetext` |
| `buttonProps`       |                  |
| `componentRef`      | `ref`            |
| `defaultLowerValue` |                  |
| `inline`            |                  |
| `input`             | `input`          |
| `label`             |                  |
| `lowerValue`        |                  |
| `onChanged`         | `onChange`       |
| `origin`            |                  |
| `originFromZero`    |                  |
| `ranged`            |                  |
| `showValue`         |                  |
| `snapToStep`        | `step`           |
| `styles`            | `className`      |
| `theme`             |                  |
| `valueFormat`       |                  |
