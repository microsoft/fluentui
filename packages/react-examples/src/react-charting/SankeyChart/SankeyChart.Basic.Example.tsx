import {
  IChartProps,
  ISankeyChartProps,
  SankeyChart,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import * as React from 'react';

interface ISankeyChartBasicState {
  width: number;
  height: number;
}

export class SankeyChartBasicExample extends React.Component<{}, ISankeyChartBasicState> {
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      width: 820,
      height: 412,
    };
  }

  public componentDidMount(): void {
    const style = document.createElement('style');
    const focusStylingCSS = `
    .containerDiv [contentEditable=true]:focus,
    .containerDiv [tabindex]:focus,
    .containerDiv area[href]:focus,
    .containerDiv button:focus,
    .containerDiv iframe:focus,
    .containerDiv input:focus,
    .containerDiv select:focus,
    .containerDiv textarea:focus {
      outline: -webkit-focus-ring-color auto 5px;
    }
    `;
    style.appendChild(document.createTextNode(focusStylingCSS));
    document.head.appendChild(style);
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _basicExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          {
            nodeId: 0,
            name: 'node0',
            color: getColorFromToken(DataVizPalette.color3),
            borderColor: getColorFromToken(DataVizPalette.color23),
          },
          {
            nodeId: 1,
            name: 'node1',
            color: getColorFromToken(DataVizPalette.color22),
            borderColor: getColorFromToken(DataVizPalette.color2),
          },
          {
            nodeId: 2,
            name: 'node2',
            color: getColorFromToken(DataVizPalette.color1),
            borderColor: getColorFromToken(DataVizPalette.color21),
          },
          {
            nodeId: 3,
            name: 'node3',
            color: getColorFromToken(DataVizPalette.color27),
            borderColor: getColorFromToken(DataVizPalette.color7),
          },
          {
            nodeId: 4,
            name: 'node4',
            color: getColorFromToken(DataVizPalette.color28),
            borderColor: getColorFromToken(DataVizPalette.color8),
          },
          {
            nodeId: 5,
            name: 'node5',
            color: getColorFromToken(DataVizPalette.color4),
            borderColor: getColorFromToken(DataVizPalette.color24),
          },
        ],
        links: [
          {
            source: 0,
            target: 2,
            value: 2,
          },
          {
            source: 1,
            target: 2,
            value: 2,
          },
          {
            source: 1,
            target: 3,
            value: 2,
          },
          {
            source: 0,
            target: 4,
            value: 2,
          },
          {
            source: 2,
            target: 3,
            value: 2,
          },
          {
            source: 2,
            target: 4,
            value: 2,
          },
          {
            source: 3,
            target: 4,
            value: 4,
          },
          {
            source: 3,
            target: 5,
            value: 4,
          },
        ],
      },
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <div className="containerDiv">
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={400}
          max={1000}
          id="changeWidth_Basic"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={312}
          max={400}
          id="changeHeight_Basic"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <div style={rootStyle}>
          <SankeyChart
            data={data}
            height={this.state.height}
            width={this.state.width}
            shouldResize={this.state.width + this.state.height}
          />
        </div>
      </div>
    );
  }
}
