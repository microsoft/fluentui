import * as React from 'react';
import { IPolarChartProps, PolarChart } from '@fluentui/react-charting';
import { Stack, StackItem } from '@fluentui/react';

const data: IPolarChartProps['data'] = [
  {
    type: 'areapolar',
    legend: 'Mike',
    color: '#8884d8',
    data: [
      { r: 120, theta: 'Math' },
      { r: 98, theta: 'Chinese' },
      { r: 86, theta: 'English' },
      { r: 99, theta: 'Geography' },
      { r: 85, theta: 'Physics' },
      { r: 65, theta: 'History' },
    ],
  },
  {
    type: 'areapolar',
    legend: 'Lily',
    color: '#82ca9d',
    data: [
      { r: 110, theta: 'Math' },
      { r: 130, theta: 'Chinese' },
      { r: 130, theta: 'English' },
      { r: 100, theta: 'Geography' },
      { r: 90, theta: 'Physics' },
      { r: 85, theta: 'History' },
    ],
  },
];

interface IPolarChartBasicExampleState {
  width: number;
  height: number;
}

export class PolarChartBasicExample extends React.Component<{}, IPolarChartBasicExampleState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      width: 600,
      height: 350,
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

  public render(): React.ReactNode {
    return (
      <div className="containerDiv">
        <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
          <StackItem>
            <label htmlFor="width-slider">Width:</label>
            <input
              type="range"
              value={this.state.width}
              min={0}
              max={1000}
              id="width-slider"
              onChange={this._onWidthChange}
              aria-valuetext={`Width: ${this.state.width}`}
            />
            <span>{this.state.width}</span>
          </StackItem>
          <StackItem>
            <label htmlFor="height-slider">Height:</label>
            <input
              type="range"
              value={this.state.height}
              min={0}
              max={1000}
              id="height-slider"
              onChange={this._onHeightChange}
              aria-valuetext={`Height: ${this.state.height}`}
            />
            <span>{this.state.height}</span>
          </StackItem>
        </Stack>
        <div style={{ width: this.state.width, height: this.state.height, marginTop: 10 }}>
          <PolarChart
            data={data}
            width={this.state.width}
            height={this.state.height}
            shape="polygon"
            direction="clockwise"
          />
        </div>
      </div>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };

  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
}
