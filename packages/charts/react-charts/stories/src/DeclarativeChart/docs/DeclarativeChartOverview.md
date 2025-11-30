DeclarativeChart enables developers to render interactive chart visualizations using Plotly's widely adopted JSON-based schema while ensuring a consistent Fluent UI design language.

For Vega-Lite specifications, use the **VegaDeclarativeChart** component instead.

## Components

### DeclarativeChart

Renders charts from **Plotly JSON schemas**. Supports all Fluent chart types with full Plotly compatibility.

### VegaDeclarativeChart

Renders charts from **Vega-Lite specifications**. Supports the following chart types:

- **Line Charts** - `mark: 'line'` or `mark: 'point'`
- **Area Charts** - `mark: 'area'`
- **Scatter Charts** - `mark: 'point'`, `mark: 'circle'`, or `mark: 'square'`
- **Vertical Bar Charts** - `mark: 'bar'` with nominal/ordinal x-axis
- **Stacked Bar Charts** - `mark: 'bar'` with color encoding (stacks by default)
- **Grouped Bar Charts** - Available via explicit configuration
- **Horizontal Bar Charts** - `mark: 'bar'` with nominal/ordinal y-axis
- **Donut/Pie Charts** - `mark: 'arc'` with theta encoding
- **Heatmaps** - `mark: 'rect'` with x, y, and color encodings

> **Note:** Sankey, Funnel, Gantt, and Gauge charts are not standard Vega-Lite marks. These specialized visualizations would require custom extensions or alternative approaches.

#### Examples

**Line Chart:**

```tsx
import { VegaDeclarativeChart } from '@fluentui/react-charts';

const lineSpec = {
  mark: 'line',
  data: {
    values: [
      { x: 1, y: 10 },
      { x: 2, y: 20 },
    ],
  },
  encoding: {
    x: { field: 'x', type: 'quantitative' },
    y: { field: 'y', type: 'quantitative' },
  },
};

<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: lineSpec }} />;
```

**Area Chart:**

```tsx
const areaSpec = {
  mark: 'area',
  data: {
    values: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 150 },
    ],
  },
  encoding: {
    x: { field: 'date', type: 'temporal' },
    y: { field: 'value', type: 'quantitative' },
  },
};

<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: areaSpec }} />;
```

**Scatter Chart:**

```tsx
const scatterSpec = {
  mark: 'point',
  data: {
    values: [
      { x: 10, y: 20, size: 100 },
      { x: 15, y: 30, size: 200 },
    ],
  },
  encoding: {
    x: { field: 'x', type: 'quantitative' },
    y: { field: 'y', type: 'quantitative' },
    size: { field: 'size', type: 'quantitative' },
  },
};

<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: scatterSpec }} />;
```

**Vertical Bar Chart:**

```tsx
const barSpec = {
  mark: 'bar',
  data: {
    values: [
      { category: 'A', amount: 28 },
      { category: 'B', amount: 55 },
    ],
  },
  encoding: {
    x: { field: 'category', type: 'nominal' },
    y: { field: 'amount', type: 'quantitative' },
  },
};

<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: barSpec }} />;
```

**Stacked Bar Chart:**

```tsx
const stackedSpec = {
  mark: 'bar',
  data: {
    values: [
      { category: 'A', group: 'G1', amount: 28 },
      { category: 'A', group: 'G2', amount: 15 },
    ],
  },
  encoding: {
    x: { field: 'category', type: 'nominal' },
    y: { field: 'amount', type: 'quantitative' },
    color: { field: 'group', type: 'nominal' },
  },
};

<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: stackedSpec }} />;
```

**Horizontal Bar Chart:**

```tsx
const hbarSpec = {
  mark: 'bar',
  data: {
    values: [
      { category: 'A', amount: 28 },
      { category: 'B', amount: 55 },
    ],
  },
  encoding: {
    y: { field: 'category', type: 'nominal' },
    x: { field: 'amount', type: 'quantitative' },
  },
};

<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: hbarSpec }} />;
```

**Donut Chart:**

```tsx
const donutSpec = {
  mark: 'arc',
  data: {
    values: [
      { category: 'A', value: 30 },
      { category: 'B', value: 70 },
    ],
  },
  encoding: {
    theta: { field: 'value', type: 'quantitative' },
    color: { field: 'category', type: 'nominal' },
  },
};

<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: donutSpec }} />;
```

**Heatmap:**

```tsx
const heatmapSpec = {
  mark: 'rect',
  data: {
    values: [
      { x: 'A', y: 'Mon', value: 28 },
      { x: 'B', y: 'Mon', value: 55 },
      { x: 'A', y: 'Tue', value: 43 },
    ],
  },
  encoding: {
    x: { field: 'x', type: 'nominal' },
    y: { field: 'y', type: 'nominal' },
    color: { field: 'value', type: 'quantitative' },
  },
};

<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: heatmapSpec }} />;
```

## Bundle Size Optimization

Both components are **tree-shakable**:

- Using only `DeclarativeChart`? Vega-Lite code is excluded from your bundle
- Using only `VegaDeclarativeChart`? Plotly adapter code is excluded from your bundle
- Import only what you need for optimal bundle size

## Vega-Lite Type Definitions

VegaDeclarativeChart accepts any valid Vega-Lite specification. For comprehensive TypeScript support, optionally install the official types:

```bash
npm install vega-lite
```

Then use the official types:

```typescript
import type { TopLevelSpec } from 'vega-lite';
import { VegaDeclarativeChart } from '@fluentui/react-charts';

const spec: TopLevelSpec = {
  // Full type checking and IntelliSense
};

<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />;
```

The vega-lite package is marked as an **optional peer dependency**, so it won't be bundled unless you explicitly use its types.
