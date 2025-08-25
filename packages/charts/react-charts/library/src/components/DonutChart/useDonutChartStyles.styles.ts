import { GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { DonutChartProps, DonutChartStyles } from './index';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { getAxisTitleStyle } from '../../utilities/index';

/**
 * @internal
 */
export const donutClassNames: SlotClassNames<DonutChartStyles> = {
  root: 'fui-donut__root',
  chart: 'fui-donut__chart',
  legendContainer: 'fui-donut__legendContainer',
  chartWrapper: 'fui-donut__chartWrapper',
  axisAnnotation: 'fui-donut__axisAnnotation',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  root: {
    // alignItems: 'center',
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  chart: {
    boxSizing: 'content-box',
    alignmentAdjust: 'center',
    display: 'block',
    overflow: 'visible',
  },
  legendContainer: {
    paddingTop: tokens.spacingVerticalL,
    width: '100%',
  },
  axisAnnotation: getAxisTitleStyle() as GriffelStyle,
});

/**
 * Apply styling to the DonutChart component
 */
export const useDonutChartStyles = (props: DonutChartProps): DonutChartStyles => {
  const { className } = props;
  const baseStyles = useStyles();

  return {
    root: mergeClasses(donutClassNames.root, baseStyles.root, className, props.styles?.root),
    chart: mergeClasses(donutClassNames.chart, baseStyles.chart, props.styles?.chart),
    legendContainer: mergeClasses(
      donutClassNames.legendContainer,
      baseStyles.legendContainer,
      props.styles?.legendContainer,
    ),
    chartWrapper: mergeClasses(donutClassNames.chartWrapper, props.styles?.chartWrapper),
    axisAnnotation: mergeClasses(
      donutClassNames.axisAnnotation,
      baseStyles.axisAnnotation,
      props.styles?.axisAnnotation,
    ),
  };
};
