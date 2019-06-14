import * as React from 'react';
import { HorizontalBarChart, IChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export const HorizontalBarChartBasicExample: React.FunctionComponent<{}> = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [{ legend: 'one', horizontalBarChartdata: { x: 1543, y: 15000 }, color: DefaultPalette.tealDark }]
    },
    {
      chartTitle: 'two',
      chartData: [{ legend: 'two', horizontalBarChartdata: { x: 800, y: 15000 }, color: DefaultPalette.purple }]
    },
    {
      chartTitle: 'three',
      chartData: [{ legend: 'three', horizontalBarChartdata: { x: 8888, y: 15000 }, color: DefaultPalette.redDark }]
    },
    {
      chartTitle: 'four',
      chartData: [{ legend: 'four', horizontalBarChartdata: { x: 15888, y: 15000 }, color: DefaultPalette.themeDarkAlt }]
    },
    {
      chartTitle: 'five',
      chartData: [{ legend: 'five', horizontalBarChartdata: { x: 11444, y: 15000 }, color: DefaultPalette.themePrimary }]
    },
    {
      chartTitle: 'six',
      chartData: [{ legend: 'six', horizontalBarChartdata: { x: 14000, y: 15000 }, color: DefaultPalette.greenDark }]
    },
    {
      chartTitle: 'seven',
      chartData: [{ legend: 'seven', horizontalBarChartdata: { x: 9855, y: 15000 }, color: DefaultPalette.accent }]
    },
    {
      chartTitle: 'eight',
      chartData: [{ legend: 'eight', horizontalBarChartdata: { x: 4250, y: 15000 }, color: DefaultPalette.blueLight }]
    }
  ];

  return <HorizontalBarChart data={data} hideRatio={hideRatio} width={600} />;
};
