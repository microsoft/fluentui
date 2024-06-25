import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { IDonutChartProps, IDonutChartStyles } from './index';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @internal
 */
export const donutClassNames: SlotClassNames<IDonutChartStyles> = {
  root: 'fui-donut__root',
  chart: 'fui-donut__chart',
  legendContainer: 'fui-donut__legendContainer',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  chart: {
    boxSizing: 'content-box',
    alignmentAdjust: 'center',
    display: 'block',
    ...shorthands.overflow('visible'),
  },
  legendContainer: { paddingTop: '16px' },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useDonutChartStyles_unstable = (props: IDonutChartProps): IDonutChartStyles => {
  const { className, width, height } = props;
  const baseStyles = useStyles();

  return {
    root: mergeClasses(donutClassNames.root, baseStyles.root, className, props.styles?.root),
    chart: mergeClasses(donutClassNames.chart, baseStyles.chart, props.styles?.chart),
    legendContainer: mergeClasses(
      donutClassNames.legendContainer,
      baseStyles.legendContainer,
      props.styles?.legendContainer,
    ),
  };
};
