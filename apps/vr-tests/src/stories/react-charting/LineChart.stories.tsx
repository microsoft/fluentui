import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/index';
import { IChartProps } from '../../../../../packages/react-charting/src/HorizontalBarChart';
import { LineChart } from '../../../../../packages/react-charting/src/LineChart';
import { DefaultPalette } from '../../../../../packages/theme/src/index';
import { mergeStyles } from '../../../../../packages/merge-styles/src/mergeStyles';

storiesOf('react-charting/LineChart', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => {
    const margins = { left: 35, top: 20, bottom: 35, right: 20 };
    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: [
        {
          legend: 'From_Legacy_to_O365',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 216000,
              onDataPointClick: () => alert('click on 217000'),
            },
            {
              x: new Date('2020-03-03T10:00:00.000Z'),
              y: 218123,
              onDataPointClick: () => alert('click on 217123'),
            },
            {
              x: new Date('2020-03-03T11:00:00.000Z'),
              y: 217124,
              onDataPointClick: () => alert('click on 217124'),
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 248000,
              onDataPointClick: () => alert('click on 248000'),
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 252000,
              onDataPointClick: () => alert('click on 252000'),
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 274000,
              onDataPointClick: () => alert('click on 274000'),
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 260000,
              onDataPointClick: () => alert('click on 260000'),
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 304000,
              onDataPointClick: () => alert('click on 300000'),
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 218000,
              onDataPointClick: () => alert('click on 218000'),
            },
          ],
          color: DefaultPalette.blue,
          lineOptions: {
            lineBorderWidth: '4',
          },
          onLineClick: () => console.log('From_Legacy_to_O365'),
        },
        {
          legend: 'All',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 297000,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 284000,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 282000,
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 294000,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 224000,
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300000,
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 298000,
            },
          ],
          color: DefaultPalette.green,
          lineOptions: {
            lineBorderWidth: '4',
          },
        },
        {
          legend: 'single point',
          data: [
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 282000,
            },
          ],
          color: DefaultPalette.yellow,
        },
      ],
    };

    const rootStyle = { width: `700px`, height: `300px` };

    return (
      <div style={rootStyle}>
        <LineChart
          culture={window.navigator.language}
          data={data}
          legendsOverflowText={'Overflow Items'}
          yMinValue={200}
          yMaxValue={301}
          height={300}
          width={700}
          margins={margins}
          xAxisTickCount={10}
          allowMultipleShapesForPoints={false}
          enablePerfOptimization={true}
        />
      </div>
    );
  })
  .addStory('Events', () => {
    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: [
        {
          legend: 'From_Legacy_to_O365',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 297,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 284,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 282,
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 294,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 294,
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300,
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 298,
            },
          ],
          color: DefaultPalette.blue,
          lineOptions: {
            lineBorderWidth: '4',
          },
        },
        {
          legend: 'All',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 292,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 287,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 287,
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 292,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 287,
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 297,
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 292,
            },
          ],
          color: DefaultPalette.green,
          lineOptions: {
            lineBorderWidth: '4',
          },
        },
      ],
    };

    const calloutItemStyle = mergeStyles({
      borderBottom: '1px solid #D9D9D9',
      padding: '3px',
    });

    const rootStyle = { width: `700px`, height: `300px` };

    return (
      <div style={rootStyle}>
        <LineChart
          data={data}
          legendsOverflowText={'Overflow Items'}
          yMinValue={282}
          yMaxValue={301}
          tickFormat={'%m/%d'}
          allowMultipleShapesForPoints={false}
          tickValues={[
            new Date('2020-03-03'),
            new Date('2020-03-04'),
            new Date('2020-03-05'),
            new Date('2020-03-06'),
            new Date('2020-03-07'),
            new Date('2020-03-08'),
            new Date('2020-03-09'),
          ]}
          eventAnnotationProps={{
            events: [
              {
                event: 'event 1',
                date: new Date('2020-03-04T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 1 message</div>,
              },
              {
                event: 'event 2',
                date: new Date('2020-03-04T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 2 message</div>,
              },
              {
                event: 'event 3',
                date: new Date('2020-03-04T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 3 message</div>,
              },
              {
                event: 'event 4',
                date: new Date('2020-03-06T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 4 message</div>,
              },
              {
                event: 'event 5',
                date: new Date('2020-03-08T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 5 message</div>,
              },
            ],
            labelHeight: 18,
            labelWidth: 50,
            mergedLabel: (count: number) => `${count} events`,
          }}
          height={300}
          width={700}
          enablePerfOptimization={true}
        />
      </div>
    );
  });
