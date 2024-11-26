## ColorPicker Migration

## ColorPicker component

### Fabric (v8) property mapping

#### New props

- `customStep`
- `shape`
- `step`

#### Supported Props

- `color`
- `onChange`

#### Props no longer supported with an equivalent functionality in ColorPicker V9:

- `className` => Slot system supports it by default. We don't need to provide it explicitly.
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

- `customStep`
- `shape`
- `step`
- `valueX`
- `valueY`

#### Props supported

- `color`

#### ColorSlider component

#### New props

- `customStep`
- `shape`
- `orient`
- `step`

#### Props supported

- `value`
- `onChange`

#### Props no longer supported with an equivalent functionality in ColorPicker V9:

- `minValue` => Use `min` instead
- `maxValue` => Use `max` instead
- `type` => in case of support channels it'll be `channel` instead
- `isAlpha` => use `AlphaSlider` component instead
- `overlayColor` => part of `AlphaSlider` component
- `thumbColor` => is calculated automatically or can be customized via CSS

#### Property Mapping

| v8 `ColorPicker` | v9 `ColorPicker`           |
| ---------------- | -------------------------- |
| `value`          | `value`                    |
| `onChange`       | `onChange`                 |
| `maxValue`       | `max`                      |
| `minValue`       | `min`                      |
| `shape `         |                            |
| `type`           | `channel`                  |
| `isAlpha`        | `AlphaSlider` component    |
| `overlayColor`   | In `AlphaSlider` component |
| `thumbColor`     |                            |
|                  | `customStep`               |
|                  | `shape`                    |
|                  | `orient`                   |
|                  | `step`                     |
