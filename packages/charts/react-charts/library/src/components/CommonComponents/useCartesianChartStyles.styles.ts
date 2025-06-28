import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { CartesianChartProps, CartesianChartStyles } from './CartesianChart.types';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { HighContrastSelector, useRtl } from '../../utilities/utilities';

/**
 * @internal
 */
export const cartesianchartClassNames: SlotClassNames<CartesianChartStyles> = {
  root: 'fui-cart__root',
  chartWrapper: 'fui-cart__chartWrapper',
  axisTitle: 'fui-cart__axisTitle',
  xAxis: 'fui-cart__xAxis',
  yAxis: 'fui-cart__yAxis',
  opacityChangeOnHover: 'fui-cart__opacityChangeOnHover',
  legendContainer: 'fui-cart__legendContainer',
  svgTooltip: 'fui-cart_svgTooltip',
  shapeStyles: 'fui-cart__shapeStyles',
  descriptionMessage: 'fui-cart__descriptionMessage',
  hover: 'fui-cart__hover',
  tooltip: 'fui-cart__tooltip',
  chartTitle: 'fui-cart__chartTitle',
  chart: 'fui-cart__chart',
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
  },
  chartWrapper: {
    overflow: 'auto',
  },
  axisTitle: {
    ...typographyStyles.caption2Strong,
    fontStyle: 'normal',
    textAlign: 'center',
    color: tokens.colorNeutralForeground2,
    fill: tokens.colorNeutralForeground1,
    [HighContrastSelector]: {
      fill: 'CanvasText',
    },
  },
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
  },
});
/**
 * Apply styling to the Carousel slots based on the state
 */
export const useCartesianChartStyles = (props: CartesianChartProps): CartesianChartStyles => {
  const _useRtl = useRtl();
  const baseStyles = useStyles();
  return {
    root: mergeClasses(cartesianchartClassNames.root, baseStyles.root, props.styles?.root),
    chartWrapper: mergeClasses(
      cartesianchartClassNames.chartWrapper,
      props.enableReflow ? baseStyles.chartWrapper : '',
      props.styles?.chartWrapper,
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
    svgTooltip: mergeClasses(cartesianchartClassNames.svgTooltip, baseStyles.svgTooltip /*props.styles?.svgTooltip*/),
    tooltip: mergeClasses(cartesianchartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    chart: mergeClasses(cartesianchartClassNames.chart, props.styles?.chart),
  };
};
