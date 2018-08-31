import { ILineChartStyleProps, ILineChartStyles } from './LineChart.types';

export const getStyles = (props: ILineChartStyleProps): ILineChartStyles => {
  const { className, theme, width, height, color } = props;
  const { palette, fonts } = theme!;
  console.log('fonts', fonts);

  const chartPadding = 30;
  const scalingVal = 0.3;
  const xOffset = 20;

  return {
    root: [
      'ms-LineChart',
      {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
      },
      className
    ],
    chart: [
      {
        padding: chartPadding,
        boxSizing: 'content-box'
      }
    ],
    chartLabel: [
      {
        textAlign: 'center',
        ...theme.fonts.mediumPlus
      }
    ],
    xAxis: [
      {
        transform: `translate(-${width * scalingVal}px, ${height}px) scaleX(1.5)`
      }
    ],
    xAxisTicks: [],
    yAxis: [
      {
        transform: `translate(-${width * scalingVal}px, 0px)`
      }
    ],
    yAxisTicks: [
      {
        transform: `scaleX(-${width * scalingVal - xOffset})`,
        stroke: 'grey'
      }
    ],
    yAxisDomain: [
      {
        transform: 'scaleX(0)'
      }
    ],
    xAxisDomain: [
      {
        transform: 'scaleY(0)'
      }
    ],
    xAxisText: [
      {
        transform: `translate(0px,13px)`
      }
    ],
    lines: [
      {
        transform: `translate(-${width * scalingVal}px, 0px) scaleX(1.5)`
      }
    ],
    legendContainer: [
      {
        marginTop: '10px',
        paddingLeft: '5%'
      }
    ],
    calloutPadding: [
      {
        padding: '10px 16px 10px 16px',
        backgroundColor: palette.white,
        fontSize: fonts.xxLarge.fontSize,
        color: color !== '' ? `${color}` : palette.black,
        fontFamily: fonts.xxLarge.fontFamily,
        fontWeight: 'bold',
        border: color !== '' ? `1px solid ${color}` : `unset`
      }
    ]
  };
};
