# SwatchColorPicker → SwatchPicker Migration

v8 `SwatchColorPicker` used a `colorCells` array prop. v9 `SwatchPicker` uses declarative `<ColorSwatch>` / `<ImageSwatch>` children and supports image swatches and empty swatch slots out of the box.

## Key Differences

- `colorCells` array → `<ColorSwatch>` children
- `selectedId` → `selectedValue` (uses the `value` prop on each swatch)
- `onChange` signature changed
- Grid layout uses `<SwatchPickerRow>` or the `renderSwatchPickerGrid` utility
- New swatch types: `ImageSwatch` (image-based), `EmptySwatch` (placeholder)

## Component Tree

```tsx
import { SwatchPicker, SwatchPickerRow, ColorSwatch, ImageSwatch, EmptySwatch } from '@fluentui/react-components';
```

| v9 Component      | Purpose                               |
| ----------------- | ------------------------------------- |
| `SwatchPicker`    | Container; handles selection state    |
| `SwatchPickerRow` | Optional row wrapper for grid layout  |
| `ColorSwatch`     | Single color swatch                   |
| `ImageSwatch`     | Image-based swatch (no v8 equivalent) |
| `EmptySwatch`     | Transparent/no-color placeholder      |

## Prop Mapping — SwatchColorPicker → SwatchPicker

| v8                         | v9                                 | Notes                                                        |
| -------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| `colorCells`               | `<ColorSwatch>` children           | Render one `<ColorSwatch value={id} color={color}>` per cell |
| `selectedId`               | `selectedValue`                    | Must match the `value` prop on a `<ColorSwatch>`             |
| `defaultSelectedId`        | `defaultSelectedValue`             |                                                              |
| `onChange`                 | `onSelectionChange`                | `(ev, data: { selectedValue, selectedSwatch }) => void`      |
| `columnCount`              | `<SwatchPickerRow>` children count | Layout is CSS-driven; use rows and CSS grid                  |
| `cellHeight` / `cellWidth` | `size` on swatch                   | `"extra-small"` \| `"small"` \| `"medium"` \| `"large"`      |
| `cellShape`                | `shape`                            | `"circular"` \| `"rounded"` \| `"square"`                    |
| `disabled`                 | `disabled`                         |                                                              |
| `isControlled`             | Use `selectedValue`                | Pass `selectedValue` for controlled mode                     |
| `styles`                   | `className`                        | Use `makeStyles`                                             |
| `theme`                    | —                                  | Use `FluentProvider`                                         |

## Before / After

### Before

```tsx
import { SwatchColorPicker } from '@fluentui/react';

<SwatchColorPicker
  columnCount={4}
  selectedId={selected}
  onChange={(_, item) => setSelected(item?.id ?? '')}
  colorCells={[
    { id: 'red', label: 'Red', color: '#d13438' },
    { id: 'blue', label: 'Blue', color: '#0078d4' },
    { id: 'green', label: 'Green', color: '#107c10' },
    { id: 'yellow', label: 'Yellow', color: '#fce100' },
  ]}
/>;
```

### After

```tsx
import { SwatchPicker, SwatchPickerRow, ColorSwatch } from '@fluentui/react-components';

<SwatchPicker selectedValue={selected} onSelectionChange={(_, data) => setSelected(data.selectedValue)}>
  <SwatchPickerRow>
    <ColorSwatch value="red" color="#d13438" aria-label="Red" />
    <ColorSwatch value="blue" color="#0078d4" aria-label="Blue" />
    <ColorSwatch value="green" color="#107c10" aria-label="Green" />
    <ColorSwatch value="yellow" color="#fce100" aria-label="Yellow" />
  </SwatchPickerRow>
</SwatchPicker>;
```

## Grid Layout Utility

For programmatic grid generation use `renderSwatchPickerGrid`:

```tsx
import { SwatchPicker, renderSwatchPickerGrid, ColorSwatch } from '@fluentui/react-components';

const colors = [
  { value: 'red', color: '#d13438', 'aria-label': 'Red' },
  { value: 'blue', color: '#0078d4', 'aria-label': 'Blue' },
];

<SwatchPicker selectedValue={selected} onSelectionChange={(_, data) => setSelected(data.selectedValue)}>
  {renderSwatchPickerGrid({ items: colors, columnCount: 4 })}
</SwatchPicker>;
```

## Image Swatches

```tsx
<SwatchPicker>
  <SwatchPickerRow>
    <ImageSwatch value="pattern1" src="/pattern1.png" aria-label="Pattern 1" />
    <ImageSwatch value="pattern2" src="/pattern2.png" aria-label="Pattern 2" />
    <EmptySwatch aria-label="No pattern" />
  </SwatchPickerRow>
</SwatchPicker>
```
