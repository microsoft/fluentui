import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryWright, Steps } from 'storywright';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { AreaChart, ICustomizedCalloutData, ChartHoverCard } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react';

storiesOf('react-charting/AreaChart', module)
  .addDecorator((story, context) => TestWrapperDecorator(story, context))
  .addDecorator((story, context) => {
    const steps =
      (context.name.startsWith('Basic') || context.name.startsWith('Multiple')) &&
      !context.name.includes('RTL')
        ? new Steps()
            .snapshot('default', { cropTo: '.testWrapper' })
            // to hover over the area charts and show the callout
            .executeScript(
              // eslint-disable-next-line @fluentui/max-len
              `document.querySelector('rect').dispatchEvent(new MouseEvent('mouseover',{bubbles: true,cancelable: true,clientX:400,clientY:100}))`,
            )
            .snapshot('hover', { cropTo: '.testWrapper' })
            .end()
        : new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
    return <StoryWright steps={steps}>{story()}</StoryWright>;
  })
  .addStory(
    'Basic',
    () => {
      const chart1Points = [
        {
          x: 20,
          y: 7000,
          xAxisCalloutData: '2018/01/01',
          yAxisCalloutData: '10%',
        },
        {
          x: 25,
          y: 9000,
          xAxisCalloutData: '2018/01/15',
          yAxisCalloutData: '18%',
        },
        {
          x: 30,
          y: 13000,
          xAxisCalloutData: '2018/01/28',
          yAxisCalloutData: '24%',
        },
        {
          x: 35,
          y: 15000,
          xAxisCalloutData: '2018/02/01',
          yAxisCalloutData: '25%',
        },
        {
          x: 40,
          y: 11000,
          xAxisCalloutData: '2018/03/01',
          yAxisCalloutData: '15%',
        },
        {
          x: 45,
          y: 8760,
          xAxisCalloutData: '2018/03/15',
          yAxisCalloutData: '30%',
        },
        {
          x: 50,
          y: 3500,
          xAxisCalloutData: '2018/03/28',
          yAxisCalloutData: '18%',
        },
        {
          x: 55,
          y: 20000,
          xAxisCalloutData: '2018/04/04',
          yAxisCalloutData: '32%',
        },
        {
          x: 60,
          y: 17000,
          xAxisCalloutData: '2018/04/15',
          yAxisCalloutData: '29%',
        },
        {
          x: 65,
          y: 1000,
          xAxisCalloutData: '2018/05/05',
          yAxisCalloutData: '43%',
        },
        {
          x: 70,
          y: 12000,
          xAxisCalloutData: '2018/06/01',
          yAxisCalloutData: '45%',
        },
        {
          x: 75,
          y: 6876,
          xAxisCalloutData: '2018/01/15',
          yAxisCalloutData: '18%',
        },
        {
          x: 80,
          y: 12000,
          xAxisCalloutData: '2018/04/30',
          yAxisCalloutData: '55%',
        },
        {
          x: 85,
          y: 7000,
          xAxisCalloutData: '2018/05/04',
          yAxisCalloutData: '12%',
        },
        {
          x: 90,
          y: 10000,
          xAxisCalloutData: '2018/06/01',
          yAxisCalloutData: '45%',
        },
      ];

      const chartPoints = [
        {
          legend: 'legend1',
          data: chart1Points,
          color: '#0099BC',
        },
      ];

      const chartData = {
        chartTitle: 'Area chart basic example',
        lineChartData: chartPoints,
      };

      const rootStyle = { width: `${700}px`, height: `${300}px` };

      return (
        <div style={rootStyle}>
          <AreaChart
            culture={window.navigator.language}
            height={300}
            width={700}
            data={chartData}
            showYAxisGridLines={true}
            enablePerfOptimization={true}
            // eslint-disable-next-line react/jsx-no-bind
            onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
              props ? (
                <ChartHoverCard
                  XValue={props.x.toString()}
                  Legend={'Custom Legend'}
                  YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                  color={'red'}
                />
              ) : null
            }
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Custom Accessibility',
    () => {
      const chart1Points = [
        {
          x: 20,
          y: 9,
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 20' },
          callOutAccessibilityData: { ariaLabel: 'Line series 1 of 5 Point 1 First 9' },
        },
        {
          x: 40,
          y: 20,
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 40' },
          callOutAccessibilityData: { ariaLabel: 'Line series 2 of 5 Point 1 First 20' },
        },
        {
          x: 55,
          y: 27,
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 55' },
          callOutAccessibilityData: { ariaLabel: 'Line series 3 of 5 Point 1 First 27' },
        },
        {
          x: 60,
          y: 37,
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 60' },
          callOutAccessibilityData: { ariaLabel: 'Line series 4 of 5 Point 1 First 37' },
        },
        {
          x: 65,
          y: 51,
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 65' },
          callOutAccessibilityData: { ariaLabel: 'Line series 5 of 5 Point 1 First 51' },
        },
      ];

      const chart2Points = [
        {
          x: 20,
          y: 21,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 21' },
        },
        {
          x: 40,
          y: 25,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 25' },
        },
        {
          x: 55,
          y: 23,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 23' },
        },
        {
          x: 60,
          y: 7,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 7' },
        },
        {
          x: 65,
          y: 55,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 55' },
        },
      ];

      const chart3Points = [
        {
          x: 20,
          y: 30,
          callOutAccessibilityData: { ariaLabel: 'Point 3 Third 30' },
        },
        {
          x: 40,
          y: 35,
          callOutAccessibilityData: { ariaLabel: 'Point 3 Third 35' },
        },
        {
          x: 55,
          y: 33,
          callOutAccessibilityData: { ariaLabel: 'Point 3 Third 33' },
        },
        {
          x: 60,
          y: 40,
          callOutAccessibilityData: { ariaLabel: 'Point 3 Third 40' },
        },
        {
          x: 65,
          y: 10,
          callOutAccessibilityData: { ariaLabel: 'Point 3 Third 10' },
        },
      ];

      const chartPoints = [
        {
          legend: 'First',
          data: chart1Points,
          color: DefaultPalette.accent,
        },
        {
          legend: 'Second',
          data: chart2Points,
          color: DefaultPalette.blueLight,
        },
        {
          legend: 'Third',
          data: chart3Points,
          color: DefaultPalette.blueDark,
        },
      ];

      const chartData = {
        chartTitle: 'Area chart Custom Accessibility example',
        lineChartData: chartPoints,
      };
      const rootStyle = { width: `${700}px`, height: `${300}px` };

      return (
        <div style={rootStyle}>
          <AreaChart
            height={300}
            width={700}
            data={chartData}
            legendsOverflowText={'Overflow Items'}
            enablePerfOptimization={true}
            legendProps={{
              allowFocusOnLegends: true,
            }}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Multiple',
    () => {
      const chart1Points = [
        {
          x: 20,
          y: 9,
        },
        {
          x: 25,
          y: 14,
        },
        {
          x: 30,
          y: 14,
        },
        {
          x: 35,
          y: 23,
        },
        {
          x: 40,
          y: 20,
        },
        {
          x: 45,
          y: 31,
        },
        {
          x: 50,
          y: 29,
        },
        {
          x: 55,
          y: 27,
        },
        {
          x: 60,
          y: 37,
        },
        {
          x: 65,
          y: 51,
        },
      ];

      const chart2Points = [
        {
          x: 20,
          y: 21,
        },
        {
          x: 25,
          y: 25,
        },
        {
          x: 30,
          y: 10,
        },
        {
          x: 35,
          y: 10,
        },
        {
          x: 40,
          y: 14,
        },
        {
          x: 45,
          y: 18,
        },
        {
          x: 50,
          y: 9,
        },
        {
          x: 55,
          y: 23,
        },
        {
          x: 60,
          y: 7,
        },
        {
          x: 65,
          y: 55,
        },
      ];

      const chart3Points = [
        {
          x: 20,
          y: 30,
        },
        {
          x: 25,
          y: 35,
        },
        {
          x: 30,
          y: 33,
        },
        {
          x: 35,
          y: 40,
        },
        {
          x: 40,
          y: 10,
        },
        {
          x: 45,
          y: 40,
        },
        {
          x: 50,
          y: 34,
        },
        {
          x: 55,
          y: 40,
        },
        {
          x: 60,
          y: 60,
        },
        {
          x: 65,
          y: 40,
        },
      ];

      const chartPoints = [
        {
          legend: 'legend1',
          data: chart1Points,
        },
        {
          legend: 'legend2',
          data: chart2Points,
        },
        {
          legend: 'legend3',
          data: chart3Points,
        },
      ];

      const chartData = {
        chartTitle: 'Area chart multiple example',
        lineChartData: chartPoints,
      };
      const rootStyle = { width: `${700}px`, height: `${300}px` };

      return (
        <div style={rootStyle}>
          <AreaChart
            height={300}
            width={700}
            data={chartData}
            legendsOverflowText={'Overflow Items'}
            enablePerfOptimization={true}
            legendProps={{
              allowFocusOnLegends: true,
            }}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
