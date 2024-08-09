# @fluentui/react-color-picker-preview Spec

## Background

The ColorPicker is used to browse through and select colors.
By default, it lets people navigate through colors on a color spectrum; or specify a color in either Red-Green-Blue (RGB); or alpha color code; or Hexadecimal textboxes.

## Prior Art

- [Convergence epic](https://github.com/microsoft/fluentui/issues/31778)

### Fabric (v8)

```jsx
import * as React from 'react';
import {
  ColorPicker,
  ChoiceGroup,
  IChoiceGroupOption,
  getColorFromString,
  IColor,
  IColorPickerStyles,
  IColorPickerProps,
} from '@fluentui/react';

const white = getColorFromString('#ffffff')!;

const ColorPickerBasicExample: React.FunctionComponent = () => {
  const [color, setColor] = React.useState(white);
  const [showPreview, setShowPreview] = React.useState(true);
  const [alphaType, setAlphaType] = React.useState<IColorPickerProps['alphaType']>('alpha');

  const updateColor = React.useCallback((ev: any, colorObj: IColor) => setColor(colorObj), []);

  return (
    <>
      <ColorPicker
        color={color}
        onChange={updateColor}
        alphaType={alphaType}
        showPreview={showPreview}
        styles={colorPickerStyles}
        strings={{
          hueAriaLabel: 'Hue',
        }}
      />
    </>
  );
};
```

### 3rd party Design Systems

- Adobe Spectrum
  - [ColorPicker](https://react-spectrum.adobe.com/react-spectrum/ColorPicker.html)
  - [ColorArea](https://react-spectrum.adobe.com/react-spectrum/ColorArea.html)
  - [ColorSlider](https://react-spectrum.adobe.com/react-spectrum/ColorSlider.html)

### Components

| Purpose                                                                  | Fabric (V8)    | V9          | Matching? |
| ------------------------------------------------------------------------ | -------------- | ----------- | --------- |
| Component responsible for color editing using ColorArea and ColorSliders | ColorPicker    | ColorPicker | ⚠️        |
| ColorArea allows user to pick a color using two channels                 | ColorRectangle | ColorArea   | ⚠️        |
| ColorSlider allows user to pick a color using individual channel         | ColorSlier     | ColorSlider | ⚠️        |

## Sample Code

```jsx
import * as React from 'react';
import {
  ColorPicker,
  ColorArea,
  ColorSliderProps,
  AlphaSlider,
  HueSlider,
  ColorPickerOnSelectEventHandler,
} from '@fluentui/react-color-picker-preview';
import { tinycolor } from '@ctrl/tinycolor';
export const Default = () => {
  const COLOR = 'rgba(0, 255, 170, 1)';
  const [selectedColor, setSelectedColor] = React.useState(COLOR);
  const [overlayColor, setOverlayColor] = React.useState(COLOR);
  const [alpha, setAlpha] = React.useState(1);
  const [hueValue, setHueValue] = React.useState(160);
  const hslColor = tinycolor(selectedColor).toHsl();
  const handleChange: ColorPickerOnSelectEventHandler = (_, data) => {
    data.alpha && setAlpha(data.alpha);
    data.hue && setHueValue(data.hue);
  };

  React.useEffect(() => {
    const newColor = tinycolor({ h: hueValue, s: hslColor.s, l: hslColor.l, a: alpha }).toRgbString();
    setSelectedColor(newColor);
    setOverlayColor(tinycolor({ h: hueValue, s: hslColor.s, l: hslColor.l }).toRgbString());
  }, [alpha, hueValue, overlayColor, hslColor]);

  return (
    <>
      <ColorPicker color={selectedColor} onChange={handleChange}>
        <AlphaSlider />
        <HueSlider />
      </ColorPicker>
      <div style={{ backgroundColor: `${selectedColor}` }} />
    </>
  );
};
```

## Variants

### Slider variants

- horizontal (default)
- vertical

ColorSliders might represent different color channels.

### Shapes

- `square` (default)
- `rounded`

### Size

Size will be the same as in Office products.
For custom sizes users might want to customize it via CSS.

## API

### ColorPicker

| Property | Values              | Default   | Purpose                                |
| -------- | ------------------- | --------- | -------------------------------------- |
| color    | `string`            |           | Sets color value                       |
| onChange | `function`          | undefined | Callback called when color is selected |
| shape    | `square`, `rounded` | `square`  | Sets shape                             |

Color values will be in `renderUtils`. It will contain default ColorPicker which has all colors represented and a preview swatch.

| Slots | Values | Default | Description                 |
| ----- | ------ | ------- | --------------------------- |
| root  | `div`  | `div`   | The root of the ColorPicker |

### ColorArea

| Property | Values              | Default   | Purpose                                |
| -------- | ------------------- | --------- | -------------------------------------- |
| shape    | `square`, `rounded` | `square`  | Sets shape                             |
| onChange | `function`          | undefined | Callback called when color is selected |
| valueX   | `string`            |           | value of the slider on X axis          |
| valueY   | `string`            |           | value of the slider on Y axis          |

| Slots   | Values   | Default | Description                                                         |
| ------- | -------- | ------- | ------------------------------------------------------------------- |
| root    | `div`    | `div`   | The root of the ColorArea element                                   |
| thumb   | `div`    | `div`   | The draggable icon used to select a given value from the ColorArea. |
| sliderX | `input`  | `input` | Input for X axis                                                    |
| sliderY | `input`  | `input` | Input for Y axis                                                    |
| step    | `number` | 1       | Step for the slider                                                 |

--- TODO --- I consider splitting COlorSlider on two

### ColorSlider

| Property | Values                   | Default      | Purpose                                |
| -------- | ------------------------ | ------------ | -------------------------------------- |
| shape    | `square`, `rounded`      | `square`     | Sets shape                             |
| value    | `string`                 |              | TODO                                   |
| onChange | `function`               | undefined    | Callback called when color is selected |
| orient   | `horizontal`, `vertical` | `horizontal` | Orientation of a slider                |
| step     | `number`                 | 1            | Step for the slider                    |

| Slots  | Values  | Default | Description                                                      |
| ------ | ------- | ------- | ---------------------------------------------------------------- |
| root   | `div`   | `div`   | The root of the ColorSlider element                              |
| thumb  | `div`   | `div`   | The draggable icon used to select a given value from the Slider. |
| slider | `input` | `input` | Input for slider                                                 |
| rail   | `div`   | `div`   | It is used to visibly display the min and max selectable values. |

--- end of TODO ---

### HueSlider

| Property | Values                   | Default      | Purpose                                |
| -------- | ------------------------ | ------------ | -------------------------------------- |
| shape    | `square`, `rounded`      | `square`     | Sets shape                             |
| value    | `string`                 |              | value of the slider                    |
| onChange | `function`               | undefined    | Callback called when color is selected |
| orient   | `horizontal`, `vertical` | `horizontal` | Orientation of a slider                |
| max      | `number`                 | 360          | The max value of the Slider.           |
| min      | `number`                 | 0            | The min value of the Slider.           |
| color    | `string`                 | undefuned    | Color of the rail                      |
| step     | `number`                 | 1            | Step for the slider                    |

| Slots  | Values  | Default | Description                                                      |
| ------ | ------- | ------- | ---------------------------------------------------------------- |
| root   | `div`   | `div`   | The root of the HueSlider element                                |
| thumb  | `div`   | `div`   | The draggable icon used to select a given value from the Slider. |
| slider | `input` | `input` | Input for slider                                                 |
| rail   | `div`   | `div`   | It is used to visibly display the min and max selectable values. |

### AlphaSlider

| Property     | Values                   | Default      | Purpose                                |
| ------------ | ------------------------ | ------------ | -------------------------------------- |
| shape        | `square`, `rounded`      | `square`     | Sets shape                             |
| value        | `string`                 |              | value of the slider                    |
| onChange     | `function`               | undefined    | Callback called when color is selected |
| orient       | `horizontal`, `vertical` | `horizontal` | Orientation of a slider                |
| max          | `number`                 | 360          | The max value of the Slider.           |
| min          | `number`                 | 0            | The min value of the Slider.           |
| overlayColor | `string`                 | undefuned    | Overlay color                          |
| step         | `number`                 | 1            | Step for the slider                    |

| Slots  | Values  | Default | Description                                                      |
| ------ | ------- | ------- | ---------------------------------------------------------------- |
| root   | `div`   | `div`   | The root of the AlphaSlider element                              |
| thumb  | `div`   | `div`   | The draggable icon used to select a given value from the Slider. |
| slider | `input` | `input` | Input for slider                                                 |
| rail   | `div`   | `div`   | It is used to visibly display the min and max selectable values. |

## Structure

### Components

| Component   | Purpose                                                           |
| ----------- | ----------------------------------------------------------------- |
| ColorPicker | Renders ColorPicker                                               |
| ColorArea   | Renders two-dimensional gradient background.                      |
| ColorSlider | Renders individual color channel - TODO - probably would be split |
| HueSlider   | Renders slider with hue channel                                   |
| AlphaSlider | Renders slider with alpha channel                                 |

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Use `tab` key to navigate between ColorArea and Color sliders. Use arrows keys to select a color.
Use `role="group"` for root component of ColorSlider and ColorArea.
Use role `presentation` for color thumb.
Use role `slider` for Slider component and X/Y inputs in ColorArea.

--- TODO - clean up this part ---
Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)

### Mouse

On `click` color is selected and color thumb is moved to the selected position. Color thumb should represent selected color.

States:

1. Rest
2. Focus

   TODO - what should be read by a screen reader.

3. OnClick

   Color is selected.

### Keyboard Navigation

In a `horizontal` orientation top/right arrows move to the right, bottom/left arrows move to the left.

| Key                  | Result                                                         |
| -------------------- | -------------------------------------------------------------- |
| Arrows               | Color thumb is focused. Color is selected                      |
| `Home/End/PgUp/PgDn` | Can be used another configuration for the step to move faster. |
| `Tab`                | Navigation between color sliders and Color Area                |
