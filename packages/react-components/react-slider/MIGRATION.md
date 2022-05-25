# Slider Migration

The Slider control is a thin wrapper around an `<input type="range"/>`. Additional elements like labels and current value will need to be explicitly rendered.

## Migration from v8

- `componentRef` => use `ref` instead.
- `styles` => pass classNames to individual slots
- `theme` => use `FluentProvider` HOC instead
- `label` => Use `Label` control with `htmlFor` and `id`
- `inline` => use css, or wrap in flex parent
- `showValue` and `valueFormat` => use explicitly rendered value instead
- `onChanged` => use onChange and onMouse events
- `ranged`, `defaultLowerValue` and `lowerValue` => Not supported. Multi value slider will be future work in separate control.
- `snapToStep` => use `step` instead
- `originFromZero` => `origin`
- `buttonProps` => Slider props, other than className and id, are passed to `input` element
- `ariaLabel` => use `aria-label` instead
- `ariaValueText` => explicitely set `aria-valuetext`

## Migration from v0

- `accessibility` => use `aria-*` properties directly on `Slider`
- `fluid` => use css, or wrap in flex parent
- `inputRef` => `ref`
- `getA11yValueMessageOnChange` => explicitely set `aria-value-text`
- `label` => use explicitly rendered value instead
- `input` => Slider props, other than className and id, are passed to `input` element
