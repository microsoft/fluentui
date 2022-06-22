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
      subname: 'Department: CS',
      fill: 'pink',
    },
    { name: 'Student', subname: 'Field: CS', fill: 'pink' },
    { name: 'Placement', subname: 'Field: CS', fill: 'pink' },
    {
      name: 'Management',
      subname: 'Different domains',
      fill: 'pink',
    },
  ],
};

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
