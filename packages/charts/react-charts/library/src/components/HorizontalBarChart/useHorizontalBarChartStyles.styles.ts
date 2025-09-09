import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { HorizontalBarChartProps, HorizontalBarChartStyles, HorizontalBarChartVariant } from './index';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { HighContrastSelector } from '../../utilities/index';

/**
 * @internal
 */
export const hbcClassNames: SlotClassNames<HorizontalBarChartStyles> = {
  root: 'fui-hbc__root',
  items: 'fui-hbc__items',
  chart: 'fui-hbc__chart',
  chartTitle: 'fui-hbc__chartTitle',
  barWrapper: 'fui-hbc__barWrapper',
  chartTitleLeft: 'fui-hbc__chartTitleLeft',
  chartTitleRight: 'fui-hbc__chartTitleRight',
  chartDataTextDenominator: 'fui-hbc__textDenom',
  benchmarkContainer: 'fui-hbc__benchmark',
  triangle: 'fui-hbc__triangle',
  barLabel: 'fui-hbc__barLabel',
  chartWrapper: 'fui-hbc__chartWrapper',
  legendContainer: 'fui-hbc__legendContainer',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Support custom width
  },
  items10pMargin: {
    marginBottom: tokens.spacingVerticalMNudge,
  },
  items16pMargin: {
    marginBottom: tokens.spacingVerticalL,
  },
  chart: {
    width: '100%',
    height: '12px', // Support custom bar height
    display: 'block',
    overflow: 'visible',
  },
  barWrapper: {},
  chartTitle: {
    ...typographyStyles.caption1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  chartTitleLeft: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'block',
    color: tokens.colorNeutralForeground1,
  },
  chartTitleLeft4pMargin: {
    marginBottom: '4px',
  },
  chartTitleLeft5pMargin: {
    marginBottom: '5px',
  },
  chartTitleRight: {
    ...typographyStyles.body1Strong,
    color: tokens.colorNeutralForeground1,
  },
  chartDataTextDenominator: {
    ...typographyStyles.body1,
    color: tokens.colorNeutralForeground1,
  },
  benchmarkContainer: {
    position: 'relative',
    height: '7px',
    marginTop: '-3px',
    marginBottom: '-1px',
  },
  triangle: {
    width: '0',
    height: '0',
    ...shorthands.borderLeft('4px', 'solid', 'transparent'),
    ...shorthands.borderRight('4px', 'solid', 'transparent'),
    ...shorthands.borderTop('7px', 'solid'),
    borderTopColor: tokens.colorPaletteBlueBorderActive,
    marginBottom: tokens.spacingVerticalXS,
    position: 'absolute',
  },
  barLabel: {
    ...typographyStyles.caption1Strong,
    fill: tokens.colorNeutralForeground1,
    [HighContrastSelector]: {
      stroke: 'CanvasText',
    },
  },
  chartWrapper40ppadding: {
    paddingRight: '40p',
  },
  chartWrapper0ppadding: {
    paddingRight: tokens.spacingHorizontalNone,
  },
  legendContainer: { paddingTop: tokens.spacingVerticalL },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useHorizontalBarChartStyles = (props: HorizontalBarChartProps): HorizontalBarChartStyles => {
  const { className, showTriangle, variant, hideLabels } = props; // ToDo - width, barHeight is non enumerable. Need to be used inline.
  const baseStyles = useStyles();

  return {
    root: mergeClasses(hbcClassNames.root, baseStyles.root, className, props.styles?.root),
    items: mergeClasses(
      hbcClassNames.items,
      showTriangle || variant === HorizontalBarChartVariant.AbsoluteScale
        ? baseStyles.items16pMargin
        : baseStyles.items10pMargin,
      props.styles?.items,
    ),
    chart: mergeClasses(hbcClassNames.chart, baseStyles.chart, props.styles?.chart),
    chartTitle: mergeClasses(hbcClassNames.chartTitle, baseStyles.chartTitle, props.styles?.chartTitle),
    barWrapper: mergeClasses(hbcClassNames.barWrapper, baseStyles.barWrapper, props.styles?.barWrapper),
    chartTitleLeft: mergeClasses(
      hbcClassNames.chartTitleLeft,
      baseStyles.chartTitleLeft,
      variant === HorizontalBarChartVariant.AbsoluteScale
        ? baseStyles.chartTitleLeft4pMargin
        : baseStyles.chartTitleLeft5pMargin,
      props.styles?.chartTitleLeft,
    ),
    chartTitleRight: mergeClasses(
      hbcClassNames.chartTitleRight,
      baseStyles.chartTitleRight,
      props.styles?.chartTitleRight,
    ),
    chartDataTextDenominator: mergeClasses(
      hbcClassNames.chartDataTextDenominator,
      baseStyles.chartDataTextDenominator,
      props.styles?.chartDataTextDenominator,
    ),
    benchmarkContainer: mergeClasses(
      hbcClassNames.benchmarkContainer,
      baseStyles.benchmarkContainer,
      props.styles?.benchmarkContainer,
    ),
    triangle: mergeClasses(hbcClassNames.triangle, baseStyles.triangle, props.styles?.triangle),
    barLabel: mergeClasses(hbcClassNames.barLabel, baseStyles.barLabel, props.styles?.barLabel),
    chartWrapper: mergeClasses(
      hbcClassNames.chartWrapper,
      variant === HorizontalBarChartVariant.AbsoluteScale && !hideLabels
        ? baseStyles.chartWrapper40ppadding
        : baseStyles.chartWrapper0ppadding,
      props.styles?.chartWrapper,
    ),
    legendContainer: mergeClasses(
      hbcClassNames.legendContainer,
      baseStyles.legendContainer,
      props.styles?.legendContainer,
    ),
  };
};
