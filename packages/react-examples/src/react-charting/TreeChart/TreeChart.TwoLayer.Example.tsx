/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import { TreeChart, ITreeProps } from '@fluentui/react-charting';
const twoLayerChart = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    { name: 'Child 1', subname: 'subtext', fill: '#4F6BED' },
    { name: 'Child 2', subname: 'subtext', fill: '#881798' },
    { name: 'Child 3', subname: 'subtext', fill: '#AE8C00' },
    { name: 'Child 4', subname: 'subtext', fill: '#FF00FF' },
  ],
};

interface ITreeState {}

export class TreeChartTwoLayerExample extends React.Component<{}, ITreeState> {
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
