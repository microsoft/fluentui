# ColorPicker Migration

v9 ships a new `ColorPicker` in `@fluentui/react-components` with a revised API. The core type changes from `IColor` to `HSV`, and the event callback is renamed.

## Sub-Component Renames

| v8                  | v9             | Notes                                                       |
| ------------------- | -------------- | ----------------------------------------------------------- |
| `ColorPicker`       | `ColorPicker`  | New package                                                 |
| `ColorRectangle`    | `ColorArea`    | Renamed                                                     |
| `ColorSlider`       | `ColorSlider`  | `type`/`isAlpha` → `channel`; add `AlphaSlider` for alpha   |
| `SwatchColorPicker` | `SwatchPicker` | Separate component — see [swatchpicker.md](swatchpicker.md) |

## Prop Mapping — ColorPicker

| v8                             | v9              | Notes                                    |
| ------------------------------ | --------------- | ---------------------------------------- |
| `color`                        | `color`         | Type changed: `IColor \| string` → `HSV` |
| `onChange`                     | `onColorChange` | Renamed; type changed to `EventHandler`  |
| `alphaType`                    | —               | Use `AlphaSlider` component separately   |
| `alphaSliderHidden`            | —               | Use `AlphaSlider` component separately   |
| `showPreview`                  | —               | Use `ColorSwatch` instead                |
| `hexLabel` / `redLabel` / etc. | —               | Not supported                            |
| `styles`                       | `className`     |                                          |
| `theme`                        | —               | Use `FluentProvider`                     |
| `tooltipProps`                 | —               | Use `Tooltip` component                  |

## Prop Mapping — ColorArea (was ColorRectangle)

| v8         | v9              | Notes                                   |
| ---------- | --------------- | --------------------------------------- |
| `color`    | `color`         | Type changed: `IColor` → `HSV`          |
| `onChange` | `onColorChange` | Renamed; type changed to `EventHandler` |
| `minSize`  | —               | Not supported                           |
| —          | `defaultColor`  | New: default color for uncontrolled use |
| —          | `shape`         | New prop                                |

## Prop Mapping — ColorSlider

| v8         | v9             | Notes                                                                            |
| ---------- | -------------- | -------------------------------------------------------------------------------- |
| `type`     | `channel`      | Values: `"hue"` \| `"saturation"` \| `"brightness"`; for alpha use `AlphaSlider` |
| `color`    | `color`        | Type changed: `IColor` → `HSV`                                                   |
| `isAlpha`  | —              | Use `AlphaSlider` component                                                      |
| `minValue` | —              | Use native `min` prop                                                            |
| `maxValue` | —              | Use native `max` prop                                                            |
| —          | `defaultColor` | New: default color for uncontrolled use                                          |

## Before / After

```tsx
// v8
import { ColorPicker } from '@fluentui/react';
<ColorPicker color={color} onChange={(_, c) => setColor(c)} />;

// v9
import { ColorPicker } from '@fluentui/react-components';
<ColorPicker color={hsv} onColorChange={(_, data) => setHsv(data.color)} />;
```
