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
<SwatchPicker aria-label="Font color" layout="grid" columnCount={3}>
  <ColorSwatch swatch="#FF1921" aria-label="Red" />
  <ColorSwatch swatch="#FFC12E" aria-label="Orange" />
  <ColorSwatch swatch="#FEFF37" aria-label="Yellow" />
  <ColorSwatch swatch="#00B053" aria-label="Green" />
  <ColorSwatch swatch="#00AFED" aria-label="Light Blue" />
  <ColorSwatch swatch="#006EBD" aria-label="Blue" />
  <ColorSwatch swatch="#712F9E" aria-label="Purple" />
  <ImageSwatch swatch="./path/image1.png" aria-label="Space craft" />
  <ImageSwatch swatch="./path/image2.png" aria-label="Planets" />
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

### Spacing

- `small`: 2px
- `medium` (default): 4px

### States

- `rest`
- `hover`
- `pressed`
- `selected`
- `selected pressed`
- `selected hover`
- `focused`
- `disabled` - should be used with caution. In case if there are too many disabled swatches it's better to hide them.
- `empty`

## API

### SwatchPicker

| Property | Values                                   | Default  | Purpose                             |
| -------- | ---------------------------------------- | -------- | ----------------------------------- |
| layout   | `row`, `grid`                            | `grid`   | Sets layout of the SwatchPicker     |
| shape    | `square`, `circular`, `rounded`          | `square` | Sets shape                          |
| size     | `extraSmall`, `small`, `medium`, `large` | `medium` | Defines size of the Swatch cell     |
| spacing  | `small`, `medium`                        | `medium` | Sets spacing between rows and cells |

| Slots | Values | Default | Description                  |
| ----- | ------ | ------- | ---------------------------- |
| root  | `div`  | `div`   | The root of the SwatchPicker |

### ColorSwatch

| Property | Values                                   | Default  | Purpose                         |
| -------- | ---------------------------------------- | -------- | ------------------------------- |
| shape    | `square`, `circular`, `rounded`          | `square` | Sets shape                      |
| size     | `extraSmall`, `small`, `medium`, `large` | `medium` | Defines size of the Swatch cell |
| value    |                                          |          | Color in hex or RGB             |
| disabled | boolean                                  |          |                                 |
| selected | boolean                                  |          |                                 |
| empty    | boolean                                  |          |                                 |

| Slots | Values   | Default  | Description                                                 |
| ----- | -------- | -------- | ----------------------------------------------------------- |
| root  | `button` | `button` | The root of the ColorSwatch element                         |
| icon  | `span`   | `span`   | Icon which can be `disabled` icon or custom one as a swatch |

### ImageSwatch

| Property | Values                                   | Default  | Purpose                                             |
| -------- | ---------------------------------------- | -------- | --------------------------------------------------- |
| id       | `number`, `string`                       |          | Sets ID of the swatch to map it to the larger image |
| shape    | `square`, `circular`, `rounded`          | `square` | Sets shape                                          |
| size     | `extraSmall`, `small`, `medium`, `large` | `medium` | Defines size of the Swatch cell                     |
| disabled | boolean                                  |          |                                                     |
| selected | boolean                                  |          |                                                     |
| empty    | boolean                                  |          |                                                     |

| Slots | Values   | Default  | Description                                                 |
| ----- | -------- | -------- | ----------------------------------------------------------- |
| root  | `button` | `button` | The root of the ColorSwatch element                         |
| icon  | `span`   | `span`   | Icon which can be `disabled` icon or custom one as a swatch |

## Structure

### Components

| Component    | Purpose                                                               |
| ------------ | --------------------------------------------------------------------- |
| SwatchPicker | Renders SwatchPicker which can represent swatches as a row or a grid. |
| ColorSwatch  | Swatch for a color or icon                                            |
| ImageSwatch  | Swatch for an image, texture or a pattern                             |

### SwatchPicker component

#### Anatomy

![visual anatomy of the SwatchPicker component](./assets/swatch-picker-base.jpg)

#### DOM

```HTML
<div role="radiogroup" aria-label="Color grid">
  <!-- Content rendered here -->
</div>
```

### ColorSwatch component

is used for picking colors:

- solid color
- gradient

#### Anatomy

![visual anatomy of the ColorSwatch component](./assets/todo.png)

#### DOM

```HTML
<button role="radio" aria-selected="true" style="--fui-SwatchPicker--color: #ff0099" aria-label="Pink"></button>
<button role="radio" aria-selected="false" style="--fui-SwatchPicker--color: #ff0000" aria-label="Yellow"></button>
```

## ImageSwatch component

is used to pick images:

- image
- texture
- pattern

#### Anatomy

![visual anatomy of the SwatchPicker component](./assets/todo.png)

#### DOM

```HTML
<button role="radio" aria-selected="false" style="--fui-SwatchPicker--image: {url}" aria-label="Space"></button>
```

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
