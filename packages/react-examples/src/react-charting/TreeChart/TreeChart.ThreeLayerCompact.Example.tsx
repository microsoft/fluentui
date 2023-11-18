import * as React from 'react';
import { TreeChart, ITreeProps, TreeTraverse, NodesComposition, ITreeState } from '@fluentui/react-charting';
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

export class TreeChartThreeLayerCompactExample extends React.Component<{}, ITreeState> {
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
        <TreeChart
          treeData={threeLayerChart}
          composition={NodesComposition.compact}
          treeTraversal={TreeTraverse.levelOrder}
          layoutWidth={this.state?._layoutWidth}
        />
      </>
    );
  }
}
