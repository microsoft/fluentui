import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { ICartesianChartProps, ICartesianChartStyles } from './CartesianChart.types';
import { HighContrastSelectorBlack, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { NeutralColors, isIE11 } from '@fluentui/react';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens } from '@fluentui/react-theme';
import { isRtl } from '../../utilities/utilities';

const isIE11Var: boolean = isIE11();

/**
 * @internal
 */
export const cartesianchartClassNames: SlotClassNames<ICartesianChartStyles> = {
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
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  root: {
    fontSize: tokens.fontSizeBase300,
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    ...shorthands.overflow('hidden'),
  },
  chartWrapper: {
    ...shorthands.overflow('auto'),
  },
  axisTitle: {
    fontSize: tokens.fontSizeBase100,
    textAlign: 'center',
    fontWeight: tokens.fontWeightSemibold,
    fontStyle: 'normal',
    lineHeight: tokens.fontSizeBase100,
    color: NeutralColors.gray160,
    fill: tokens.colorNeutralForeground1,
  },
  xAxis: {
    text: {
      fill: tokens.colorNeutralForeground1,
      fontWeight: '600',
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: 'rgb(179, 179, 179)',
        },
      },
    },
    line: {
      opacity: 0.2,
      stroke: tokens.colorNeutralForeground1,
      width: '1px',
      selectors: {
        [HighContrastSelectorBlack]: {
          opacity: 0.1,
          stroke: 'rgb(179, 179, 179)',
        },
      },
    },
    path: {
      display: 'none',
    },
  },
  yAxis: {
    text: {
      fontSize: tokens.fontSizeBase100,
      fill: tokens.colorNeutralForeground1,
      fontWeight: '600',
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: 'rgb(179, 179, 179)',
        },
      },
    },
    line: {
      opacity: 0.2,
      stroke: tokens.colorNeutralForeground1,
      selectors: {
        [HighContrastSelectorBlack]: {
          opacity: 0.1,
          stroke: 'rgb(179, 179, 179)',
        },
      },
    },
    path: {
      display: 'none',
    },
    g: {
      ...(isRtl &&
        !isIE11Var && {
          textAnchor: 'end',
        }),
    },
  },
  opacityChangeOnHover: {
    opacity: '0.1', //supports custom opacity
    cursor: 'default', //supports custom cursor
  },
  legendContainer: {
    marginTop: '8px',
    marginLeft: '20px',
  },
  calloutContentRoot: {
    display: 'grid',
    ...shorthands.overflow('hidden'),
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
    fontSize: tokens.fontSizeBase200,
    lineHeight: '16px',
    opacity: '0.8',
    color: tokens.colorNeutralForeground2,
  },
  calloutBlockContainer: {
    fontSize: 'fontSizeBase400',
    marginTop: '13px',
    color: tokens.colorNeutralForeground2,
  },
  calloutBlockContainertoDrawShapefalse: {
    selectors: {
      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },
    ...shorthands.borderLeft('4px solid'),
    paddingLeft: '8px',
  },
  calloutBlockContainertoDrawShapetrue: {
    display: 'flex',
  },
  shapeStyles: {
    marginRight: '8px',
  },
  calloutLegendText: {
    fontSize: 'fontSizeBase200',
    lineHeight: '16px',
    color: tokens.colorNeutralForeground2,
    selectors: {
      [HighContrastSelectorBlack]: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
  calloutContentY: {
    fontSize: 'fontSizeBase400',
    fontWeight: 'bold',
    lineHeight: '22px',
    selectors: {
      [HighContrastSelectorBlack]: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
  descriptionMessage: {
    fontSize: 'fontSizeBase200',
    color: tokens.colorNeutralForeground2,
    marginTop: '10px',
    paddingTop: '10px',
    ...shorthands.borderTop(`1px solid ${tokens.colorNeutralStroke2}`),
  },
});
/**
 * Apply styling to the Carousel slots based on the state
 */
export const useCartesianChartStyles_unstable = (props: ICartesianChartProps): ICartesianChartStyles => {
  const baseStyles = useStyles();
  return {
    root: mergeClasses(cartesianchartClassNames.root, baseStyles.root /*props.styles?.root*/),
    chartWrapper: mergeClasses(
      cartesianchartClassNames.chartWrapper,
      baseStyles.chartWrapper /*props.styles?.chartWrapper*/,
    ),
    axisTitle: mergeClasses(cartesianchartClassNames.axisTitle, baseStyles.axisTitle /*props.styles?.axisTitle*/),
    xAxis: mergeClasses(cartesianchartClassNames.xAxis, baseStyles.xAxis /*props.styles?.xAxis*/),
    yAxis: mergeClasses(cartesianchartClassNames.yAxis, baseStyles.yAxis /*props.styles?.yAxis*/),
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
