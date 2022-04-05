import * as React from 'react';
import { IChartDataPoint, MultiStackedBarChart, IChartProps } from '@fluentui/react-charting';

export const MultiStackedBarChartWithPlaceholderExample: React.FunctionComponent<{}> = () => {
  const firstChartPoints: IChartDataPoint[] = [
    { legend: 'Malware', data: 40, color: '#0A7D3C' },
    { legend: 'Phishing', data: 23, color: '#662D91' },
    { legend: 'Spam and bulk', data: 35, color: '#0078D4' },
    { data: 87, placeHolder: true },
  ];

  const secondChartPoints: IChartDataPoint[] = [
    { legend: 'Malicious links', data: 40, color: '#BE4A1C' },
    { legend: 'Malicious attachments', data: 23, color: '#038387' },
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
