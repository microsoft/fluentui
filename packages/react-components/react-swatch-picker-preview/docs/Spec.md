# @fluentui/react-swatch-picker-preview Spec

## Background

A SwatchPicker is used in graphic and text editors.
It displays color, image and pattern options as a row or a grid.

The SwatchPicker can be integrated within a popover or used as a standalone feature.

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
      <div id={`${baseId}-circle`}>Simple circle swatch color picker</div>
      <SwatchColorPicker
        columnCount={5}
        cellShape={'circle'}
        colorCells={colorCellsExample1}
        aria-labelledby={`${baseId}-circle`}
      />
      <div id={`${baseId}-square`}>Simple square swatch color picker</div>
      <SwatchColorPicker
        columnCount={5}
        cellShape={'square'}
        colorCells={colorCellsExample1}
        aria-labelledby={`${baseId}-square`}
      />
      <div id={`${baseId}-custom-size`}>Simple square swatch color picker</div>
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
<SwatchPicker aria-label="Font color" columnCount={3}>
  <ColorSwatch swatch="red" />
  <ColorSwatch swatch="rgb(189, 255, 104)" />
  <ColorSwatch swatch="#f09" />
  <ColorSwatch swatch="#ad5" />
  <ColorSwatch swatch="magenta" />
  <ImageSwatch swatch="./path/image.png" />
  <ImageSwatch swatch="./path/image1.png" />
  <ImageSwatch swatch="./path/image2.png" />
  <ImageSwatch swatch="./path/image3.png" />
</SwatchPicker>
```

## Variants

### Layout variants

- Grid
- Row

For the grid layout maximum recommended amount of swatches is 64 - 8x8 grid.
For the row layout it's 8 swatches.

To use grid layout it should be more than 4 swatches.

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

### Density/Gap/Spacing

- `small`: 2px
- `medium` (default): 4px

### States

- `rest`
- `hover`
- `selected`
- `focused`
- `pressed`
- `disabled`
- `empty`

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

![visual anatomy of the SwatchPicker component](./assets/swatch-picker-base.jpg)

#### DOM

```HTML
<div role="grid" aria-label="Color grid">
  {children}
</div>
```

#### ColorPicker structure

- root `div` element

#### API

| Property | Values                                   | Default  | Purpose                             |
| -------- | ---------------------------------------- | -------- | ----------------------------------- |
| layout   | `row`, `grid`                            | `grid`   | Sets layout of the SwatchPicker     |
| shape    | `square`, `circular`, `rounded`          | `square` | Sets shape                          |
| size     | `extraSmall`, `small`, `medium`, `large` | `medium` | Defines size of the Swatch cell     |
| spacing  | `small`, `medium`                        | `medium` | Sets spacing between rows and cells |

## ColorSwatch component

is used for picking colors:

- solid color
- gradient

#### Anatomy

![visual anatomy of the ColorSwatch component](./assets/todo.png)

#### DOM

```HTML
<button role="gridcell" aria-selected="true" style="--fui-SwatchPicker--color: #ff0099;">
  {icon}
</button>
<button role="gridcell" aria-selected="false">
  {icon}
</button>
```

#### ColorSwatch structure

- root `button` element
- icon slot

#### API

| Property     | Values                                   | Default  | Purpose                         |
| ------------ | ---------------------------------------- | -------- | ------------------------------- |
| shape        | `square`, `circular`, `rounded`          | `square` | Sets shape                      |
| size         | `extraSmall`, `small`, `medium`, `large` | `medium` | Defines size of the Swatch cell |
| swatch/value |                                          |          | Sets color id                   |
| disabled     | boolean                                  |          |                                 |
| selected     | boolean                                  |          |                                 |
| empty        | boolean                                  |          |                                 |

## ImageSwatch component

is used to pick images:

- image
- texture
- pattern

#### Anatomy

![visual anatomy of the SwatchPicker component](./assets/todo.png)

#### DOM

```HTML
<span name="swatch" value="{color-id}">
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

=======

## Background

_Description and use cases of this component_

## Prior Art

_Include background research done for this component_

- _Link to Open UI research_
- _Link to comparison of v7 and v0_
- _Link to GitHub epic issue for the converged component_

## Sample Code

_Provide some representative example code that uses the proposed API for the component_

## Variants

_Describe visual or functional variants of this control, if applicable. For example, a slider could have a 2D variant._

## API

_List the **Props** and **Slots** proposed for the component. Ideally this would just be a link to the component's `.types.ts` file_

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

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

SwatchPicker should have an `aria-label` same as `ColorSwatch` element. All the swathces should have `aria-selected=false` except the selected swatch.
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
