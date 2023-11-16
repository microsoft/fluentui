import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { NodesComposition, TreeChart, TreeTraverse } from '@fluentui/react-charting';

storiesOf('react-charting/TreeChart', module)
  .addDecorator((story, context) => TestWrapperDecorator(story, context))
  .addDecorator((story, context) => {
    const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
    return <StoryWright steps={steps}>{story()}</StoryWright>;
  })
  .addStory(
    'Basic',
    () => {
      const threeLayerChart = {
        name: 'Root Node',
        subname: 'subtext',
        bodytext: 'bodytext',
        fill: '#0099BC',
        children: [
          {
            name: 'Child 1',
            subname: 'subtext',
            metric: '100%',
            fill: '#4F6BED',
            children: [
              {
                name: 'leaf1',
                subname: 'sub',
                fill: '#4F6BED',
              },
              {
                name: 'leaf2',
                fill: '#4F6BED',
              },
              {
                name: 'leaf3',
                subname: 'The subtext is as follows: sub',
                fill: '#4F6BED',
              },
              {
                name: 'leaf4',
                subname: 'sub',
                fill: '#4F6BED',
              },
            ],
          },
          {
            name: 'Child 2 is the child name',
            fill: '#881798',
            children: [
              {
                name: 'leaf5',
                subname: 'sub',
                fill: '#881798',
              },
              {
                name: 'leaf6',
                subname: 'sub',
                fill: '#881798',
              },
            ],
          },
          {
            name: 'Child 3',
            subname: 'The subtext is as follows: subtext',
            fill: '#AE8C00',
            children: [
              {
                name: 'leaf7',
                subname: 'sub',
                fill: '#AE8C00',
              },
              {
                name: 'leaf8',
                subname: 'sub',
                fill: '#AE8C00',
              },
              {
                name: 'leaf9',
                subname: 'sub',
                fill: '#AE8C00',
              },
            ],
          },
          {
            name: 'Child 4',
            subname: 'subtext',
            metric: '90%',
            fill: '#FF00FF',
            children: [
              {
                name: 'leaf10',
                subname: 'sub',
                fill: '#FF00FF',
              },
            ],
          },
        ],
      };

      return (
        <div style={{ padding: 10 }}>
          <TreeChart treeData={threeLayerChart} layoutWidth={300} />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Compact',
    () => {
      const threeLayerChart = {
        name: 'Root Node',
        subname: 'subtext',
        fill: '#0099BC',
        children: [
          {
            name: 'Child 1',
            subname: 'subtext',
            metric: '100%',
            fill: '#4F6BED',
            children: [
              {
                name: 'leaf1',
                subname: 'sub',
                fill: '#4F6BED',
              },
              {
                name: 'leaf2',
                fill: '#4F6BED',
              },
              {
                name: 'leaf3',
                subname: 'The subtext is as follows: sub',
                fill: '#4F6BED',
              },
              {
                name: 'leaf4',
                subname: 'sub',
                fill: '#4F6BED',
              },
            ],
          },
          {
            name: 'Child 2 is the child name',
            fill: '#881798',
            children: [
              {
                name: 'leaf5',
                subname: 'sub',
                fill: '#881798',
              },
              {
                name: 'leaf6',
                subname: 'sub',
                fill: '#881798',
              },
            ],
          },
          {
            name: 'Child 3',
            subname: 'The subtext is as follows: subtext',
            fill: '#AE8C00',
            children: [
              {
                name: 'leaf7',
                subname: 'sub',
                fill: '#AE8C00',
              },
              {
                name: 'leaf8',
                subname: 'sub',
                fill: '#AE8C00',
              },
              {
                name: 'leaf9',
                subname: 'sub',
                fill: '#AE8C00',
              },
            ],
          },
          {
            name: 'Child 4',
            subname: 'subtext',
            metric: '90%',
            fill: '#FF00FF',
            children: [
              {
                name: 'leaf10',
                subname: 'sub',
                fill: '#FF00FF',
              },
            ],
          },
        ],
      };
      return (
        <div style={{ padding: 10 }}>
          <TreeChart
            treeData={threeLayerChart}
            composition={NodesComposition.compact}
            treeTraversal={TreeTraverse.levelOrder}
            layoutWidth={300}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
