# @fluentui/react-swatch-picker

**React Swatch Picker components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

The SwatchPicker is used in graphic and text editors. It allows user to choose a needed color, image or pattern.
The SwatchPicker can be integrated within a popover or used as a standalone feature.

## Usage

To import React SwatchPicker components:

```tsx
import { SwatchPicker, ColorSwatch, SwatchPickerOnSelectEventHandler } from '@fluentui/react-components';
```

Simple example of SwatchPicker Usage:

```tsx
import { SwatchPicker, ColorSwatch, SwatchPickerOnSelectEventHandler } from '@fluentui/react-components';

export const App = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedColor);
  };

  return (
    <>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
        <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" />
        <ColorSwatch color="#FEFF37" value="FEFF37" aria-label="yellow" />
        <ColorSwatch disabled color="#90D057" value="90D057" aria-label="light green" />
        <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
        <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" />
        <ColorSwatch color="#006EBD" value="006EBD" aria-label="blue" />
        <ColorSwatch color="#011F5E" value="011F5E" aria-label="dark blue" />
        <ColorSwatch color="#712F9E" value="712F9E" aria-label="purple" />
      </SwatchPicker>

      <div
        style={{
          backgroundColor: selectedColor,
        }}
      />
    </>
  );
};
```

## Specification

See the [Spec.md](./docs/Spec.md) file for background information on the design/engineering decisions of the component.

## API

For information about the components, please refer to the [API documentation](https://react.fluentui.dev/?path=/docs/preview-components-swatchpicker--default).
