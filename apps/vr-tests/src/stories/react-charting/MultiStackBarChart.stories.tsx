import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import {
  IChartProps,
  IChartDataPoint,
  MultiStackedBarChart,
  MultiStackedBarChartVariant,
} from '@fluentui/react-charting';

storiesOf('react-charting/MultiStackBarChart', module)
  .addDecorator((story, context) => TestWrapperDecorator(story, context))
  .addDecorator((story, context) => {
    const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
    return <StoryWright steps={steps}>{story()}</StoryWright>;
  })
  .addStory(
    'Basic_Absolute',
    () => {
      const chartPoints1: IChartDataPoint[] = [
        {
          legend: 'Debit card numbers (EU and USA)',
          data: 40,
          color: '#0099BC',
        },
        {
          legend: 'Passport numbers (USA)',
          data: 23,
          color: '#77004D',
        },
        {
          legend: 'Social security numbers',
          data: 35,
          color: '#4F68ED',
        },
        {
          legend: 'Credit card numbers',
          data: 87,
          color: '#AE8C00',
        },
        {
          legend: 'Tax identification numbers (USA)',
          data: 87,
          color: '#004E8C',
        },
      ];

      const chartPoints2: IChartDataPoint[] = [
        {
          legend: 'Debit card numbers (EU and USA)',
          data: 40,
          color: '#0099BC',
        },
        {
          legend: 'Passport numbers (USA)',
          data: 56,
          color: '#77004D',
        },
        {
          legend: 'Social security numbers',
          data: 35,
          color: '#4F68ED',
        },
        {
          legend: 'Credit card numbers',
          data: 92,
          color: '#AE8C00',
        },
        {
          legend: 'Tax identification numbers (USA)',
          data: 87,
          color: '#004E8C',
        },
      ];

      const chartPoints3: IChartDataPoint[] = [
        {
          legend: 'Phone Numbers',
          data: 40,
          color: '#881798',
        },
        {
          legend: 'Credit card Numbers',
          data: 23,
          color: '#AE8C00',
        },
      ];

      const data: IChartProps[] = [
        {
          chartTitle: 'Monitored First',
          chartData: chartPoints1,
        },
        {
          chartTitle: 'Monitored Second',
          chartData: chartPoints2,
        },
        {
          chartTitle: 'Unmonitored',
          chartData: chartPoints3,
        },
      ];

      return (
        <div style={{ padding: 10, width: 800 }}>
          <MultiStackedBarChart
            data={data}
            variant={MultiStackedBarChartVariant.AbsoluteScale}
            hideLabels={false}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Basic_PartToWhole',
    () => {
      const chartPoints1: IChartDataPoint[] = [
        {
          legend: 'Debit card numbers (EU and USA)',
          data: 40,
          color: '#0099BC',
        },
        {
          legend: 'Passport numbers (USA)',
          data: 23,
          color: '#77004D',
        },
        {
          legend: 'Social security numbers',
          data: 35,
          color: '#4F68ED',
        },
        {
          legend: 'Credit card numbers',
          data: 87,
          color: '#AE8C00',
        },
        {
          legend: 'Tax identification numbers (USA)',
          data: 87,
          color: '#004E8C',
        },
      ];

      const chartPoints2: IChartDataPoint[] = [
        {
          legend: 'Debit card numbers (EU and USA)',
          data: 40,
          color: '#0099BC',
        },
        {
          legend: 'Passport numbers (USA)',
          data: 56,
          color: '#77004D',
        },
        {
          legend: 'Social security numbers',
          data: 35,
          color: '#4F68ED',
        },
        {
          legend: 'Credit card numbers',
          data: 92,
          color: '#AE8C00',
        },
        {
          legend: 'Tax identification numbers (USA)',
          data: 87,
          color: '#004E8C',
        },
      ];

      const chartPoints3: IChartDataPoint[] = [
        {
          legend: 'Phone Numbers',
          data: 40,
          color: '#881798',
        },
        {
          legend: 'Credit card Numbers',
          data: 23,
          color: '#AE8C00',
        },
      ];

      const data: IChartProps[] = [
        {
          chartTitle: 'Monitored First',
          chartData: chartPoints1,
        },
        {
          chartTitle: 'Monitored Second',
          chartData: chartPoints2,
        },
        {
          chartTitle: 'Unmonitored',
          chartData: chartPoints3,
        },
      ];

      return (
        <div style={{ padding: 10, width: 800 }}>
          <MultiStackedBarChart
            data={data}
            variant={MultiStackedBarChartVariant.PartToWhole}
            hideLabels={false}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'With_Placeholders',
    () => {
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
        <div style={{ padding: 10, width: 600 }}>
          <MultiStackedBarChart
            data={data}
            hideRatio={hideRatio}
            width={600}
            href={'https://developer.microsoft.com/en-us/'}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
