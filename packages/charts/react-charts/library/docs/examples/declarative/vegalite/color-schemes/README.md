# Vega-Lite Color Scheme Examples

This directory contains examples demonstrating Vega-Lite color scheme support in the VegaLiteSchemaAdapter.

## Supported Color Schemes

The adapter maps standard Vega-Lite color schemes to Fluent UI DataViz colors:

### Fully Supported Schemes

| Vega-Lite Scheme | Description               | Fluent Mapping                                                                                                            |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **category10**   | D3 Category10 (10 colors) | Maps to Fluent qualitative colors (lightBlue, warning, lightGreen, error, orchid, pumpkin, hotPink, disabled, gold, teal) |
| **category20**   | D3 Category20 (20 colors) | Maps to Fluent qualitative color pairs with light/dark shades                                                             |
| **tableau10**    | Tableau 10 (10 colors)    | Maps to Fluent colors matching Tableau's palette                                                                          |
| **tableau20**    | Tableau 20 (20 colors)    | Maps to Fluent colors with light/dark pairs                                                                               |

### Partially Supported (Fallback to Default)

The following schemes are recognized but currently fall back to the default Fluent palette with a warning:

- `accent`, `dark2`, `paired`, `pastel1`, `pastel2`, `set1`, `set2`, `set3`

### Custom Color Ranges

You can also specify custom colors using the `range` property, which takes priority over named schemes.

## Examples

### 1. Category10 Line Chart

**File**: `category10-line.json`

Multi-series line chart using the category10 scheme:

```json
{
  "encoding": {
    "color": {
      "field": "category",
      "type": "nominal",
      "scale": { "scheme": "category10" }
    }
  }
}
```

### 2. Tableau10 Grouped Bar Chart

**File**: `tableau10-grouped-bar.json`

Grouped bar chart using the tableau10 scheme:

```json
{
  "encoding": {
    "color": {
      "field": "product",
      "type": "nominal",
      "scale": { "scheme": "tableau10" }
    }
  }
}
```

### 3. Custom Color Range Donut Chart

**File**: `custom-range-donut.json`

Donut chart with custom color array:

```json
{
  "encoding": {
    "color": {
      "field": "category",
      "type": "nominal",
      "scale": {
        "range": ["#637cef", "#e3008c", "#2aa0a4", "#9373c0", "#13a10e"]
      }
    }
  }
}
```

### 4. Category20 Stacked Bar Chart

**File**: `category20-stacked-bar.json`

Stacked bar chart using the category20 scheme for more colors:

```json
{
  "encoding": {
    "color": {
      "field": "segment",
      "type": "nominal",
      "scale": { "scheme": "category20" }
    }
  }
}
```

## Color Priority

The adapter applies colors in the following priority order:

1. **Static color value** (`encoding.color.value`) - Highest priority
2. **Mark color** (`mark.color`)
3. **Custom range** (`encoding.color.scale.range`)
4. **Named scheme** (`encoding.color.scale.scheme`)
5. **Default Fluent palette** - Fallback

## Implementation Details

### VegaLiteColorAdapter

The color mapping is implemented in `VegaLiteColorAdapter.ts`:

```typescript
import { getVegaColor } from './VegaLiteColorAdapter';

// Get color for a series
const color = getVegaColor(
  seriesIndex, // Series/color index
  colorScheme, // e.g., 'category10'
  colorRange, // Custom color array
  isDarkTheme, // Light/dark theme support
);
```

### Scheme Mappings

Each Vega scheme is mapped to Fluent DataViz tokens that adapt to light/dark themes:

**Category10 Example**:

- Vega blue (#1f77b4) → Fluent `color26` (lightBlue.shade10)
- Vega orange (#ff7f0e) → Fluent `warning` (semantic warning color)
- Vega green (#2ca02c) → Fluent `color5` (lightGreen.primary)

**Tableau10 Example**:

- Tableau blue (#4e79a7) → Fluent `color1` (cornflower.tint10)
- Tableau orange (#f28e2c) → Fluent `color7` (pumpkin.primary)
- Tableau red (#e15759) → Fluent `error` (semantic error color)

## Testing

Unit tests for color scheme support are in `VegaLiteSchemaAdapterUT.test.tsx`:

```bash
npm test -- VegaLiteSchemaAdapterUT
```

**Test Coverage**:

- ✅ category10 scheme mapping
- ✅ tableau10 scheme mapping
- ✅ category20 scheme mapping
- ✅ Custom color ranges
- ✅ Priority order (range over scheme)
- ✅ Fallback to default palette

## Related Files

- **VegaLiteColorAdapter.ts** - Color scheme mapping logic
- **VegaLiteSchemaAdapter.ts** - Integration into chart transformers
- **colors.ts** - Fluent DataViz palette definitions
- **VegaLiteTypes.ts** - Type definitions for scale.scheme and scale.range

## Usage in Charts

All chart types support color schemes:

- ✅ LineChart
- ✅ VerticalBarChart
- ✅ VerticalStackedBarChart
- ✅ GroupedVerticalBarChart
- ✅ DonutChart
- ✅ AreaChart (inherits from LineChart)

## Dark Theme Support

Color mappings automatically adapt to dark theme:

```typescript
// Light theme: Uses first color in token array
// Dark theme: Uses second color in token array (if available)

const color = getVegaColor(0, 'category10', undefined, true); // isDarkTheme = true
```

Example:

- `color11` → Light: #3c51b4 (cornflower.shade20) | Dark: #93a4f4 (cornflower.tint30)
