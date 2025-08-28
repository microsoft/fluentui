# @fluentui/react-color-picker

**React Color Picker components for [Fluent UI React](https://react.fluentui.dev/)**

The ColorPicker allows users to browse and select colors.
By default, it enables navigation through a color spectrum and operates in HSV/HSL format.
However, it is also possible to specify a color using Red-Green-Blue (RGB), an alpha color code, or hexadecimal values in the text boxes.

## Usage

To import React ColorPicker components:

```tsx
import { ColorPicker, ColorSwatch, type ColorPickerOnSelectEventHandler } from '@fluentui/react-components';
```

Simple example of ColorPicker Usage:

```tsx
import { tinycolor } from '@ctrl/tinycolor';
import { ColorPicker, ColorSlider, AlphaSlider, type ColorPickerProps, ColorArea } from '@fluentui/react-components';

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
