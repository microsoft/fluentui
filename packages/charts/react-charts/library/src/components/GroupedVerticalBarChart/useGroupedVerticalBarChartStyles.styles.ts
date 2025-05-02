import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { GroupedVerticalBarChartProps, GroupedVerticalBarChartStyles } from '../../index';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const groupedVerticalBarChartClassNames: SlotClassNames<GroupedVerticalBarChartStyles> = {
  opacityChangeOnHover: 'fui-gvbc**opacityChangeOnHover',
  tooltip: 'fui-gvbc**tooltip',
  barLabel: 'fui-gvbc**barLabel',
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
};

const useStyles = makeStyles({
  opacityChangeOnHover: {
    cursor: 'default',
  },
  tooltip: {
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingHorizontalS),
    position: 'absolute',
    textAlign: 'center',
    top: tokens.spacingVerticalNone,
    fill: tokens.colorNeutralBackground1, //Check this
    background: tokens.colorNeutralBackground1, //Fill or background
    borderRadius: tokens.borderRadiusSmall,
    pointerEvents: 'none',
    color: tokens.colorNeutralForeground1, //Confirm this
  },
  barLabel: {
    ...typographyStyles.caption1Strong, // Confirm styles
    fill: tokens.colorNeutralForeground1,
  },
});

/**
 * Apply styling to the GroupedVerticalBarChart slots based on the state
 */
export const useGroupedVerticalBarChartStyles_unstable = (
  props: GroupedVerticalBarChartProps,
): GroupedVerticalBarChartStyles => {
  const baseStyles = useStyles();

  return {
    opacityChangeOnHover: mergeClasses(
      groupedVerticalBarChartClassNames.opacityChangeOnHover,
      baseStyles.opacityChangeOnHover /*props.styles?.opacityChangeOnHover*/,
    ),
    tooltip: mergeClasses(groupedVerticalBarChartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    barLabel: mergeClasses(groupedVerticalBarChartClassNames.barLabel, baseStyles.barLabel /*props.styles?.barLabel*/),
  };
};
