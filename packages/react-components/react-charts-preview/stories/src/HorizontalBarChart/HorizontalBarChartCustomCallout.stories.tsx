import * as React from 'react';
import {
  HorizontalBarChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts-preview';
import { DirectionalHint } from '@fluentui/react';
import * as d3 from 'd3-format';
import PopoverComponent from '../../../library/src/components/CommonComponents/Popover';

export const HBCCustomCallout = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, y: 15000 },
          color: getColorFromToken(DataVizPalette.color28),
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
          color: getColorFromToken(DataVizPalette.color29),
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
          color: getColorFromToken(DataVizPalette.color30),
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
          color: getColorFromToken(DataVizPalette.color31),
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
          color: getColorFromToken(DataVizPalette.color32),
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
          color: getColorFromToken(DataVizPalette.color33),
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
          color: getColorFromToken(DataVizPalette.color34),
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
          color: getColorFromToken(DataVizPalette.color35),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '4.3K',
        },
      ],
    },
  ];
  return (
    <div style={{ maxWidth: 600 }}>
      <HorizontalBarChart
        data={data}
        hideRatio={hideRatio}
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
            <PopoverComponent
              xCalloutValue={props.xAxisCalloutData}
              yCalloutValue={`${props.yAxisCalloutData || props.horizontalBarChartdata?.y} h`}
              legend={props.legend}
              color={props.color}
              isCalloutForStack={false}
            />
          ) : null
        }
      />
    </div>
  );
};
HBCCustomCallout.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};
