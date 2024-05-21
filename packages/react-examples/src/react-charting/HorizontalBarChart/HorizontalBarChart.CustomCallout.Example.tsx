import * as React from 'react';
import {
  ChartHoverCard,
  HorizontalBarChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { DirectionalHint, ThemeContext } from '@fluentui/react';
import * as d3 from 'd3-format';

export const HorizontalBarChartCustomCalloutExample: React.FunctionComponent<{}> = () => {
  const hideRatio: boolean[] = [true, false];

  const theme = React.useContext(ThemeContext);

  const getData = (isDarkMode: boolean): IChartProps[] => {
    return [
      {
        chartTitle: 'one',
        chartData: [
          {
            legend: 'one',
            horizontalBarChartdata: { x: 1543, y: 15000 },
            color: getColorFromToken(DataVizPalette.color28, isDarkMode),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '1.5K',
          },
        ],
      },
      {
        chartTitle: 'two',
        chartData: [
          {
            legend: 'two',
            horizontalBarChartdata: { x: 800, y: 15000 },
            color: getColorFromToken(DataVizPalette.color29, isDarkMode),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '800',
          },
        ],
      },
      {
        chartTitle: 'three',
        chartData: [
          {
            legend: 'three',
            horizontalBarChartdata: { x: 8888, y: 15000 },
            color: getColorFromToken(DataVizPalette.color30, isDarkMode),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '8.8K',
          },
        ],
      },
      {
        chartTitle: 'four',
        chartData: [
          {
            legend: 'four',
            horizontalBarChartdata: { x: 15888, y: 15000 },
            color: getColorFromToken(DataVizPalette.color31, isDarkMode),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '16K',
          },
        ],
      },
      {
        chartTitle: 'five',
        chartData: [
          {
            legend: 'five',
            horizontalBarChartdata: { x: 11444, y: 15000 },
            color: getColorFromToken(DataVizPalette.color32, isDarkMode),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '11K',
          },
        ],
      },
      {
        chartTitle: 'six',
        chartData: [
          {
            legend: 'six',
            horizontalBarChartdata: { x: 14000, y: 15000 },
            color: getColorFromToken(DataVizPalette.color33, isDarkMode),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '14K',
          },
        ],
      },
      {
        chartTitle: 'seven',
        chartData: [
          {
            legend: 'seven',
            horizontalBarChartdata: { x: 9855, y: 15000 },
            color: getColorFromToken(DataVizPalette.color34, isDarkMode),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '9.9K',
          },
        ],
      },
      {
        chartTitle: 'eight',
        chartData: [
          {
            legend: 'eight',
            horizontalBarChartdata: { x: 4250, y: 15000 },
            color: getColorFromToken(DataVizPalette.color35, isDarkMode),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '4.3K',
          },
        ],
      },
    ];
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <HorizontalBarChart
        data={getData(theme?.isInverted ?? false)}
        hideRatio={hideRatio}
        calloutProps={{
          directionalHint: DirectionalHint.topAutoEdge,
        }}
        // eslint-disable-next-line react/jsx-no-bind
        barChartCustomData={(props: IChartProps) => {
          const chartData: IChartDataPoint = props!.chartData![0];
          const x = chartData.horizontalBarChartdata!.x;
          const y = chartData.horizontalBarChartdata!.y;
          return (
            <div>
              <span style={{ fontWeight: 'bold' }}>{d3.format('.2s')(x)}</span>
              <span>{`/${d3.format('.2s')(y)} hours`}</span>
            </div>
          );
        }}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderCalloutPerHorizontalBar={(props: IChartDataPoint) =>
          props ? (
            <ChartHoverCard
              XValue={props.xAxisCalloutData}
              Legend={props.legend}
              YValue={`${props.yAxisCalloutData || props.horizontalBarChartdata?.y} h`}
              color={props.color}
            />
          ) : null
        }
      />
    </div>
  );
};
