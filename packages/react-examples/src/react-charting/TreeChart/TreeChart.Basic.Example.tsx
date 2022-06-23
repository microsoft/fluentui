/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import { TreeChart, ITreeProps } from '@fluentui/react-charting';
const twoLayerChart = {
  name: 'University',
  subname: 'VIT Vellore',
  fill: '#0099BC',
  children: [
    {
      name: 'Professor',
      subname: 'subtext',
      fill: 'pink',
    },
    { name: 'Student', subname: 'subtext', fill: 'pink' },
    { name: 'Placement', subname: 'subtext', fill: 'pink' },
    {
      name: 'Management',
      subname: 'subtext',
      fill: 'pink',
    },
  ],
};

// import * as twoLayerChart from './twoLayerChart.json';

interface ITreeState {}

export class TreeChartBasicExample extends React.Component<{}, ITreeState> {
  constructor(props: ITreeProps) {
    super(props);
  }
  public render(): JSX.Element {
    return <div>{this._createTreeChart()}</div>;
  }

  private _createTreeChart(): JSX.Element {
    return (
      <>
        <TreeChart treeData={twoLayerChart}></TreeChart>
      </>
    );
  }
}
