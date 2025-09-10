import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { ChartTableProps, ChartTableStyles } from './ChartTable.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';

/**
 * @internal
 */
export const chartTableClassNames: SlotClassNames<ChartTableStyles> = {
  root: 'fui-ChartTable__root',
  table: 'fui-ChartTable__table',
  headerCell: 'fui-ChartTable__headerCell',
  bodyCell: 'fui-ChartTable__bodyCell',
  chart: 'fui-ChartTable__chart',
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    borderCollapse: 'collapse',
  },
  headerCell: {
    ...typographyStyles.caption1,
    fontWeight: tokens.fontWeightSemibold,
    backgroundColor: tokens.colorNeutralBackground3,
    color: 'black',
    ...shorthands.padding(tokens.spacingHorizontalS),
    textAlign: 'left',
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorNeutralStroke2),
    '@media (forced-colors: active)': {
      backgroundColor: 'Window',
      color: 'WindowText',
    },
  },
  bodyCell: {
    ...typographyStyles.caption1,
    ...shorthands.padding(tokens.spacingHorizontalS),
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorNeutralStroke2),
    color: 'black',
    textAlign: 'left',
    '@media (forced-colors: active)': {
      color: 'WindowText',
    },
  },
});

/**
 * Apply styling to the ChartTable slots based on the state
 */
export const useChartTableStyles = (props: ChartTableProps): ChartTableStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(chartTableClassNames.root, baseStyles.root /*props.styles?.root*/),
    table: mergeClasses(chartTableClassNames.table, baseStyles.table /*props.styles?.table*/),
    headerCell: mergeClasses(chartTableClassNames.headerCell, baseStyles.headerCell /*props.styles?.headerCell*/),
    bodyCell: mergeClasses(chartTableClassNames.bodyCell, baseStyles.bodyCell /*props.styles?.bodyCell*/),
    chart: mergeClasses(chartTableClassNames.chart /*props.styles?.chart*/),
  };
};
