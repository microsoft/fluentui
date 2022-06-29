/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import { TreeChart, ITreeProps } from '@fluentui/react-charting';
const threeLayerChart = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    {
      name: 'Child 1',
      subname: 'subtext',
      fill: 'pink',
      children: [
        {
          name: 'leaf1',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf2',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf3',
          subname: 'sub',
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
      name: 'Child 2',
      subname: 'subtext',
      fill: 'pink',
      children: [
        {
          name: 'leaf5',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf6',
          subname: 'sub',
          fill: '#4F6BED',
        },
      ],
    },
    {
      name: 'Child 3',
      subname: 'subtext',
      fill: 'pink',
      children: [
        {
          name: 'leaf7',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf8',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf9',
          subname: 'sub',
          fill: '#4F6BED',
        },
      ],
    },
    {
      name: 'Child 4',
      subname: 'subtext',
      fill: 'pink',
      children: [
        {
          name: 'leaf10',
          subname: 'sub',
          fill: '#4F6BED',
        },
      ],
    },
  ],
};

interface ITreeState {}

export class TreeChartThreeLayerCompactExample extends React.Component<{}, ITreeState> {
  constructor(props: ITreeProps) {
    super(props);
  }
  public render(): JSX.Element {
    return <div>{this._createTreeChart()}</div>;
  }

  private _createTreeChart(): JSX.Element {
    return (
      <>
        <TreeChart treeData={threeLayerChart} composition={0}></TreeChart>
      </>
    );
  }
}
