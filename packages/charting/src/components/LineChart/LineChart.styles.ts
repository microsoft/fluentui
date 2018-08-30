import { ILineChartStyleProps, ILineChartStyles } from './LineChart.types';

export const getStyles = (props: ILineChartStyleProps): ILineChartStyles => {
  const { className, theme, width, height, color } = props;
  const { palette } = theme!;

  const chartPadding = 30;
  const scalingVal = 0.3;
  const xOffset = 20;

  return {
    root: [
      'ms-LineChart',
      className,
      {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
      }
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
        transform: `translate(-${width * 0.3}px, 0px) scaleX(1.5)`
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
        fontSize: '28px',
        color: color !== '' ? `${color}` : palette.black,
        fontFamily: 'Segoe UI',
        fontWeight: 'bold',
        border: color !== '' ? `1px solid ${color}` : `unset`
      }
    ]
  };
};
