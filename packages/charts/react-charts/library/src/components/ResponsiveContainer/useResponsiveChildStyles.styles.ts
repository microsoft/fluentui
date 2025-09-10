import { makeStyles, mergeClasses } from '@griffel/react';
import { ResponsiveChildStyles } from './ResponsiveContainer.types';
import { SlotClassNames } from '@fluentui/react-utilities';

export const responsiveChildClassNames: SlotClassNames<ResponsiveChildStyles> = {
  root: 'fui-charts-resp-child__root',
  chartWrapper: 'fui-charts-resp-child__chartWrapper',
  chart: 'fui-charts-resp-child__chart',
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  chartWrapper: {
    width: '100%',
  },
  chart: {
    // This overrides the pixel width of svg allowing it to resize properly within a flexbox or grid layout.
    // Note: height is not set to 100% because that causes the charts to resize vertically in an infinite loop.
    width: '100%',
  },
});

export const useResponsiveChildStyles = (): ResponsiveChildStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(responsiveChildClassNames.root, baseStyles.root),
    chartWrapper: mergeClasses(responsiveChildClassNames.chartWrapper, baseStyles.chartWrapper),
    chart: mergeClasses(responsiveChildClassNames.chart, baseStyles.chart),
  };
};
