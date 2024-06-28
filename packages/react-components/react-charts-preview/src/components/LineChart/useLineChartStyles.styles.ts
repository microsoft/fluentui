import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { ILineChartProps, ILineChartStyles } from './LineChart.types';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';

/**
 * @internal
 */
export const linechartClassNames: SlotClassNames<ILineChartStyles> = {
  tooltip: 'fui-lc__tooltip',
  root: '',
  xAxis: '',
  yAxis: '',
  legendContainer: '',
  hover: '',
  calloutContentRoot: '',
  calloutContentX: '',
  calloutContentY: '',
  descriptionMessage: '',
  calloutDateTimeContainer: '',
  calloutInfoContainer: '',
  calloutBlockContainer: '',
  calloutlegendText: '',
  axisTitle: '',
  chartTitle: '',
  opacityChangeOnHover: '',
  shapeStyles: '',
  chartWrapper: '',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  tooltip: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('8px'),
    position: 'absolute',
    textAlign: 'center',
    top: '0px',
    fill: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius('2px'),
    pointerEvents: 'none',
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useLineChartStyles_unstable = (props: ILineChartProps): ILineChartStyles => {
  const baseStyles = useStyles();
  return {
    tooltip: mergeClasses(linechartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
  };
};
