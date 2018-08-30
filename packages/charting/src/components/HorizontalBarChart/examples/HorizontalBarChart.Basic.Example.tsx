import * as React from 'react';
import { HorizontalBarChart, IChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export const HorizontalBarChartBasicExample: React.SFC<{}> = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [{ legend: 'one', horizentalBarChartdata: { x: 1543, y: 15000 }, color: DefaultPalette.tealDark }]
    },
    {
      chartTitle: 'two',
      chartData: [{ legend: 'two', horizentalBarChartdata: { x: 800, y: 15000 }, color: DefaultPalette.purple }]
    },
    {
      chartTitle: 'three',
      chartData: [{ legend: 'three', horizentalBarChartdata: { x: 8888, y: 15000 }, color: DefaultPalette.redDark }]
    },
    {
      chartTitle: 'four',
      chartData: [
        { legend: 'four', horizentalBarChartdata: { x: 15888, y: 15000 }, color: DefaultPalette.themeDarkAlt }
      ]
    },
    {
      chartTitle: 'five',
      chartData: [
        { legend: 'five', horizentalBarChartdata: { x: 11444, y: 15000 }, color: DefaultPalette.themePrimary }
      ]
    },
    {
      chartTitle: 'six',
      chartData: [{ legend: 'six', horizentalBarChartdata: { x: 14000, y: 15000 }, color: DefaultPalette.greenDark }]
    },
    {
      chartTitle: 'seven',
      chartData: [{ legend: 'seven', horizentalBarChartdata: { x: 9855, y: 15000 }, color: DefaultPalette.accent }]
    },
    {
      chartTitle: 'eight',
      chartData: [{ legend: 'eight', horizentalBarChartdata: { x: 4250, y: 15000 }, color: DefaultPalette.blueLight }]
    }
  ];

  return <HorizontalBarChart data={data} hideRatio={hideRatio} width={600} />;
};
