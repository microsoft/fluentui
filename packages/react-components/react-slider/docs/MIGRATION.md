# Slider Migration

The Slider control is a thin wrapper around an `<input type="range"/>`. Additional elements like labels and current value will need to be explicitly rendered.

## Migration from v8

- `ariaLabel` => use `aria-label` instead
- `ariaValueText` => explicitely set `aria-valuetext`
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

## Migration from v0

- `accessibility` => use `aria-*` properties directly on `Slider`
- `fluid` => use css, or wrap in flex parent
- `getA11yValueMessageOnChange` => explicitely set `aria-value-text`
- `input` => Slider props, other than className and id, are passed to `input` element
- `inputRef` => `ref`
- `label` => use explicitly rendered value instead

## Property mapping

| v8 `Slider`         | v0 `Slider`      | v9 `Slider`      |
| ------------------- | ---------------- | ---------------- |
|                     | `accessibility`  |                  |
| `ariaLabel`         | `aria-label`     | `aria-label`     |
| `ariaValueText`     | `aria-valuetext` | `aria-valuetext` |
| `buttonProps`       |                  |                  |
| `componentRef`      | `inputRef`       | `ref`            |
| `defaultLowerValue` |                  |                  |
| `inline`            |                  |                  |
| `input`             |                  | `input`          |
| `label`             | `label`          |                  |
| `lowerValue`        |                  |                  |
| `onChanged`         |                  | `onChange`       |
| `origin`            |                  |                  |
| `originFromZero`    |                  |                  |
| `ranged`            |                  |                  |
| `showValue`         |                  |                  |
| `snapToStep`        |                  | `step`           |
| `styles`            |                  | `className`      |
| `theme`             |                  |                  |
| `valueFormat`       |                  |                  |
