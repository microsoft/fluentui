# SwatchPicker Migration

## SwatchPicker component

### Fabric (v8) property mapping

#### New props

- `layout`
- `size`

#### Props no longer supported with an equivalent functionality in SwatchPicker V9:

- `colorCells ` => Use `children` prop instead.
- `cellBorderWidth` - customizable via CSS.
- `cellHeight`, `cellWidth` and `width` - use `size` prop instead. For custom size use CSS.
- `cellMargin` - use `spacing` instead.
- `cellShape` - use `shape` instead.
- `className` => Slot system supports it by default. We don't need to provide it explicitly.
- `onChange` => use `onSelectionChange` instead.
- `styles` => Use style customization through `className` instead.
- `theme`
- `defaultSelectedId` => use `defaultSelectedValue` instead
- `selectedId` => use `selectedValue` instead
- `columnCount` => use `renderingUtils` instead, this prop is suported there.

#### Props no longer supported

- `ariaPosInSet`
- `ariaSetSize`
- `disabled`
- `doNotContainWithinFocusZone`
- `focusOnHover`
- `getColorGridCellStyles`
- `mouseLeaveParentSelector`
- `onCellFocused`
- `onCellHovered`
- `onRenderColorCell` => Custom render function for the color cell. This can replace the entire button element, including the default focus and hover states.
- `onRenderColorCellContent` => Custom render function for inner content of the color cell. This will retain the cell's default button behavior and overrides just the inner content.
- `shouldFocusCircularNavigate`

#### Property Mapping

| v8 `SwatchColorPicker` | v9 `SwatchPicker`   |
| ---------------------- | ------------------- |
| `colorCells`           | `children`          |
| `cellMargin`           | `spacing`           |
| `cellShape`            | `shape`             |
| `onChange`             | `onSelectionChange` |

#### ColorSwatch component

#### New props

- `borderColor`
- `size`
- `shape`

#### Props supported

- `color`
- `disabled`

#### Props no longer supported with an equivalent functionality in SwatchPicker V9:

- `id ` => Use `value` prop instead.
- `label` => Use `aria-label` instead.

#### Props no longer supported

- `index`

#### Property Mapping

| v8 `SwatchColorPicker` | v9 `SwatchPicker` |
| ---------------------- | ----------------- |
| `color`                | `color`           |
| `disabled`             | `disabled`        |
| `id`                   | `value`           |
| `size`                 |                   |
| `shape `               |                   |
