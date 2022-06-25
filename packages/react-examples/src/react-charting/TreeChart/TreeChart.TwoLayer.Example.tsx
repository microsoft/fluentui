/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import { TreeChart, ITreeProps } from '@fluentui/react-charting';
import { twoLayerChart } from './TreeChartData';

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
