import * as React from 'react';
import { ChartHoverCard, HorizontalBarChart, IChartProps, IChartDataPoint } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { DirectionalHint } from 'office-ui-fabric-react';

export const HorizontalBarChartCustomCalloutExample: React.FunctionComponent<{}> = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, y: 15000 },
          color: DefaultPalette.tealDark,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '94%',
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, y: 15000 },
          color: DefaultPalette.purple,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '19%',
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, y: 15000 },
          color: DefaultPalette.redDark,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '89%',
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, y: 15000 },
          color: DefaultPalette.themeDarkAlt,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '29%',
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, y: 15000 },
          color: DefaultPalette.themePrimary,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '39%',
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, y: 15000 },
          color: DefaultPalette.greenDark,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '49%',
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, y: 15000 },
          color: DefaultPalette.accent,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '79%',
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, y: 15000 },
          color: DefaultPalette.blueLight,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '79%',
        },
      ],
    },
  ];

  return (
    <HorizontalBarChart
      data={data}
      hideRatio={hideRatio}
      calloutProps={{
        directionalHint: DirectionalHint.topCenter,
      }}
      // eslint-disable-next-line react/jsx-no-bind
      onRenderCalloutPerHorizonalBar={(props: IChartDataPoint) =>
        props ? (
          <ChartHoverCard
            XValue={props.xAxisCalloutData}
            Legend={props.legend}
            YValue={`${props.yAxisCalloutData || props.horizontalBarChartdata?.y} h`}
            color={props.color}
          />
        ) : null
      }
      width={600}
    />
  );
};
