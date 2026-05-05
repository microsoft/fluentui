# Charts Migration

v9 charts are available in **`@fluentui/react-charts`** (v9). Migrate away from `@fluentui/react-charting` (v8).

```sh
npm install @fluentui/react-charts
```

## Package Rename

| v8                         | v9                       |
| -------------------------- | ------------------------ |
| `@fluentui/react-charting` | `@fluentui/react-charts` |

The v9 package is built on Griffel (`makeStyles`) and integrates natively with `FluentProvider` — no theme shim required.

## Setup

Wrap your app (or the chart subtree) with `FluentProvider` as you would for any v9 component:

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { DonutChart } from '@fluentui/react-charts';

<FluentProvider theme={webLightTheme}>
  <DonutChart data={chartData} />
</FluentProvider>;
```

## Using v9 Design Tokens in Chart Data

Pass token values directly to chart color properties for consistent theming:

```tsx
import { tokens } from '@fluentui/react-components';

const chartData = {
  chartTitle: 'Usage',
  chartData: [
    { legend: 'Active', data: 40, color: tokens.colorBrandBackground },
    { legend: 'Inactive', data: 60, color: tokens.colorNeutralBackground3 },
  ],
};
```

## Resources

- [Fluent Charting docs](https://aka.ms/fluentCharting)
- Reach out to the charting team: tag `@microsoft/charting-team` in GitHub Discussions
