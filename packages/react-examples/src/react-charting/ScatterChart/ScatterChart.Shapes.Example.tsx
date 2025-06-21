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
          data: [{ x: 15, y: 50, markerSize: 1 }],
          color: DataVizPalette.color1,
        },
        {
          legend: 'Square Points',
          legendShape: 'square',
          data: [{ x: 50, y: 50, markerSize: 0.5 }],
          color: DataVizPalette.color2,
        },
        {
          legend: 'Triangle Points',
          legendShape: 'triangle',
          data: [{ x: 10, y: 250, markerSize: 0.5 }],
          color: DataVizPalette.color3,
        },
        {
          legend: 'Diamond Points',
          legendShape: 'diamond',
          data: [{ x: 25, y: 160, markerSize: 0.5 }],
          color: DataVizPalette.color4,
        },
        {
          legend: 'Cross Points',
          legendShape: 'cross',
          data: [{ x: 130, y: 320, markerSize: 0.5 }],
          color: DataVizPalette.color5,
        },
        {
          legend: 'X Points',
          legendShape: 'x',
          data: [{ x: 60, y: 190, markerSize: 0.5 }],
          color: DataVizPalette.color6,
        },
        {
          legend: 'Hexagon Points',
          legendShape: 'hexagon',
          data: [{ x: 85, y: 190, markerSize: 0.5 }],
          color: DataVizPalette.color8,
        },
        {
          legend: 'Pentagon Points',
          legendShape: 'pentagon',
          data: [{ x: 120, y: 210, markerSize: 0.5 }],
          color: DataVizPalette.color9,
        },
        {
          legend: 'Octagon Points',
          legendShape: 'octagon',
          data: [{ x: 140, y: 90, markerSize: 0.5 }],
          color: DataVizPalette.color10,
        },
        {
          legend: 'Star Points',
          legendShape: 'star',
          data: [{ x: 10, y: 140, markerSize: 0.5 }],
          color: DataVizPalette.color11,
        },
        {
          legend: 'Pyramid Points',
          legendShape: 'pyramid',
          data: [{ x: 40, y: 250, markerSize: 0.5 }],
          color: DataVizPalette.color11,
        },
        {
          legend: 'Hexagram Points',
          legendShape: 'hexagram',
          data: [{ x: 85, y: 120, markerSize: 0.5 }],
          color: DataVizPalette.color12,
        },
        {
          legend: 'Triangle Up Points',
          legendShape: 'triangleup',
          data: [{ x: 105, y: 200, markerSize: 0.5 }],
          color: DataVizPalette.color13,
        },
        {
          legend: 'Triangle Down Points',
          legendShape: 'triangledown',
          data: [{ x: 25, y: 280, markerSize: 0.5 }],
          color: DataVizPalette.color14,
        },
        {
          legend: 'Triangle Left Points',
          legendShape: 'triangleleft',
          data: [{ x: 145, y: 160, markerSize: 0.5 }],
          color: DataVizPalette.color15,
        },
        {
          legend: 'Triangle Right Points',
          legendShape: 'triangleright',
          data: [{ x: 55, y: 310, markerSize: 0.5 }],
          color: DataVizPalette.color16,
        },
        {
          legend: 'Hexagon2 Points',
          legendShape: 'hexagon2',
          data: [{ x: 45, y: 180, markerSize: 0.5 }],
          color: DataVizPalette.color21,
        },
        {
          legend: 'Star Triangle Up Points',
          legendShape: 'startriangleup',
          data: [{ x: 65, y: 260, markerSize: 0.5 }],
          color: DataVizPalette.color22,
        },
        {
          legend: 'Star Triangle Down Points',
          legendShape: 'startriangledown',
          data: [{ x: 85, y: 340, markerSize: 0.5 }],
          color: DataVizPalette.color23,
        },
        {
          legend: 'Star Square Points',
          legendShape: 'starsquare',
          data: [{ x: 105, y: 70, markerSize: 0.8 }],
          color: DataVizPalette.color24,
        },
        {
          legend: 'Star Diamond Points',
          legendShape: 'stardiamond',
          data: [{ x: 125, y: 150, markerSize: 0.8 }],
          color: DataVizPalette.color25,
        },
        {
          legend: 'Circle Open Points',
          legendShape: 'circle-open',
          data: [{ x: 40, y: 130, markerSize: 0.5 }],
          color: DataVizPalette.color26,
        },
        {
          legend: 'Square Open Points',
          legendShape: 'square-open',
          data: [{ x: 60, y: 110, markerSize: 0.5 }],
          color: DataVizPalette.color27,
        },
        {
          legend: 'Diamond Open Points',
          legendShape: 'diamond-open',
          data: [{ x: 85, y: 250, markerSize: 0.5 }],
          color: DataVizPalette.color28,
        },
        {
          legend: 'Triangle Up Open Points',
          legendShape: 'triangleup-open',
          data: [{ x: 100, y: 270, markerSize: 0.5 }],
          color: DataVizPalette.color29,
        },
        {
          legend: 'Cross Open Points',
          legendShape: 'cross-open',
          data: [{ x: 110, y: 350, markerSize: 0.5 }],
          color: DataVizPalette.color30,
        },
        {
          legend: 'X Open Points',
          legendShape: 'x-open',
          data: [{ x: 140, y: 230, markerSize: 0.5 }],
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
            legendProps={{
              allowFocusOnLegends: true,
            }}
          />
        </div>
      </>
    );
  }
}
