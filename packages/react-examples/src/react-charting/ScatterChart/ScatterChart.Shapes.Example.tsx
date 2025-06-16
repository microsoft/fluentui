import * as React from 'react';
import { ScatterChart, DataVizPalette } from '@fluentui/react-charting';
import { IChartProps } from '@fluentui/react-charting';

interface IScatterChartShapesState {
  width: number;
  height: number;
}

export class ScatterChartShapesExample extends React.Component<{}, IScatterChartShapesState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 700,
      height: 400,
    };
  }

  public render(): JSX.Element {
    return <div>{this._renderShapesChart()}</div>;
  }

  private _renderShapesChart(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Scatter Chart with All Available Shapes',
      scatterChartData: [
        {
          legend: 'Circle Points',
          legendShape: 'circle',
          data: [{ x: 15, y: 50, markerSize: 1, shape: 'circle' }],
          color: DataVizPalette.color1,
        },
        {
          legend: 'Square Points',
          legendShape: 'square',
          data: [{ x: 50, y: 50, markerSize: 0.5, shape: 'square' }],
          color: DataVizPalette.color2,
        },
        {
          legend: 'Triangle Points',
          legendShape: 'triangle',
          data: [{ x: 10, y: 250, markerSize: 0.5, shape: 'triangle' }],
          color: DataVizPalette.color3,
        },
        {
          legend: 'Diamond Points',
          legendShape: 'diamond',
          data: [{ x: 25, y: 160, markerSize: 0.5, shape: 'diamond' }],
          color: DataVizPalette.color4,
        },
        {
          legend: 'Cross Points',
          legendShape: 'cross',
          data: [{ x: 130, y: 320, markerSize: 0.5, shape: 'cross' }],
          color: DataVizPalette.color5,
        },
        {
          legend: 'X Points',
          legendShape: 'x',
          data: [{ x: 60, y: 190, markerSize: 0.5, shape: 'x' }],
          color: DataVizPalette.color6,
        },
        {
          legend: 'Rectangle Points',
          legendShape: 'rectangle',
          data: [{ x: 80, y: 70, markerSize: 0.5, shape: 'rectangle' }],
          color: DataVizPalette.color7,
        },
        {
          legend: 'Hexagon Points',
          legendShape: 'hexagon',
          data: [{ x: 85, y: 190, markerSize: 0.5, shape: 'hexagon' }],
          color: DataVizPalette.color8,
        },
        {
          legend: 'Pentagon Points',
          legendShape: 'pentagon',
          data: [{ x: 120, y: 210, markerSize: 0.5, shape: 'pentagon' }],
          color: DataVizPalette.color9,
        },
        {
          legend: 'Octagon Points',
          legendShape: 'octagon',
          data: [{ x: 140, y: 90, markerSize: 0.5, shape: 'octagon' }],
          color: DataVizPalette.color10,
        },
        {
          legend: 'Star Points',
          legendShape: 'star',
          data: [{ x: 10, y: 140, markerSize: 0.5, shape: 'star' }],
          color: DataVizPalette.color11,
        },
        {
          legend: 'Pyramid Points',
          legendShape: 'pyramid',
          data: [{ x: 40, y: 250, markerSize: 0.5, shape: 'pyramid' }],
          color: DataVizPalette.color11,
        },
        {
          legend: 'Hexagram Points',
          legendShape: 'hexagramx',
          data: [{ x: 85, y: 120, markerSize: 0.5, shape: 'hexagramx' }],
          color: DataVizPalette.color12,
        },
        {
          legend: 'Triangle Up Points',
          legendShape: 'triangleUp',
          data: [{ x: 105, y: 200, markerSize: 0.5, shape: 'triangleUp' }],
          color: DataVizPalette.color13,
        },
        {
          legend: 'Triangle Down Points',
          legendShape: 'triangleDown',
          data: [{ x: 25, y: 280, markerSize: 0.5, shape: 'triangleDown' }],
          color: DataVizPalette.color14,
        },
        {
          legend: 'Triangle Left Points',
          legendShape: 'triangleLeft',
          data: [{ x: 145, y: 160, markerSize: 0.5, shape: 'triangleLeft' }],
          color: DataVizPalette.color15,
        },
        {
          legend: 'Triangle Right Points',
          legendShape: 'triangleRight',
          data: [{ x: 55, y: 310, markerSize: 0.5, shape: 'triangleRight' }],
          color: DataVizPalette.color16,
        },
        {
          legend: 'Hexagon2 Points',
          legendShape: 'hexagon2',
          data: [{ x: 45, y: 180, markerSize: 0.5, shape: 'hexagon2' }],
          color: DataVizPalette.color21,
        },
        {
          legend: 'Star Triangle Up Points',
          legendShape: 'starTriangleUp',
          data: [{ x: 65, y: 260, markerSize: 0.5, shape: 'starTriangleUp' }],
          color: DataVizPalette.color22,
        },
        {
          legend: 'Star Triangle Down Points',
          legendShape: 'starTriangleDown',
          data: [{ x: 85, y: 340, markerSize: 0.5, shape: 'starTriangleDown' }],
          color: DataVizPalette.color23,
        },
        {
          legend: 'Star Square Points',
          legendShape: 'starSquare',
          data: [{ x: 105, y: 70, markerSize: 0.8, shape: 'starSquare' }],
          color: DataVizPalette.color24,
        },
        {
          legend: 'Star Diamond Points',
          legendShape: 'starDiamond',
          data: [{ x: 125, y: 150, markerSize: 0.8, shape: 'starDiamond' }],
          color: DataVizPalette.color25,
        },
        {
          legend: 'Circle Open Points',
          legendShape: 'circleOpen',
          data: [{ x: 40, y: 130, markerSize: 0.5, shape: 'circleOpen' }],
          color: DataVizPalette.color26,
        },
        {
          legend: 'Square Open Points',
          legendShape: 'squareOpen',
          data: [{ x: 60, y: 110, markerSize: 0.5, shape: 'squareOpen' }],
          color: DataVizPalette.color27,
        },
        {
          legend: 'Diamond Open Points',
          legendShape: 'diamondOpen',
          data: [{ x: 85, y: 250, markerSize: 0.5, shape: 'diamondOpen' }],
          color: DataVizPalette.color28,
        },
        {
          legend: 'Triangle Up Open Points',
          legendShape: 'triangleUpOpen',
          data: [{ x: 100, y: 270, markerSize: 0.5, shape: 'triangleUpOpen' }],
          color: DataVizPalette.color29,
        },
        {
          legend: 'Cross Open Points',
          legendShape: 'crossOpen',
          data: [{ x: 110, y: 350, markerSize: 0.5, shape: 'crossOpen' }],
          color: DataVizPalette.color30,
        },
        {
          legend: 'X Open Points',
          legendShape: 'xOpen',
          data: [{ x: 140, y: 230, markerSize: 0.5, shape: 'xOpen' }],
          color: DataVizPalette.color31,
        },
      ],
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <div style={rootStyle}>
          <ScatterChart
            data={data}
            height={this.state.height}
            width={this.state.width}
            margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
            legendProps={{
              allowFocusOnLegends: true,
            }}
          />
        </div>
      </>
    );
  }
}
