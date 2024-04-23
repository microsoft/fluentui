import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import {
  GroupedVerticalBarChart,
  ILineChartLineOptions,
  IVSChartDataPoint,
  IVerticalBarChartDataPoint,
  IVerticalStackedChartProps,
  VerticalBarChart,
  VerticalStackedBarChart,
} from '@fluentui/react-charting';

storiesOf('react-charting/VerticalBarChart', module)
  .addDecorator((story, context) => TestWrapperDecorator(story, context))
  .addDecorator((story, context) => {
    const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
    return <StoryWright steps={steps}>{story()}</StoryWright>;
  })
  .addStory(
    'Basic - Secondary Y Axis',
    () => {
      const points: IVerticalBarChartDataPoint[] = [
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

      const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

      const rootStyle = { width: `${650}px`, height: `${350}px` };

      return (
        <div style={rootStyle}>
          <VerticalBarChart
            culture={window.navigator.language}
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
    },
    { includeDarkMode: true, includeRtl: true },
  )

  .addStory(
    'Date Axis- VBC',
    () => {
      const points: IVerticalBarChartDataPoint[] = [
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
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Dynamic - Wrap Labels',
    () => {
      const points: IVerticalBarChartDataPoint[] = [
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
    },
    { includeRtl: true, includeDarkMode: true },
  )
  .addStory(
    'Rotated Label- Hide Legends',
    () => {
      const points: IVerticalBarChartDataPoint[] = [
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
    },
    { includeDarkMode: true, includeRtl: true },
  )

  .addStory(
    'Stacked - Date Axis',
    () => {
      const showLine = true;

      const firstChartPoints: IVSChartDataPoint[] = [
        {
          legend: 'Metadata1',
          data: 40,
          color: '#0078d4',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '40%',
        },
        {
          legend: 'Metadata2',
          data: 5,
          color: '#00188f',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '5%',
        },
        {
          legend: 'Metadata3',
          data: 20,
          color: '#00bcf2',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '20%',
        },
      ];

      const secondChartPoints: IVSChartDataPoint[] = [
        {
          legend: 'Metadata1',
          data: 30,
          color: '#0078d4',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '30%',
        },
        {
          legend: 'Metadata2',
          data: 20,
          color: '#00188f',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '20%',
        },
        {
          legend: 'Metadata3',
          data: 40,
          color: '#00bcf2',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '40%',
        },
      ];

      const thirdChartPoints: IVSChartDataPoint[] = [
        {
          legend: 'Metadata1',
          data: 44,
          color: '#0078d4',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '44%',
        },
        {
          legend: 'Metadata2',
          data: 28,
          color: '#00188f',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '28%',
        },
        {
          legend: 'Metadata3',
          data: 30,
          color: '#00bcf2',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '30%',
        },
      ];

      const fourthChartPoints: IVSChartDataPoint[] = [
        {
          legend: 'Metadata1',
          data: 88,
          color: '#0078d4',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '88%',
        },
        {
          legend: 'Metadata2',
          data: 22,
          color: '#00188f',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '22%',
        },
        {
          legend: 'Metadata3',
          data: 30,
          color: '#00bcf2',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '30%',
        },
      ];

      const data: IVerticalStackedChartProps[] = [
        {
          chartData: firstChartPoints,
          xAxisPoint: new Date('2021/07/01'),

          ...(showLine && {
            lineData: [
              { y: 42, legend: 'Supported Builds', color: '#e3008c' },
              { y: 10, legend: 'Recommended Builds', color: '#a4262c' },
            ],
          }),
        },
        {
          chartData: secondChartPoints,
          xAxisPoint: new Date('2021/10/01'),
          ...(showLine && {
            lineData: [{ y: 33, legend: 'Supported Builds', color: '#e3008c' }],
          }),
        },
        {
          chartData: thirdChartPoints,
          xAxisPoint: new Date('2022/01/01'),
          ...(showLine && {
            lineData: [
              { y: 60, legend: 'Supported Builds', color: '#e3008c' },
              { y: 20, legend: 'Recommended Builds', color: '#a4262c' },
            ],
          }),
        },
        {
          chartData: firstChartPoints,
          xAxisPoint: new Date('2022/04/01'),
          ...(showLine && {
            lineData: [
              { y: 41, legend: 'Supported Builds', color: '#e3008c' },
              { y: 10, legend: 'Recommended Builds', color: '#a4262c' },
            ],
          }),
        },
        {
          chartData: fourthChartPoints,
          xAxisPoint: new Date('2022/07/01'),
          ...(showLine && {
            lineData: [
              { y: 100, legend: 'Supported Builds', color: '#e3008c' },
              { y: 70, legend: 'Recommended Builds', color: '#a4262c' },
            ],
          }),
        },
        {
          chartData: firstChartPoints,
          xAxisPoint: new Date('2022/11/01'),
        },
      ];

      const timeFormat = '%m/%d';
      const tickValues = [
        new Date('2021/07/01'),
        new Date('2021/10/01'),
        new Date('2022/01/01'),
        new Date('2022/04/01'),
        new Date('2022/07/01'),
        new Date('2022/11/01'),
      ];

      const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

      const rootStyle = { width: `${650}px`, height: `${350}px` };

      return (
        <div style={rootStyle}>
          <VerticalStackedBarChart
            culture={window.navigator.language}
            chartTitle="Vertical stacked bar chart Date X Axis example"
            barGapMax={2}
            data={data}
            height={350}
            width={650}
            tickFormat={timeFormat}
            tickValues={tickValues}
            lineOptions={lineOptions}
            legendProps={{
              allowFocusOnLegends: true,
            }}
            hideLabels={false}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )

  .addStory(
    'Stacked',
    () => {
      const showLine = true;

      const firstChartPoints: IVSChartDataPoint[] = [
        {
          legend: 'Metadata1',
          data: 40,
          color: '#0078d4',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '40%',
        },
        {
          legend: 'Metadata2',
          data: 5,
          color: '#00188f',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '5%',
        },
        {
          legend: 'Metadata3',
          data: 20,
          color: '#00bcf2',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '20%',
        },
      ];

      const secondChartPoints: IVSChartDataPoint[] = [
        {
          legend: 'Metadata1',
          data: 30,
          color: '#0078d4',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '30%',
        },
        {
          legend: 'Metadata2',
          data: 20,
          color: '#00188f',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '20%',
        },
        {
          legend: 'Metadata3',
          data: 40,
          color: '#00bcf2',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '40%',
        },
      ];

      const thirdChartPoints: IVSChartDataPoint[] = [
        {
          legend: 'Metadata1',
          data: 44,
          color: '#0078d4',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '44%',
        },
        {
          legend: 'Metadata2',
          data: 28,
          color: '#00188f',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '28%',
        },
        {
          legend: 'Metadata3',
          data: 30,
          color: '#00bcf2',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '30%',
        },
      ];

      const fourthChartPoints: IVSChartDataPoint[] = [
        {
          legend: 'Metadata1',
          data: 88,
          color: '#0078d4',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '88%',
        },
        {
          legend: 'Metadata2',
          data: 22,
          color: '#00188f',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '22%',
        },
        {
          legend: 'Metadata3',
          data: 30,
          color: '#00bcf2',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '30%',
        },
      ];

      const data: IVerticalStackedChartProps[] = [
        {
          chartData: firstChartPoints,
          xAxisPoint: 0,

          ...(showLine && {
            lineData: [
              { y: 42, legend: 'Supported Builds', color: '#e3008c' },
              { y: 10, legend: 'Recommended Builds', color: '#a4262c' },
            ],
          }),
        },
        {
          chartData: secondChartPoints,
          xAxisPoint: 20,
          ...(showLine && {
            lineData: [{ y: 33, legend: 'Supported Builds', color: '#e3008c' }],
          }),
        },
        {
          chartData: thirdChartPoints,
          xAxisPoint: 40,
          ...(showLine && {
            lineData: [
              { y: 60, legend: 'Supported Builds', color: '#e3008c' },
              { y: 20, legend: 'Recommended Builds', color: '#a4262c' },
            ],
          }),
        },
        {
          chartData: firstChartPoints,
          xAxisPoint: 60,
          ...(showLine && {
            lineData: [
              { y: 41, legend: 'Supported Builds', color: '#e3008c' },
              { y: 10, legend: 'Recommended Builds', color: '#a4262c' },
            ],
          }),
        },
        {
          chartData: fourthChartPoints,
          xAxisPoint: 80,
          ...(showLine && {
            lineData: [
              { y: 100, legend: 'Supported Builds', color: '#e3008c' },
              { y: 70, legend: 'Recommended Builds', color: '#a4262c' },
            ],
          }),
        },
        {
          chartData: firstChartPoints,
          xAxisPoint: 100,
        },
      ];

      const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

      const rootStyle = { width: `${650}px`, height: `${350}px` };

      return (
        <div style={rootStyle}>
          <VerticalStackedBarChart
            culture={window.navigator.language}
            chartTitle="Vertical stacked bar chart basic example"
            barGapMax={2}
            data={data}
            height={350}
            width={650}
            lineOptions={lineOptions}
            legendProps={{
              allowFocusOnLegends: true,
            }}
            hideLabels={false}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Grouped - Wrap Labels',
    () => {
      const data = [
        {
          name: 'Metadata info multi lines text Completed',
          series: [
            {
              key: 'series1',
              data: 33000,
              color: '#00bcf2',
              legend: 'MetaData1',
              xAxisCalloutData: '2020/04/30',
              yAxisCalloutData: '33%',
            },
            {
              key: 'series2',
              data: 44000,
              color: '#0078d4',
              legend: 'MetaData4',
              xAxisCalloutData: '2020/04/30',
              yAxisCalloutData: '44%',
            },
          ],
        },
        {
          name: 'Meta Data2',
          series: [
            {
              key: 'series1',
              data: 33000,
              color: '#00bcf2',
              legend: 'MetaData1',
              xAxisCalloutData: '2020/05/30',
              yAxisCalloutData: '33%',
            },
            {
              key: 'series2',
              data: 3000,
              color: '#0078d4',
              legend: 'MetaData4',
              xAxisCalloutData: '2020/05/30',
              yAxisCalloutData: '3%',
            },
          ],
        },
        {
          name: 'Single line text ',
          series: [
            {
              key: 'series1',
              data: 14000,
              color: '#00bcf2',
              legend: 'MetaData1',
              xAxisCalloutData: '2020/06/30',
              yAxisCalloutData: '14%',
            },
            {
              key: 'series2',
              data: 50000,
              color: '#0078d4',
              legend: 'MetaData4',
              xAxisCalloutData: '2020/06/30',
              yAxisCalloutData: '50%',
            },
          ],
        },
        {
          name: 'Hello World!!!',
          series: [
            {
              key: 'series1',
              data: 33000,
              color: '#00bcf2',
              legend: 'MetaData1',
              xAxisCalloutData: '2020/07/30',
              yAxisCalloutData: '33%',
            },
            {
              key: 'series2',
              data: 3000,
              color: '#0078d4',
              legend: 'MetaData4',
              xAxisCalloutData: '2020/07/30',
              yAxisCalloutData: '3%',
            },
          ],
        },
      ];

      const rootStyle = { width: `${700}px`, height: `${400}px` };
      return (
        <>
          <div style={rootStyle}>
            <GroupedVerticalBarChart
              culture={window.navigator.language}
              chartTitle="Grouped Vertical Bar chart basic example"
              data={data}
              height={400}
              width={700}
              wrapXAxisLables
              barwidth={16}
              hideLabels={false}
            />
          </div>
        </>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
