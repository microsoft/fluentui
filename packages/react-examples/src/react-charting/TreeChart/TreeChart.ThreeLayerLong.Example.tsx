/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import { TreeChart, ITreeProps } from '@fluentui/react-charting';
import { threeLayerChart } from './TreeChartData';

interface ITreeState {}

export class TreeChartThreeLayerLongExample extends React.Component<{}, ITreeState> {
  constructor(props: ITreeProps) {
    super(props);
  }
  public render(): JSX.Element {
    return <div>{this._createTreeChart()}</div>;
  }

  private _createTreeChart(): JSX.Element {
    return (
      <>
        <TreeChart treeData={threeLayerChart} composition={1}></TreeChart>
      </>
    );
  }
}
