import { IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';
import { FontSizes, FontWeights, HighContrastSelector, IStyle } from '@fluentui/react/lib/Styling';

export const getStyles = (props: IStackedBarChartStyleProps): IStackedBarChartStyles => {
  const {
    className,
    width,
    barHeight,
    shouldHighlight,
    theme,
    href,
    benchmarkColor,
    benchmarkRatio,
    targetColor,
    targetRatio,
    showTriangle,
  } = props;
  return {
    root: [
      theme.fonts.medium,
      'ms-StackedBarChart',
      {
        width: width ? width : '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      className,
    ],
    chart: {
      width: '100%',
      height: barHeight ? barHeight : 12,
      display: 'block',
      marginBottom: showTriangle ? '16px' : '10px',
      overflow: 'visible',
    },
    chartTitle: {
      ...theme.fonts.small,
      display: 'flex',
      justifyContent: 'space-between',
    },
    chartTitleLeft: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'block',
      color: theme.palette.neutralPrimary,
      marginBottom: '5px',
    },
    legendContainer: {
      margin: '4px 0px 0px 4px',
    },
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
      selectors: {
        '&:focus': {
          stroke: theme.palette.black,
          strokeWidth: '2px',
        },
      },
    },
    ratioNumerator: {
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semibold,
      color: theme.palette.neutralPrimary,
    },
    ratioDenominator: {
      fontSize: FontSizes.medium,
      color: theme.palette.neutralPrimary,
    },
    benchmarkContainer: {
      position: 'relative',
      height: '7px',
      marginTop: '-3px',
      marginBottom: '-1px',
    },
    benchmark: {
      position: 'absolute',
      left: 'calc(' + benchmarkRatio + '% - 4px)',
      width: '0',
      height: '0',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '7px solid',
      borderTopColor: benchmarkColor,
      marginBottom: '4px',
      selectors: {
        [HighContrastSelector]: {
          border: '0px',
          height: '7px',
          width: '7px',
          clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
          backgroundImage: `linear-gradient(to right, ${benchmarkColor}, ${benchmarkColor})`,
        } as IStyle,
      },
    },
    target: {
      position: 'absolute',
      left: 'calc(' + targetRatio + '% - 4px)',
      width: '0',
      height: '0',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '7px solid',
      borderTopColor: targetColor,
      marginBottom: '4px',
      selectors: {
        [HighContrastSelector]: {
          border: '0px',
          height: '7px',
          width: '7px',
          clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
          backgroundImage: `linear-gradient(to right, ${targetColor}, ${targetColor})`,
        } as IStyle,
      },
    },
  };
};
