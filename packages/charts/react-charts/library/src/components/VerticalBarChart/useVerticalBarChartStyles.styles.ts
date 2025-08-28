import { GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import { VerticalBarChartProps, VerticalBarChartStyles } from '../../index';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens } from '@fluentui/react-theme';
import { HighContrastSelector } from '../../utilities/utilities';
import { getBarLabelStyle, getTooltipStyle } from '../../utilities/index';

export const verticalbarchartClassNames: SlotClassNames<VerticalBarChartStyles> = {
  opacityChangeOnHover: 'fui-vbc__opacityChangeOnHover',
  tooltip: 'fui-vbc__tooltip',
  barLabel: 'fui-vbc__barLabel',
  lineBorder: 'fui-vbc_lineBorder',
  root: '',
  xAxis: '',
  yAxis: '',
  legendContainer: '',
  hover: '',
  descriptionMessage: '',
  axisTitle: '',
  chartTitle: '',
  shapeStyles: '',
  chartWrapper: '',
  svgTooltip: '',
  chart: '',
  axisAnnotation: '',
};
const useStyles = makeStyles({
  opacityChangeOnHover: {},
  tooltip: getTooltipStyle() as GriffelStyle,
  barLabel: getBarLabelStyle() as GriffelStyle,
  lineBorder: {
    stroke: tokens.colorNeutralBackground1,
    [HighContrastSelector]: {
      stroke: 'Canvas',
    },
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useVerticalBarChartStyles = (props: VerticalBarChartProps): VerticalBarChartStyles => {
  const baseStyles = useStyles();

  return {
    opacityChangeOnHover: mergeClasses(
      verticalbarchartClassNames.opacityChangeOnHover,
      baseStyles.opacityChangeOnHover /*props.styles?.opacityChangeOnHover*/,
    ),
    tooltip: mergeClasses(verticalbarchartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    barLabel: mergeClasses(verticalbarchartClassNames.barLabel, baseStyles.barLabel /*props.styles?.barLabel*/),
    lineBorder: mergeClasses(verticalbarchartClassNames.lineBorder, baseStyles.lineBorder /*props.styles?.lineBorder*/),
  };
};
