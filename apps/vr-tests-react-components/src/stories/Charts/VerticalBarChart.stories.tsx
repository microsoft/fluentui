import * as React from 'react';
import type { Meta } from '@storybook/react';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { Steps, StoryWright } from 'storywright';
import { LineChartLineOptions, VerticalBarChartDataPoint, VerticalBarChart } from '@fluentui/react-charts';

export default {
  title: 'Charts/VerticalBarChart',

  decorators: [
    (story, context) => TestWrapperDecorator(story, context),
    (story, context) => {
      const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
      return <StoryWright steps={steps}>{story(context)}</StoryWright>;
    },
  ],
} satisfies Meta<typeof VerticalBarChart>;

export const BasicSecondaryYAxis = () => {
  const points: VerticalBarChartDataPoint[] = [
    {
      x: 0,
      y: 10000,
      legend: 'Oranges',
      color: '#0078d4',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '10%',
      lineData: {
        y: 7000,
        yAxisCalloutData: '34%',
      },
    },
    {
      x: 10000,
      y: 50000,
      legend: 'Dogs',
      color: '#005a9e',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '20%',
      lineData: {
        y: 30000,
      },
    },
    {
      x: 25000,
      y: 30000,
      legend: 'Apples',
      color: '#00188f',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '37%',
      lineData: {
        y: 3000,
        yAxisCalloutData: '43%',
      },
    },
    {
      x: 40000,
      y: 13000,
      legend: 'Bananas',
      color: '#00bcf2',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '88%',
    },
    {
      x: 52000,
      y: 43000,
      legend: 'Giraffes',
      color: '#0078d4',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '71%',
      lineData: {
        y: 30000,
      },
    },
    {
      x: 68000,
      y: 30000,
      legend: 'Cats',
      color: '#005a9e',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '40%',
      lineData: {
        y: 5000,
      },
    },
    {
      x: 80000,
      y: 20000,
      legend: 'Elephants',
      color: '#0078d4',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
      lineData: {
        y: 16000,
      },
    },
    {
      x: 92000,
      y: 45000,
      legend: 'Monkeys',
      color: '#00bcf2',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '33%',
      lineData: {
        y: 40000,
        yAxisCalloutData: '45%',
      },
    },
  ];

  const lineOptions: LineChartLineOptions = { lineBorderWidth: '2' };

  const rootStyle = { width: `${650}px`, height: `${350}px` };

  return (
    <div style={rootStyle}>
      <VerticalBarChart
        culture="en-US"
        chartTitle="Vertical bar chart basic example "
        data={points}
        width={650}
        useSingleColor={false}
        height={350}
        lineLegendText={'just line'}
        lineLegendColor={'brown'}
        lineOptions={lineOptions}
        hideLabels={false}
        secondaryYScaleOptions={{ yMaxValue: 17, yMinValue: 5 }}
      />
    </div>
  );
};

BasicSecondaryYAxis.storyName = 'Basic - Secondary Y Axis';

export const BasicSecondaryYAxisDarkMode = getStoryVariant(BasicSecondaryYAxis, DARK_MODE);

export const BasicSecondaryYAxisRTL = getStoryVariant(BasicSecondaryYAxis, RTL);

export const DateAxisVbc = () => {
  const points: VerticalBarChartDataPoint[] = [
    {
      x: new Date('2018/10/01'),
      y: 3500,
      color: '#627CEF',
    },
    {
      x: new Date('2019/02/01'),
      y: 2500,
      color: '#C19C00',
    },
    {
      x: new Date('2019/05/01'),
      y: 1900,
      color: '#E650AF',
    },
    {
      x: new Date('2019/07/01'),
      y: 2800,
      color: '#0E7878',
    },
  ];
  const timeFormat = '%m/%d';
  const tickValues: Date[] = [
    new Date('10-01-2018'),
    new Date('02-01-2019'),
    new Date('05-01-2019'),
    new Date('07-01-2019'),
  ];

  const rootStyle = { width: '650px', height: '500px' };
  return (
    <>
      <div style={rootStyle}>
        <VerticalBarChart
          chartTitle="Vertical bar chart Date Axis example "
          data={points}
          height={350}
          tickFormat={timeFormat}
          tickValues={tickValues}
          width={650}
          hideLegend={true}
        />
      </div>
    </>
  );
};

DateAxisVbc.storyName = 'Date Axis- VBC';

export const DateAxisVbcDarkMode = getStoryVariant(DateAxisVbc, DARK_MODE);

export const DateAxisVbcRTL = getStoryVariant(DateAxisVbc, RTL);

export const DynamicWrapLabels = () => {
  const points: VerticalBarChartDataPoint[] = [
    {
      x: 'Simple Text',
      y: 1000,
      color: '#0078d4',
    },
    {
      x: 'Showing all text here',
      y: 5000,
      color: '#005a9e',
    },
    {
      x: 'Large data, showing all text',
      y: 3000,
      color: '#00188f',
    },
    {
      x: 'Data',
      y: 2000,
      color: '#0078d4',
    },
  ];

  const rootStyle = { width: '650px', height: '350px' };
  return (
    <div style={rootStyle}>
      <VerticalBarChart
        chartTitle="Vertical bar chart axis tooltip example "
        data={points}
        height={350}
        width={650}
        hideLegend={true}
        wrapXAxisLables
      />
    </div>
  );
};
DynamicWrapLabels.storyName = 'Dynamic - Wrap Labels';

export const DynamicWrapLabelsRTL = getStoryVariant(DynamicWrapLabels, RTL);

export const DynamicWrapLabelsDarkMode = getStoryVariant(DynamicWrapLabels, DARK_MODE);

export const RotatedLabelHideLegends = () => {
  const points: VerticalBarChartDataPoint[] = [
    {
      x: 'This is a medium long label. ',
      y: 3500,
      color: '#627CEF',
    },
    {
      x: 'This is a long label This is a long label',
      y: 2500,
      color: '#C19C00',
    },
    {
      x: 'This label is as long as the previous one',
      y: 1900,
      color: '#E650AF',
    },
    {
      x: 'A short label',
      y: 2800,
      color: '#0E7878',
    },
  ];

  const rootStyle = { width: '650px', height: '500px' };
  return (
    <>
      <div style={rootStyle}>
        <VerticalBarChart
          chartTitle="Vertical bar chart rotated labels example "
          data={points}
          height={350}
          width={650}
          hideLegend={true}
          rotateXAxisLables={true}
        />
      </div>
    </>
  );
};

RotatedLabelHideLegends.storyName = 'Rotated Label- Hide Legends';

export const RotatedLabelHideLegendsDarkMode = getStoryVariant(RotatedLabelHideLegends, DARK_MODE);

export const RotatedLabelHideLegendsRTL = getStoryVariant(RotatedLabelHideLegends, RTL);
