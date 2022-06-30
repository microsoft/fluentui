jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ITreeChartDataPoint, TreeChart } from './index';

const twoLayerChart: ITreeChartDataPoint = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    { name: 'Child 1', subname: 'subtext', fill: 'pink' },
    { name: 'Child 2', subname: 'subtext', fill: 'pink' },
    { name: 'Child 3', subname: 'subtext', fill: 'pink' },
    { name: 'Child 4', subname: 'subtext', fill: 'pink' },
  ],
};

const threeLayerChart: ITreeChartDataPoint = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    {
      name: 'Child 1',
      subname: 'subtext',
      fill: 'pink',
      children: [
        { name: 'leaf1', subname: 'sub', fill: '#4F6BED' },
        { name: 'leaf2', subname: 'sub', fill: '#4F6BED' },
        { name: 'leaf3', subname: 'sub', fill: '#4F6BED' },
        { name: 'leaf4', subname: 'sub', fill: '#4F6BED' },
      ],
    },
    {
      name: 'Child 2',
      subname: 'subtext',
      fill: 'pink',
      children: [
        { name: 'leaf5', subname: 'sub', fill: '#4F6BED' },
        { name: 'leaf6', subname: 'sub', fill: '#4F6BED' },
      ],
    },
    {
      name: 'Child 3',
      subname: 'subtext',
      fill: 'pink',
      children: [
        { name: 'leaf7', subname: 'sub', fill: '#4F6BED' },
        { name: 'leaf8', subname: 'sub', fill: '#4F6BED' },
        { name: 'leaf9', subname: 'sub', fill: '#4F6BED' },
      ],
    },
    {
      name: 'Child 4',
      subname: 'subtext',
      fill: 'pink',
      children: [{ name: 'leaf10', subname: 'sub', fill: '#4F6BED' }],
    },
  ],
};

describe('TreeChart snapshot testing', () => {
  it('renders treechart two layer correctly', () => {
    const component = renderer.create(
      <TreeChart
        treeData={twoLayerChart}
        width={1000}
        height={700}
        margin={{ top: 30, right: 20, bottom: 30, left: 50 }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders treechart three layer long composition correctly', () => {
    const component = renderer.create(
      <TreeChart
        treeData={threeLayerChart}
        composition={1}
        width={1000}
        height={700}
        margin={{ top: 30, right: 20, bottom: 30, left: 50 }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders treechart three layer compact composition correctly', () => {
    const component = renderer.create(
      <TreeChart
        treeData={threeLayerChart}
        composition={0}
        width={1000}
        height={700}
        margin={{ top: 30, right: 20, bottom: 30, left: 50 }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
