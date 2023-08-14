# @fluentui/react-swatch-color-picker Spec

## Background TODO - description from V8

A swatch color picker (SwatchColorPicker) displays color options as a grid. It can be shown by itself, with a header and dividers, or as a button that expands to show the swatch color picker.

### Fabric (v8)

```jsx
import { IColorCellProps, SwatchColorPicker } from '@fluentui/react/lib/SwatchColorPicker';

const colorCellsExample1 = [
  { id: 'a', label: 'orange', color: '#ca5010' },
  { id: 'b', label: 'cyan', color: '#038387' },
  { id: 'c', label: 'blueMagenta', color: '#8764b8' },
  { id: 'd', label: 'magenta', color: '#881798' },
  { id: 'e', label: 'white', color: '#ffffff' },
];

export const SwatchColorPickerBasicExample: React.FunctionComponent = () => {
  const [previewColor, setPreviewColor] = React.useState<string>();
  const baseId = useId('colorpicker');

  const swatchColorPickerOnCellHovered = (id: string, color: string) => {
    setPreviewColor(color!);
  };

  return (
    <>
      <div id={`${baseId}-circle`}>Simple circle swatch color picker:</div>
      <SwatchColorPicker
        columnCount={5}
        cellShape={'circle'}
        colorCells={colorCellsExample1}
        aria-labelledby={`${baseId}-circle`}
      />
      <div id={`${baseId}-square`}>Simple square swatch color picker with default size of 20px:</div>
      <SwatchColorPicker
        columnCount={5}
        cellShape={'square'}
        colorCells={colorCellsExample1}
        aria-labelledby={`${baseId}-square`}
      />
      <div id={`${baseId}-custom-size`}>Simple square swatch color picker with custom size of 35px:</div>
      <SwatchColorPicker
        columnCount={5}
        cellHeight={35}
        cellWidth={35}
        cellShape={'square'}
        colorCells={colorCellsExample1}
        aria-labelledby={`${baseId}-custom-size`}
      />
    </>
  );
};
```

## Prior Art

- [Open UI research](https://open-ui.org/components/) TODO - add OpenUI research
- [Convergence epic](https://github.com/microsoft/fluentui/issues/28606)

### Components TODO

| Purpose                                                      | Fabric (V8)         | V9                         | Matching? |
| ------------------------------------------------------------ | ------------------- | -------------------------- | --------- |
| Component responsible for rendering swatches as row and grid | SwatchColorPicker   | SwatchPicker / SwatchGroup | ⚠️        |
| Color cell                                                   | ColorPickerGridCell | ColorSwatch                | ⚠️        |
| Image cell                                                   |                     | ImageSwatch                | ❌        |

## Sample Code

_Provide some representative example code that uses the proposed API for the component_

## Variants

### Swatch Variants

- Color
- Gradient
- Image
- Pattern / texture
- Custom (needs discussion)

### Shapes

- Square - default
- Circular
- Rounded

### Sizes

Custom size can be set via CSS using `width` and `height` props.

#### Swatch Size

- Small - 24px
- Medium - default - 30px
- Large - TODO

#### Density

- Small - 24px
- Medium - default - 30px
- Large - TODO

## API

## Structure

### Components

| Component                   | Purpose                                                |
| --------------------------- | ------------------------------------------------------ |
| SwatchGroup or SwatchPicker | Group which can represent swatches as a row or a grid. |
| ColorSwatch                 | Swatch for color                                       |
| ImageSatch                  | Swatch for image/texture/pattern                       |

Swatches are split on two as Color and Image for JSX composition.

## SwatchGroup/SwatchPicker

## ColorSwatch

is used for picking colors:

- solid color
- gradient

## ImageSwatch

is used to pick images:

- image
- texture
- pattern

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
