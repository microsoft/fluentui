import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { AreaChartProps, AreaChartStyles } from './index';
import { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const areaChartClassNames: SlotClassNames<AreaChartStyles> = {
  tooltip: 'fui-ac__tooltip',
  root: '',
  xAxis: '',
  yAxis: '',
  legendContainer: '',
  hover: '',
  descriptionMessage: '',
  axisTitle: '',
  chartTitle: '',
  opacityChangeOnHover: '',
  shapeStyles: '',
  chartWrapper: '',
};

const useStyles = makeStyles({
  tooltip: {
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingHorizontalS),
    position: 'absolute',
    textAlign: 'center',
    top: tokens.spacingVerticalNone,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusSmall,
    pointerEvents: 'none',
    color: tokens.colorNeutralForeground1,
  },
});

/**
 * Apply styling to the AreaChart slots based on the state
 */
export const useAreaChartStyles = (props: AreaChartProps): AreaChartStyles => {
  const baseStyles = useStyles();

  return {
    tooltip: mergeClasses(areaChartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
  };
};
