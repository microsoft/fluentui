import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { IVerticalBarChartProps, IVerticalBarChartStyles, IVerticalBarChartStyleProps } from '../../index';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens } from '@fluentui/react-theme';

export const verticalbarchartClassNames: SlotClassNames<IVerticalBarChartStyles> = {
  opacityChangeOnHover: 'fui-vbc__opacityChangeOnHover',
  xAxisTicks: 'fui-vbc__xAxisTicks',
  yAxisTicks: 'fui-vbc__yAxisTicks',
  yAxisDomain: 'fui-vbc__yAxisDomain',
  tooltip: 'fui-vbc__tooltip',
  barLabel: 'fui-vbc__barLabel',
};
const useStyles = makeStyles({
  opacityChangeOnHover: {
    opacity: '0.1', // support custom opacity change
  },
  xAxisTicks: {},
  yAxisTicks: {
    transform: 'scaleX(-1)',
  },
  yAxisDomain: {
    transform: 'scaleX(-1)',
  },
  tooltip: {
    fontSize: tokens.fontSizeBase300,
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
  barLabel: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semibold,
    //fill: neutrals.neutralPrimary,
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useVerticalBarChartStyles_unstable = (props: IVerticalBarChartProps): IVerticalBarChartStyles => {
  const baseStyles = useStyles();

  return {
    opacityChangeOnHover: mergeClasses(
      verticalbarchartClassNames.opacityChangeOnHover,
      baseStyles.opacityChangeOnHover /*props.styles?.opacityChangeOnHover*/,
    ),
    xAxisTicks: mergeClasses(
      // eslint-disable-next-line deprecation/deprecation
      verticalbarchartClassNames.xAxisTicks,
      baseStyles.xAxisTicks /*props.styles?.xAxisTicks*/,
    ),
    yAxisTicks: mergeClasses(
      // eslint-disable-next-line deprecation/deprecation
      verticalbarchartClassNames.yAxisTicks,
      baseStyles.yAxisTicks /*props.styles?.yAxisTicks*/,
    ),
    yAxisDomain: mergeClasses(
      // eslint-disable-next-line deprecation/deprecation
      verticalbarchartClassNames.yAxisDomain,
      baseStyles.yAxisDomain /*props.styles?.yAxisDomain*/,
    ),
    tooltip: mergeClasses(verticalbarchartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    barLabel: mergeClasses(verticalbarchartClassNames.barLabel, baseStyles.barLabel /*props.styles?.barLabel*/),
  };
};
