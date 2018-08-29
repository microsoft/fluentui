import * as React from 'react';
import { IChartProps } from '@uifabric/charting';
import { HorizontalBarChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export const HorizontalBarChartBasicExample: React.SFC<{}> = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [{ legend: 'one', data: 13888, color: DefaultPalette.tealDark }]
    },
    {
      chartTitle: 'two',
      chartData: [{ legend: 'two', data: 800, color: DefaultPalette.purple }]
    },
    {
      chartTitle: 'three',
      chartData: [{ legend: 'three', data: 8888, color: DefaultPalette.redDark }]
    },
    {
      chartTitle: 'four',
      chartData: [{ legend: 'four', data: 15888, color: DefaultPalette.themeDarkAlt }]
    },
    {
      chartTitle: 'five',
      chartData: [{ legend: 'five', data: 11444, color: DefaultPalette.themePrimary }]
    },
    {
      chartTitle: 'six',
      chartData: [{ legend: 'six', data: 14000, color: DefaultPalette.greenDark }]
    },
    {
      chartTitle: 'seven',
      chartData: [{ legend: 'seven', data: 9855, color: DefaultPalette.accent }]
    },
    {
      chartTitle: 'eight',
      chartData: [{ legend: 'eight', data: 4250, color: DefaultPalette.blueLight }]
    }
  ];

  return <HorizontalBarChart data={data} hideRatio={hideRatio} width={600} total={15000} />;
};
