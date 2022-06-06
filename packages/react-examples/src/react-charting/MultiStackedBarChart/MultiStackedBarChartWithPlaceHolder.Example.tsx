import * as React from 'react';
import { IChartDataPoint, MultiStackedBarChart, IChartProps } from '@fluentui/react-charting';

export const MultiStackedBarChartWithPlaceholderExample: React.FC = () => {
  const firstChartPoints: IChartDataPoint[] = [
    { legend: 'Malware', data: 40, color: '#0099BC' },
    { legend: 'Phishing', data: 23, color: '#77004D' },
    { legend: 'Spam and bulk', data: 35, color: '#4F68ED' },
    { data: 87, placeHolder: true },
  ];

  const secondChartPoints: IChartDataPoint[] = [
    { legend: 'Malicious links', data: 40, color: '#AE8C00' },
    {
      legend: 'Malicious attachments',
      data: 23,
      color: '#004E8C',
    },
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
