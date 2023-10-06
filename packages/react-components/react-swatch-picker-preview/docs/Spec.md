# @fluentui/react-swatch-picker-preview Spec

## Background TODO - description from V8

A SwatchPicker displays color, image and pattern options as a grid. It can be shown by itself, with a header and dividers, or as a button that expands to show the SwatchPicker.

## Prior Art

- [Convergence epic](https://github.com/microsoft/fluentui/issues/28606)

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

### 3rd party Design Systems

- Adobe Spectrum
  - [SwatchGroup](https://spectrum.adobe.com/page/swatch-group/)
  - [Swatch](https://spectrum.adobe.com/page/swatch/)

### Components

| Purpose                                                      | Fabric (V8)         | V9           | Matching? |
| ------------------------------------------------------------ | ------------------- | ------------ | --------- |
| Component responsible for rendering swatches as row and grid | SwatchColorPicker   | SwatchPicker | ⚠️        |
| Color cell                                                   | ColorPickerGridCell | ColorSwatch  | ⚠️        |
| Image cell                                                   |                     | ImageSwatch  | ❌        |

## Sample Code

```jsx
<SwatchPicker
  layout="grid"
  swatch={color}
  onChange={(\_, data) => setSwatch(data.value)}
  aria-labelledby="colors"
  name="color"
  style={{ gridTemplateColumns: `repeat(4, 30px)` }} >
    <ColorSwatch id={0} swatch="red" />
    <ColorSwatch id={1} swatch="rgb(189, 255, 104)" />
    <ColorSwatch id={2} swatch="#f09" />
    <ColorSwatch id={3} swatch="#ad5" />
    <ColorSwatch id={4} swatch="magenta" />
    <ImageSwatch id={5} swatch="./path/image.png"/>
    <ImageSwatch id={6} swatch="./path/image1.png"/>
    <ImageSwatch id={7} swatch="./path/image2.png"/>
    <ImageSwatch id={8} swatch="./path/image3.png"/>
</SwatchPicker>
```

## Variants

### Layout variants

- Grid
- Row

Grid starts from 4 swatches.
SwatchPiker is responsive by default.
Grid spacing can be customized using CSS `grid-template` props.

### Swatch Variants

- Color
- Gradient
- Image
- Pattern / texture

### Shapes

- `square` (default)
- `circular`
- `rounded`

Border radius for rounded shape can be customized via CSS.

### Size

- `extraSmall`: 20px
- `small`: 24px
- `medium` (default): 28px
- `large`: 32px

Custom size can be set by overriding `width` and `height` of the ColorSwatch or ImageSwatch.

### Density/Gap

Gap is 2px by default.
Horizontal and vertical density can be changed via CSS.

### States

- `hover`
- `selected`
- `focused`
- `pressed`

## API

## Structure

### Components

| Component    | Purpose                                                |
| ------------ | ------------------------------------------------------ |
| SwatchPicker | Group which can represent swatches as a row or a grid. |
| ColorSwatch  | Swatch for a color                                     |
| ImageSwatch  | Swatch for an image, texture or a pattern              |

## SwatchPicker component

#### Anatomy

![visual anatomy of the SwatchPicker component](./assets/todo.png)

#### DOM

```HTML
<div role="radiogroup" aria-labelledby="colors">
  {children}
</div>
```

#### ColorPicker structure

- root `div` element

#### API

| Property | Values                                   | Default  | Purpose                         |
| -------- | ---------------------------------------- | -------- | ------------------------------- |
| shape    | `square`, `circular`, `rounded`          | `square` | Sets shape                      |
| size     | `extraSmall`, `small`, `medium`, `large` | `medium` | Defines size of the Swatch cell |
| id       | number                                   |          | Sets swatch id                  |
| layout   | `row`, `grid`                            | `grid`   | Sets layout of the SwatchPicker |
| onChange |                                          |          |                                 |

## ColorSwatch component

is used for picking colors:

- solid color
- gradient

#### Anatomy

![visual anatomy of the SwatchPicker component](./assets/todo.png)

#### DOM

```HTML
<span name="color" value="{color-id}" style="background: red;">
  <input type="radio" id="{color-id}" name="color" value="red">
</span>
<span name="color" value="{color-id}" style="background: rgb(189, 255, 104);">
  <input type="radio" id="{color-id}" name="color" value="{color-id}">
</span>
```

#### ColorSwatch structure

- root `span` element
- `input` element

#### API

| Property | Values                                   | Default  | Purpose                         |
| -------- | ---------------------------------------- | -------- | ------------------------------- |
| shape    | `square`, `circular`, `rounded`          | `square` | Sets shape                      |
| size     | `extraSmall`, `small`, `medium`, `large` | `medium` | Defines size of the Swatch cell |
| id       | number                                   |          | Sets swatch id                  |
| name     |                                          |          | Sets color id                   |
| swatch   |                                          |          | Sets color id                   |
| disabled | boolean                                  |          |                                 |
| selected | boolean                                  |          |                                 |

## ImageSwatch component

is used to pick images:

- image
- texture
- pattern

#### Anatomy

![visual anatomy of the SwatchPicker component](./assets/todo.png)

#### DOM

```HTML
<span name="swatch" value="{color-id}" style="background-image: url(path/image.png);">
  <input type="radio" id="{color-id}" name="swatch" value="{color-id}">
</span>
```

#### ColorSwatch structure:

- root `span` element
- `input` element

#### API

| Property | Values                                   | Default  | Purpose                         |
| -------- | ---------------------------------------- | -------- | ------------------------------- |
| shape    | `square`, `circular`, `rounded`          | `square` | Sets shape                      |
| size     | `extraSmall`, `small`, `medium`, `large` | `medium` | Defines size of the Swatch cell |
| id       | number                                   |          | Sets swatch id                  |
| name     |                                          |          |                                 |
| disabled | boolean                                  |          |                                 |
| selected | boolean                                  |          |                                 |

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

## Behaviors

Selected color returns colorId. Keyboard avigation is done by arrow keys.

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
