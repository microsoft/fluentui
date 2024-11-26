# @fluentui/react-color-picker-preview

**React Color Picker components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

The ColorPicker is used to browse through and select colors.
By default, it lets people navigate through colors on a color spectrum; or specify a color in either Red-Green-Blue (RGB); or alpha color code; or Hexadecimal textboxes.

## Usage

To import React ColorPicker components:

```tsx
import { ColorPicker, ColorSwatch, ColorPickerOnSelectEventHandler } from '@fluentui/react-components';
```

Simple example of ColorPicker Usage:

```tsx
import { tinycolor } from '@ctrl/tinycolor';
import { ColorPicker, ColorSlider, AlphaSlider, ColorPickerProps, ColorArea } from '@fluentui/react-components';

export const App = () => {
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const handleChange: ColorPickerProps['onColorChange'] = (_, data) =>
    setColor({ ...data.color, a: data.color.a ?? 1 });

  return (
    <>
      <ColorPicker color={color} onColorChange={handleChange}>
        <ColorSlider />
        <AlphaSlider />
        <ColorArea />
      </ColorPicker>

      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
    </>
  );
};
```

## Specification

See the [Spec.md](./docs/Spec.md) file for background information on the design/engineering decisions of the component.

## API

For information about the components, please refer to the API documentation.
