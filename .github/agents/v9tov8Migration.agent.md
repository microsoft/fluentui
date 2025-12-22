---
description: 'Migrate code from functional component(v9) to class component(v8) in accordance with Fluent UI standards.'
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---

**Difference between v8 and v9:**

- **v8**:

  1. class component code written inside `packages/charts/react-charting`.
  2. Traditional component lifecycle methods (e.g., componentDidMount, componentDidUpdate).
  3. State is managed using this.state and this.setState.
  4. Props accessed via this.props.

- **v9**:
  1. functional component code written inside `packages/charts/react-charts`.
  2. Utilizes React hooks (e.g., useState, useEffect) for state and lifecycle management.
  3. State is managed using useState hook.
  4. Direct props destructuring.

**Difference between v8 styles file and v9 styles file:**

- **example v8 styles file:**
  `import { FontWeights } from '@fluentui/react/lib/Styling';
 import { IHeatMapChartStyleProps, IHeatMapChartStyles } from './HeatMapChart.types';
 export const getHeatMapChartStyles = (props: IHeatMapChartStyleProps): IHeatMapChartStyles => {
  const { theme } = props;
  return {
    root: {},
    text: [
      theme.fonts.medium,
      {
        pointerEvents: 'none',
        fontWeight: FontWeights.semibold,
      },
    ],
    subComponentStyles: {},
  };
};`

- **_Some important points to note:_**

  - Uses mergeStyleSets from @fluentui/react/lib/Styling
  - Exports a function that returns styles (e.g., getHeatMapChartStyles)
  - Uses theme-based styling with theme.fonts, theme.palette
  - Styles are defined as objects or arrays of style rules
  - Interfaces have I prefix (e.g., IHeatMapChartStyleProps, IHeatMapChartStyles)

- **example v9 styles file:**
  `'use client';
  import { makeStyles, mergeClasses } from '@griffel/react';
  import type { HeatMapChartProps, HeatMapChartStyles } from './HeatMapChart.types';
  import type { SlotClassNames } from '@fluentui/react-utilities';
  import { typographyStyles } from '@fluentui/react-theme';

  export const heatmapChartClassNames: SlotClassNames<HeatMapChartStyles> = {
  root: 'fui-hmc**root',
  text: 'fui-hmc**text',
  calloutContentRoot: 'fui-hmc\_\_calloutContentRoot',
  xAxis: '',
  yAxis: '',
  legendContainer: '',
  hover: '',
  descriptionMessage: '',
  tooltip: '',
  axisTitle: '',
  chartTitle: '',
  opacityChangeOnHover: '',
  shapeStyles: '',
  chartWrapper: '',
  svgTooltip: '',
  chart: '',
  axisAnnotation: '',
  plotContainer: '',
  annotationLayer: '',
  };
  const useStyles = makeStyles({
  root: {},
  text: {
  ...typographyStyles.body1Strong,
  pointerEvents: 'none',
  },
  calloutContentRoot: {
  maxWidth: '238px',
  },
  });

  export const useHeatMapChartStyles = (props: HeatMapChartProps): HeatMapChartStyles => {
  const baseStyles = useStyles();

  return {
  root: mergeClasses(heatmapChartClassNames.root, baseStyles.root /_, props.styles?.root_/),
  text: mergeClasses(heatmapChartClassNames.text, baseStyles.text /_, props.styles?.text_/),
  calloutContentRoot: mergeClasses(
  heatmapChartClassNames.calloutContentRoot,
  baseStyles.calloutContentRoot /_, props.styles?.calloutContentRoot_/,
  ),
  };
  };`

- **_Some important points to note:_**

  - Uses makeStyles and mergeClasses from @griffel/react
  - Exports a hook function that returns styles (e.g., useHeatMapChartStyles)
  - Uses typographyStyles from @fluentui/react-theme for text styles
  - Styles are defined as objects within makeStyles
  - Interfaces do not have I prefix (e.g., HeatMapChartProps, HeatMapChartStyles)

- Migrate the provided v9 functional component code to a v8 class component code, ensuring to replace hooks with appropriate lifecycle methods and state management.

- Follow all the migration steps mentioned below to ensure a successful migration.

- **Migration steps:**
  1. Take the commit id from the user which needs to be migrated from v9 to v8.
  2. use git commands to fetch the file content from that commit.
  3. Use the above differences and points to convert the functional component code to class component code.
  4. Ensure all changes of that particular commit are addressed in the migration.
  5. **_IMPORTANT:_** After migration, run `yarn build` to build the `react-charting` package and ensure there are no build errors.
  6. **_IMPORTANT:_** Then run `npx cross-env TZ=UTC jest -u` to ensure all tests are passing.
