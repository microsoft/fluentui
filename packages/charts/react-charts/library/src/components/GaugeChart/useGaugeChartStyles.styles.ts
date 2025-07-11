import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { makeStyles, mergeClasses } from '@griffel/react';
import { GaugeChartProps, GaugeChartStyles } from './GaugeChart.types';

export const gaugeChartClassNames: SlotClassNames<GaugeChartStyles> = {
  root: 'fui-gc__root',
  chart: 'fui-gc__chart',
  limits: 'fui-gc__limits',
  chartValue: 'fui-gc__chartValue',
  sublabel: 'fui-gc__sublabel',
  needle: 'fui-gc__needle',
  chartTitle: 'fui-gc__chartTitle',
  segment: 'fui-gc__segment',
  gradientSegment: 'fui-gc__gradientSegment',
  calloutContentRoot: 'fui-gc__calloutContentRoot',
  calloutDateTimeContainer: 'fui-gc__calloutDateTimeContainer',
  calloutContentX: 'fui-gc__calloutContentX',
  calloutBlockContainer: 'fui-gc__calloutBlockContainer',
  shapeStyles: 'fui-gc__shapeStyles',
  calloutlegendText: 'fui-gc__calloutlegendText',
  calloutContentY: 'fui-gc__calloutContentY',
  descriptionMessage: 'fui-gc__descriptionMessage',
  calloutInfoContainer: '',
  legendsContainer: 'fui-gc__legendsContainer',
  chartWrapper: 'fui-gc__chartWrapper',
};

const useStyles = makeStyles({
  root: {
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  chart: {
    display: 'block',
  },
  limits: {
    ...typographyStyles.caption1Strong,
    fill: tokens.colorNeutralForeground1,
    forcedColorAdjust: 'auto',
  },
  chartValue: {
    fontWeight: tokens.fontWeightSemibold,
    fill: tokens.colorNeutralForeground1,
    forcedColorAdjust: 'auto',
  },
  sublabel: {
    ...typographyStyles.caption1Strong,
    fill: tokens.colorNeutralForeground1,
    forcedColorAdjust: 'auto',
  },
  needle: {
    fill: tokens.colorNeutralForeground1,
    stroke: tokens.colorNeutralBackground1,
  },
  chartTitle: {
    ...typographyStyles.caption1,
    fill: tokens.colorNeutralForeground1,
    forcedColorAdjust: 'auto',
  },
  segment: {
    outline: 'none',
    stroke: tokens.colorNeutralStroke1,
  },
  gradientSegment: {
    width: '100%',
    height: '100%',
  },
  calloutContentRoot: {
    display: 'grid',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground1,
    backgroundBlendMode: 'normal, luminosity',
  },
  calloutDateTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calloutContentX: {
    ...typographyStyles.caption1,
    lineHeight: '16px',
    opacity: '0.85',
  },
  calloutBlockContainer: {
    ...typographyStyles.body1Strong,
    marginTop: '13px',
    color: tokens.colorNeutralForeground1,
    paddingLeft: '8px',
    display: 'block',
    forcedColorAdjust: 'none',
  },
  shapeStyles: {
    marginRight: '8px',
  },
  calloutlegendText: {
    ...typographyStyles.caption1,
    lineHeight: '16px',
    color: tokens.colorNeutralForeground2,
    forcedColorAdjust: 'auto',
  },
  calloutContentY: {
    ...typographyStyles.body1Strong,
    lineHeight: '22px',
    forcedColorAdjust: 'auto',
  },
  descriptionMessage: {
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground1,
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  legendsContainer: {
    width: '100%',
  },
});
export const useGaugeChartStyles = (props: GaugeChartProps): GaugeChartStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(gaugeChartClassNames.root, baseStyles.root, props.styles?.root),
    chart: mergeClasses(gaugeChartClassNames.chart, baseStyles.chart, props.styles?.chart),
    limits: mergeClasses(gaugeChartClassNames.limits, baseStyles.limits, props.styles?.limits),
    chartValue: mergeClasses(gaugeChartClassNames.chartValue, baseStyles.chartValue, props.styles?.chartValue),
    sublabel: mergeClasses(gaugeChartClassNames.sublabel, baseStyles.sublabel, props.styles?.sublabel),
    needle: mergeClasses(gaugeChartClassNames.needle, baseStyles.needle, props.styles?.needle),
    chartTitle: mergeClasses(gaugeChartClassNames.chartTitle, baseStyles.chartTitle, props.styles?.chartTitle),
    segment: mergeClasses(gaugeChartClassNames.segment, baseStyles.segment, props.styles?.segment),
    gradientSegment: mergeClasses(
      gaugeChartClassNames.gradientSegment,
      baseStyles.gradientSegment,
      props.styles?.gradientSegment,
    ),
    calloutContentRoot: mergeClasses(
      gaugeChartClassNames.calloutContentRoot,
      baseStyles.calloutContentRoot,
      props.styles?.calloutContentRoot,
    ),
    calloutDateTimeContainer: mergeClasses(
      gaugeChartClassNames.calloutDateTimeContainer,
      baseStyles.calloutDateTimeContainer,
      props.styles?.calloutDateTimeContainer,
    ),
    calloutContentX: mergeClasses(
      gaugeChartClassNames.calloutContentX,
      baseStyles.calloutContentX,
      props.styles?.calloutContentX,
    ),
    calloutBlockContainer: mergeClasses(
      gaugeChartClassNames.calloutBlockContainer,
      baseStyles.calloutBlockContainer,
      props.styles?.calloutBlockContainer,
    ),
    shapeStyles: mergeClasses(gaugeChartClassNames.shapeStyles, baseStyles.shapeStyles, props.styles?.shapeStyles),
    calloutlegendText: mergeClasses(
      gaugeChartClassNames.calloutlegendText,
      baseStyles.calloutlegendText,
      props.styles?.calloutlegendText,
    ),
    calloutContentY: mergeClasses(
      gaugeChartClassNames.calloutContentY,
      baseStyles.calloutContentY,
      props.styles?.calloutContentY,
    ),
    descriptionMessage: mergeClasses(
      gaugeChartClassNames.descriptionMessage,
      baseStyles.descriptionMessage,
      props.styles?.descriptionMessage,
    ),
    chartWrapper: mergeClasses(gaugeChartClassNames.chartWrapper, props.styles?.chartWrapper),
    legendsContainer: mergeClasses(
      gaugeChartClassNames.legendsContainer,
      baseStyles.legendsContainer,
      props.styles?.legendsContainer,
    ),
  };
};
