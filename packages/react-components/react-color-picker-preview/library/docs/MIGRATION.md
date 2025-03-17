## ColorPicker Migration

## ColorPicker component

### Fabric (v8) property mapping

#### New props

- `shape`

#### Supported Props

- `color`

#### Props no longer supported with an equivalent functionality in ColorPicker V9:

- `className` => Slot system supports it by default. We don't need to provide it explicitly.
- `onChange` => Use `onColorChange` instead.
- `styles` => Use style customization through `className` instead.
- `theme`

#### Props no longer supported

- `alphaType`
- `componentRef`
- `showPreview`
- `strings`
- `tooltipProps`

#### ColorArea component

#### New props

- `defaultColor`
- `shape`
- `onChange`

#### Props supported

- `color`

#### ColorSlider component

#### New props

- `channel`
- `defaultColor`
- `shape`
- `vertical`

#### Props supported

- `onChange`

#### Props no longer supported with an equivalent functionality in ColorPicker V9:

- `value` => Use `color` instead
- `type` => in case of support channels it'll be `channel` instead
- `isAlpha` => use `AlphaSlider` component instead
- `overlayColor` => part of `AlphaSlider` component
- `thumbColor` => is calculated automatically or can be customized via CSS

#### Props no longer supported

- `minValue`
- `maxValue`

#### Property Mapping

| v8 `ColorPicker` | v9 `ColorPicker`           |
| ---------------- | -------------------------- |
| `value`          | `color`                    |
| `onChange`       | `onColorChange`            |
| `maxValue`       |                            |
| `minValue`       |                            |
| `type`           |                            |
| `isAlpha`        | `AlphaSlider` component    |
| `overlayColor`   | In `AlphaSlider` component |
| `thumbColor`     |                            |
|                  | `shape`                    |
