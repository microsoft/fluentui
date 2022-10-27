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
      height: barHeight ? barHeight : 16,
      marginBottom: '12px',
    },
    chartTitle: {
      ...theme.fonts.small,
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '3px',
    },
    chartTitleLeft: {
      fontWeight: FontWeights.bold,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'block',
    },
    legendContainer: {
      margin: '4px 0px 0px 4px',
    },
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
      stroke: theme.palette.white,
      strokeWidth: 2,
      selectors: {
        '&:focus': {
          stroke: theme.palette.black,
          strokeWidth: '2px',
        },
      },
    },
    ratioNumerator: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
      color: theme.palette.black,
    },
    ratioDenominator: {
      fontSize: FontSizes.small,
      color: theme.palette.black,
      opacity: '0.6',
    },
    benchmarkContainer: {
      position: 'relative',
      height: '12px',
    },
    benchmark: {
      position: 'absolute',
      left: 'calc(' + benchmarkRatio + '% - 4.5px)',
      width: '0',
      height: '0',
      borderLeft: '4.5px solid transparent',
      borderRight: '4.5px solid transparent',
      borderTop: '7.8px solid',
      borderTopColor: benchmarkColor,
      marginBottom: '4px',
      selectors: {
        [HighContrastSelector]: {
          border: '0px',
          height: '7.8px',
          width: '7.8px',
          clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
          backgroundImage: `linear-gradient(to right, ${benchmarkColor}, ${benchmarkColor})`,
        } as IStyle,
      },
    },
    target: {
      position: 'absolute',
      left: 'calc(' + targetRatio + '% - 4.5px)',
      width: '0',
      height: '0',
      borderLeft: '4.5px solid transparent',
      borderRight: '4.5px solid transparent',
      borderTop: '7.8px solid',
      borderTopColor: targetColor,
      marginBottom: '4px',
      selectors: {
        [HighContrastSelector]: {
          border: '0px',
          height: '7.8px',
          width: '7.8px',
          clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
          backgroundImage: `linear-gradient(to right, ${targetColor}, ${targetColor})`,
        } as IStyle,
      },
    },
  };
};
