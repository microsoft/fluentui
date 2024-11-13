import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { CartesianChartProps, CartesianChartStyles } from './CartesianChart.types';
import { HighContrastSelectorBlack, HighContrastSelector } from '../../utilities/index';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useRtl } from '../../utilities/utilities';

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
  calloutContentRoot: 'fui-cart__calloutContentRoot',
  calloutDateTimeContainer: 'fui-cart__calloutDateTimeContainer',
  calloutContentX: 'fui-cart__calloutContentX',
  calloutBlockContainer: 'fui-cart__calloutBlockContainer',
  calloutBlockContainertoDrawShapefalse: 'fui-cart__calloutBlockContainertoDrawShapefalse',
  calloutBlockContainertoDrawShapetrue: 'fui-cart__calloutBlockContainertoDrawShapetrue',
  shapeStyles: 'fui-cart__shapeStyles',
  calloutlegendText: 'fui-cart__calloutlegendText',
  calloutContentY: 'fui-cart__calloutContentY',
  descriptionMessage: 'fui-cart__descriptionMessage',
  hover: 'fui-cart__hover',
  calloutInfoContainer: 'fui-cart__calloutInfoContainer',
  tooltip: 'fui-cart__tooltip',
  chartTitle: 'fui-cart__chartTitle',
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
  },
  xAxis: {
    '& text': {
      fill: tokens.colorNeutralForeground1,
      ...typographyStyles.caption2Strong,
      [HighContrastSelectorBlack]: {
        fill: 'rgb(179, 179, 179)',
        forcedColorAdjust: 'none',
      },
    },
    '& line': {
      opacity: 0.2,
      stroke: tokens.colorNeutralForeground1,
      width: '1px',
      [HighContrastSelectorBlack]: {
        opacity: 0.1,
        stroke: 'rgb(179, 179, 179)',
        forcedColorAdjust: 'none',
      },
    },
    '& path': {
      display: 'none',
    },
  },
  yAxis: {
    '& text': {
      ...typographyStyles.caption2Strong,
      fill: tokens.colorNeutralForeground1,
      [HighContrastSelectorBlack]: {
        fill: 'rgb(179, 179, 179)',
        forcedColorAdjust: 'none',
      },
    },
    '& line': {
      opacity: 0.2,
      stroke: tokens.colorNeutralForeground1,
      [HighContrastSelectorBlack]: {
        opacity: 0.1,
        stroke: 'rgb(179, 179, 179)',
        forcedColorAdjust: 'none',
      },
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
  calloutContentRoot: {
    display: 'grid',
    overflow: 'hidden',
    ...shorthands.padding('11px 16px 10px 16px'),
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
    opacity: '0.8',
    color: tokens.colorNeutralForeground2,
  },
  calloutBlockContainer: {
    ...typographyStyles.body2,
    marginTop: '13px',
    color: tokens.colorNeutralForeground2,
  },
  calloutBlockContainertoDrawShapefalse: {
    [HighContrastSelector]: {
      forcedColorAdjust: 'none',
    },
    ...shorthands.borderLeft('4px solid'),
    paddingLeft: tokens.spacingHorizontalS,
  },
  calloutBlockContainertoDrawShapetrue: {
    display: 'flex',
  },
  shapeStyles: {
    marginRight: tokens.spacingHorizontalS,
  },
  calloutLegendText: {
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground2,
    [HighContrastSelectorBlack]: {
      color: 'rgb(255, 255, 255)',
      forcedColorAdjust: 'none',
    },
  },
  calloutContentY: {
    ...typographyStyles.subtitle2Stronger,
    [HighContrastSelectorBlack]: {
      color: 'rgb(255, 255, 255)',
      forcedColorAdjust: 'none',
    },
  },
  descriptionMessage: {
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalMNudge,
    paddingTop: tokens.spacingVerticalMNudge,
    ...shorthands.borderTop(`1px solid ${tokens.colorNeutralStroke2}`),
  },
});
/**
 * Apply styling to the Carousel slots based on the state
 */
export const useCartesianChartStyles_unstable = (props: CartesianChartProps): CartesianChartStyles => {
  const _useRtl = useRtl();
  const baseStyles = useStyles();
  return {
    root: mergeClasses(cartesianchartClassNames.root, baseStyles.root /*props.styles?.root*/),
    chartWrapper: mergeClasses(
      cartesianchartClassNames.chartWrapper,
      baseStyles.chartWrapper /*props.styles?.chartWrapper*/,
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
    calloutContentRoot: mergeClasses(
      cartesianchartClassNames.calloutContentRoot,
      baseStyles.calloutContentRoot /*props.styles?. calloutContentRoot*/,
    ),
    calloutDateTimeContainer: mergeClasses(
      cartesianchartClassNames.calloutDateTimeContainer,
      baseStyles.calloutDateTimeContainer /*props.styles?.calloutDateTimeContainer*/,
    ),
    calloutContentX: mergeClasses(
      cartesianchartClassNames.calloutContentX,
      baseStyles.calloutContentX /*props.styles?.calloutContentX*/,
    ),
    calloutBlockContainer: mergeClasses(
      cartesianchartClassNames.calloutBlockContainer,
      baseStyles.calloutBlockContainer /*props.styles?.calloutBlockContainer*/,
    ),
    calloutBlockContainertoDrawShapefalse: mergeClasses(
      cartesianchartClassNames.calloutBlockContainertoDrawShapefalse,
      baseStyles.calloutBlockContainertoDrawShapefalse /*props.styles?.calloutBlockContainertoDrawShapefalse*/,
    ),
    calloutBlockContainertoDrawShapetrue: mergeClasses(
      cartesianchartClassNames.calloutBlockContainertoDrawShapetrue,
      baseStyles.calloutBlockContainertoDrawShapetrue /*props.styles?.calloutBlockContainertoDrawShapetrue*/,
    ),
    shapeStyles: mergeClasses(
      cartesianchartClassNames.shapeStyles,
      baseStyles.shapeStyles /*props.styles?.shapeStyles*/,
    ),
    calloutlegendText: mergeClasses(
      cartesianchartClassNames.calloutlegendText,
      baseStyles.calloutLegendText /*props.styles?.calloutlegendText*/,
    ),
    calloutContentY: mergeClasses(
      cartesianchartClassNames.calloutContentY,
      baseStyles.calloutContentY /*props.styles?.calloutContentY*/,
    ),
    descriptionMessage: mergeClasses(
      cartesianchartClassNames.descriptionMessage,
      baseStyles.descriptionMessage /*props.styles?. descriptionMessage*/,
    ),
  };
};
