import * as React from 'react';
import {
  IChartDataPoint,
  MultiStackedBarChart,
  IChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';

export const MultiStackedBarChartWithPlaceholderExample: React.FC = () => {
  const firstChartPoints: IChartDataPoint[] = [
    { legend: 'Malware', data: 40, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Phishing', data: 23, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Spam and bulk', data: 35, color: getColorFromToken(DataVizPalette.color3) },
    { data: 87, placeHolder: true },
  ];

  const secondChartPoints: IChartDataPoint[] = [
    { legend: 'Malicious links', data: 40, color: getColorFromToken(DataVizPalette.color4) },
    { legend: 'Malicious attachments', data: 23, color: getColorFromToken(DataVizPalette.color5) },
    { data: 106, placeHolder: true },
  ];

  const hideRatio: boolean[] = [true, true];

  const data: IChartProps[] = [
    {
      chartTitle: 'Currently blocked',
      chartData: firstChartPoints,
    },
    {
      chartTitle: 'Increased protection needed against detected threats',
      chartData: secondChartPoints,
    },
  ];

  return (
    <MultiStackedBarChart
      data={data}
      hideRatio={hideRatio}
      width={600}
      href={'https://developer.microsoft.com/en-us/'}
    />
  );
};
