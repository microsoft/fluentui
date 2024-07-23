import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { ILineChartProps, ILineChartStyles } from './LineChart.types';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';

/**
 * @internal
 */
export const linechartClassNames: SlotClassNames<ILineChartStyles> = {
  tooltip: 'fui-line__tooltip',
  root: 'fui-line__root',
  xAxis: 'fui-line__xAxis',
  yAxis: 'fui-line__yAxis',
  legendContainer: 'fui-line__legendContainer',
  hover: 'fui-line__hover',
  calloutContentRoot: 'fui-line__calloutContentRoot',
  calloutContentX: 'fui-line__calloutContentX',
  calloutContentY: 'fui-line__calloutContentY',
  descriptionMessage: 'fui-line__descriptionMessage',
  calloutDateTimeContainer: 'fui-line__calloutDateTimeContainer',
  calloutInfoContainer: 'fui-line__calloutInfoContainer',
  calloutBlockContainer: 'fui-line__calloutBlockContainer',
  calloutlegendText: 'fui-line__calloutLegendText',
  axisTitle: 'fui-line__axisTitle',
  chartTitle: 'fui-line__chartTitle',
  opacityChangeOnHover: 'fui-line__opacityChangeOnHover',
  shapeStyles: 'fui-line__shapeStyles',
  chartWrapper: 'fui-line__chartWrapper',
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
