import { IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles } from './MultiStackedBarChart.types';

export const getMultiStackedBarChartStyles = (props: IMultiStackedBarChartStyleProps): IMultiStackedBarChartStyles => {
  const { className, width, barHeight, legendColor, shouldHighlight, theme, href } = props;
  const { fonts } = theme!;
  return {
    root: [
      theme.fonts.medium,
      'ms-StackedBarChart',
      {
        display: 'flex',
        flexDirection: 'column',
        width: width ? width : '100%',
      },
      className,
    ],
    items: {
      marginBottom: '11px',
    },
    chart: {
      width: '100%',
      height: barHeight ? barHeight : 16,
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: '12px',
      fontFamily: 'Segoe UI',
    },
    singleChartRoot: {
      width: width ? width : '100%',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '16px',
    },
    calloutContentRoot: [
      {
        display: 'grid',
        overflow: 'hidden',
        padding: '11px 16px 10px 16px',
        backgroundColor: theme.semanticColors.bodyBackground,
        backgroundBlendMode: 'normal, luminosity',
      },
    ],
    calloutContentX: [
      {
        ...fonts.small,
        lineHeight: '16px',
        opacity: '0.8',
        color: theme.semanticColors.bodySubtext,
      },
    ],
    calloutBlockContainer: {
      paddingLeft: '8px',
      lineHeight: '22px',
      color: theme.semanticColors.bodyText,
      borderLeft: `4px solid ${legendColor}`,
    },
    calloutlegendText: {
      ...fonts.small,
      lineHeight: '16px',
      color: theme.semanticColors.bodySubtext,
    },
    calloutContentY: [
      {
        ...fonts.xxLarge,
        color: legendColor ? legendColor : theme.semanticColors.bodySubtext,
        fontWeight: 'bold',
        lineHeight: '36px',
      },
    ],
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
      stroke: theme.palette.white,
      strokeWidth: 2,
    },
    placeHolderOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: 'default',
      stroke: theme.palette.white,
      strokeWidth: '2',
    },
    legendContainer: {
      marginTop: '5px',
    },
    noData: {
      cursor: href ? 'pointer' : 'default',
    },
  };
};
