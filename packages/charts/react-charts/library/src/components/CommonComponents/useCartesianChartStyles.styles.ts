'use client';

import { GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import { CartesianChartProps, CartesianChartStyles } from './CartesianChart.types';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { CARTESIAN_XAXIS_CLASSNAME, HighContrastSelector, useRtl } from '../../utilities/utilities';
import { getAxisTitleStyle, getTooltipStyle } from '../../utilities/index';

/**
 * @internal
 */
export const cartesianchartClassNames: SlotClassNames<CartesianChartStyles> = {
  root: 'fui-cart__root',
  chartWrapper: 'fui-cart__chartWrapper',
  plotContainer: 'fui-cart__plotContainer',
  axisTitle: 'fui-cart__axisTitle',
  xAxis: CARTESIAN_XAXIS_CLASSNAME,
  yAxis: 'fui-cart__yAxis',
  opacityChangeOnHover: 'fui-cart__opacityChangeOnHover',
  legendContainer: 'fui-cart__legendContainer',
  svgTooltip: 'fui-cart_svgTooltip',
  shapeStyles: 'fui-cart__shapeStyles',
  descriptionMessage: 'fui-cart__descriptionMessage',
  hover: 'fui-cart__hover',
  tooltip: 'fui-cart__tooltip',
  axisAnnotation: 'fui-cart__axisAnnotation',
  chartTitle: 'fui-cart__chartTitle',
  chart: 'fui-cart__chart',
  annotationLayer: 'fui-cart__annotationLayer',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  root: {
    ...typographyStyles.body1,
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    textAlign: 'left',
    position: 'relative',
  },
  chartWrapper: {
    position: 'relative',
  },
  chartWrapperMinWidth: {
    overflow: 'auto',
  },
  plotContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  axisTitle: getAxisTitleStyle() as GriffelStyle,
  axisAnnotation: getAxisTitleStyle() as GriffelStyle,
  xAxis: {
    '& text': {
      fill: tokens.colorNeutralForeground1,
      ...typographyStyles.caption2Strong,
      forcedColorAdjust: 'auto',
    },
    '& line': {
      opacity: 0.2,
      stroke: tokens.colorNeutralForeground1,
      width: '1px',
      forcedColorAdjust: 'auto',
    },
    '& path': {
      display: 'none',
    },
  },
  yAxis: {
    '& text': {
      ...typographyStyles.caption2Strong,
      fill: tokens.colorNeutralForeground1,
      forcedColorAdjust: 'auto',
    },
    '& line': {
      opacity: 0.2,
      stroke: tokens.colorNeutralForeground1,
      forcedColorAdjust: 'auto',
    },
    '& path': {
      display: 'none',
    },
  },
  rtl: {
    '& g': {
      textAnchor: 'end',
    },
  },
  ltr: {},
  opacityChangeOnHover: {
    opacity: '0.1', //supports custom opacity ??
    cursor: 'default', //supports custom cursor ??
  },
  legendContainer: {
    marginTop: tokens.spacingVerticalS,
    marginLeft: tokens.spacingHorizontalXL,
  },
  svgTooltip: {
    fill: tokens.colorNeutralBackground1,
    [HighContrastSelector]: {
      fill: 'Canvas',
    },
  },
  annotationLayer: {
    pointerEvents: 'none',
  },
  tooltip: getTooltipStyle() as GriffelStyle,
});
/**
 *
 * Apply styling to the Carousel slots based on the state
 */
export const useCartesianChartStyles = (props: CartesianChartProps): CartesianChartStyles => {
  const _useRtl = useRtl();
  const baseStyles = useStyles();
  return {
    root: mergeClasses(cartesianchartClassNames.root, baseStyles.root, props.styles?.root),
    chartWrapper: mergeClasses(
      cartesianchartClassNames.chartWrapper,
      baseStyles.chartWrapper,
      props.reflowProps?.mode === 'min-width' ? baseStyles.chartWrapperMinWidth : undefined,
      props.styles?.chartWrapper,
    ),
    plotContainer: mergeClasses(
      cartesianchartClassNames.plotContainer,
      baseStyles.plotContainer /*props.styles?.plotContainer*/,
    ),
    axisTitle: mergeClasses(cartesianchartClassNames.axisTitle, baseStyles.axisTitle /*props.styles?.axisTitle*/),
    xAxis: mergeClasses(cartesianchartClassNames.xAxis, baseStyles.xAxis /*props.styles?.xAxis*/),
    yAxis: mergeClasses(
      cartesianchartClassNames.yAxis,
      baseStyles.yAxis,
      _useRtl ? baseStyles.rtl : baseStyles.ltr /*props.styles?.yAxis*/,
    ),
    opacityChangeOnHover: mergeClasses(
      cartesianchartClassNames.opacityChangeOnHover,
      baseStyles.opacityChangeOnHover /*props.styles?.opacityChangeOnHover*/,
    ),
    legendContainer: mergeClasses(
      cartesianchartClassNames.legendContainer,
      baseStyles.legendContainer /*props.styles?.legendContainer*/,
    ),
    svgTooltip: mergeClasses(cartesianchartClassNames.svgTooltip, baseStyles.svgTooltip, props.styles?.svgTooltip),
    annotationLayer: mergeClasses(
      cartesianchartClassNames.annotationLayer,
      baseStyles.annotationLayer /*props.styles?.annotationLayer*/,
    ),
    tooltip: mergeClasses(cartesianchartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    axisAnnotation: mergeClasses(
      cartesianchartClassNames.axisAnnotation,
      baseStyles.axisAnnotation,
      /*props.styles?.axisAnnotation,*/
    ),
    chart: mergeClasses(cartesianchartClassNames.chart, props.styles?.chart),
  };
};
