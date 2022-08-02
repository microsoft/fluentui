import * as React from 'react';
import { TreeChart, ITreeProps, ITreeState } from '@fluentui/react-charting';
const twoLayerChart = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    { name: 'Child 1', subname: 'Subtext val is subtext', fill: '#4F6BED' },
    { name: 'Child 2', subname: 'Subtext val is subtext', fill: '#881798' },
    { name: 'Child 3', subname: 'Subtext val is subtext', fill: '#AE8C00' },
    { name: 'Child 4', subname: 'Subtext val is subtext', fill: '#FF00FF' },
  ],
};

export class TreeChartTwoLayerExample extends React.Component<{}, ITreeState> {
  constructor(props: ITreeProps) {
    super(props);
  }
  public render(): JSX.Element {
    return <div>{this._createTreeChart()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ _layoutWidth: parseInt(e.target.value, 10) });
  };

  private _createTreeChart(): JSX.Element {
    return (
      <>
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={this.state?._layoutWidth}
          min={65}
          max={90}
          id="changeWidth_Basic"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state?._layoutWidth}`}
        />
        <TreeChart treeData={twoLayerChart} layoutWidth={this.state?._layoutWidth} />
      </>
    );
  }
}
