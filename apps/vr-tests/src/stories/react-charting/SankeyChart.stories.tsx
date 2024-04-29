import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { IChartProps, SankeyChart } from '@fluentui/react-charting';

storiesOf('react-charting/SankeyChart', module)
  .addDecorator((story, context) => TestWrapperDecorator(story, context))
  .addDecorator((story, context) => {
    const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
    return <StoryWright steps={steps}>{story()}</StoryWright>;
  })
  .addStory(
    'Basic',
    () => {
      const data: IChartProps = {
        chartTitle: 'Sankey Chart',
        SankeyChartData: {
          nodes: [
            {
              nodeId: 0,
              name: 'node0',
              color: '#00758F',
              borderColor: '#002E39',
            },
            {
              nodeId: 1,
              name: 'node1',
              color: '#77004D',
              borderColor: '#43002C',
            },
            {
              nodeId: 2,
              name: 'node2',
              color: '#4F6BED',
              borderColor: '#3B52B4',
            },
            {
              nodeId: 3,
              name: 'node3',
              color: '#937600',
              borderColor: '#6D5700',
            },
            {
              nodeId: 4,
              name: 'node4',
              color: '#286EA8',
              borderColor: '#00457E',
            },
            {
              nodeId: 5,
              name: 'node5',
              color: '#A43FB1',
              borderColor: '#7C158A',
            },
          ],
          links: [
            {
              source: 0,
              target: 2,
              value: 2,
            },
            {
              source: 1,
              target: 2,
              value: 2,
            },
            {
              source: 1,
              target: 3,
              value: 2,
            },
            {
              source: 0,
              target: 4,
              value: 2,
            },
            {
              source: 2,
              target: 3,
              value: 2,
            },
            {
              source: 2,
              target: 4,
              value: 2,
            },
            {
              source: 3,
              target: 4,
              value: 4,
            },
            {
              source: 3,
              target: 4,
              value: 4,
            },
            {
              source: 3,
              target: 5,
              value: 4,
            },
          ],
        },
      };

      const rootStyle = { width: `${912}px`, height: `${412}px` };

      return (
        <div style={rootStyle}>
          <SankeyChart data={data} height={412} width={912} shouldResize={912 + 412} />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'PlaceHolder',
    () => {
      const data: IChartProps = {
        chartTitle: 'Sankey Chart',
        SankeyChartData: {
          nodes: [
            {
              nodeId: 0,
              name: '192.168.42.72',
              color: '#8764B8',
              borderColor: '#4B3867',
            },
            {
              nodeId: 1,
              name: '172.152.48.13',
              color: '#8764B8',
              borderColor: '#4B3867',
            },
            {
              nodeId: 2,
              name: '124.360.55.1',
              color: '#8764B8',
              borderColor: '#4B3867',
            },
            {
              nodeId: 3,
              name: '192.564.10.2',
              color: '#8764B8',
              borderColor: '#4B3867',
            },
            {
              nodeId: 4,
              name: '124.124.50.1',
              color: '#8764B8',
              borderColor: '#4B3867',
            },
            {
              nodeId: 5,
              name: '172.630.89.4',
              color: '#8764B8',
              borderColor: '#4B3867',
            },
            {
              nodeId: 6,
              name: 'inbox',
              color: '#0E7878',
              borderColor: '#004E4E',
            },
            {
              nodeId: 7,
              name: 'Junk Folder',
              color: '#0E7878',
              borderColor: '#004E4E',
            },
            {
              nodeId: 8,
              name: 'Deleted Folder',
              color: '#0E7878',
              borderColor: '#004E4E',
            },
            {
              nodeId: 9,
              name: 'Clicked',
              color: '#4F6BED',
              borderColor: '#3B52B4',
            },
            {
              nodeId: 10,
              name: 'Opened',
              color: '#4F6BED',
              borderColor: '#3B52B4',
            },
            {
              nodeId: 11,
              name: ' No further action  required',
              color: '#4F6BED',
              borderColor: '#3B52B4',
            },
          ],
          links: [
            {
              source: 0,
              target: 6,
              value: 80,
            },
            {
              source: 1,
              target: 6,
              value: 50,
            },
            {
              source: 1,
              target: 7,
              value: 28,
            },
            {
              source: 2,
              target: 7,
              value: 14,
            },
            {
              source: 3,
              target: 7,
              value: 7,
            },
            {
              source: 3,
              target: 8,
              value: 20,
            },
            {
              source: 4,
              target: 7,
              value: 10,
            },
            {
              source: 5,
              target: 7,
              value: 10,
            },

            {
              source: 6,
              target: 9,
              value: 30,
            },
            {
              source: 6,
              target: 10,
              value: 55,
            },
            {
              source: 7,
              target: 11,
              value: 60,
            },
            {
              source: 8,
              target: 11,
              value: 2,
            },
          ],
        },
      };

      const rootStyle = { width: `${912}px`, height: `${400}px` };

      return (
        <div style={rootStyle}>
          <SankeyChart data={data} height={400} width={912} shouldResize={912 + 400} />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
