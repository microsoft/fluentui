import * as React from 'react';
import { HeatMapChart, IHeatMapChartProps } from '@fluentui/react-charting';

interface IHeatMapChartPiecewiseScaleExampleState {
  width: number;
  height: number;
}

export class HeatMapChartPiecewiseScaleExample extends React.Component<{}, IHeatMapChartPiecewiseScaleExampleState> {
  constructor(props: any) {
    super(props);
    this.state = {
      width: 450,
      height: 350,
    };
  }
  public render(): React.ReactNode {
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const ypointMapping: { [key: string]: string } = {
      p1: 'ohio',
      p2: 'Alaska',
      p3: 'Texas',
      p4: 'DC',
      p5: 'NYC',
    };
    const yPoint: string[] = ['p1', 'p2', 'p3', 'p4', 'p5'];

    const xPoint: Date[] = [
      new Date('2020-03-03'), // 0
      new Date('2020-03-04'), // 1
      new Date('2020-03-05'), // 2
    ];
    const HeatMapData: IHeatMapChartProps['data'] = [
      {
        value: 50,
        legend: 'Execllent (0-100)',
        data: [
          {
            x: xPoint[0],
            y: yPoint[0],
            value: 81,
            rectText: 81,
            descriptionMessage: 'air quality is seems to be very nice today',
          },
          {
            x: xPoint[0],
            y: yPoint[2],
            value: 31,
            rectText: 31,
            descriptionMessage: 'today we have a good air quality in the alaska',
          },
        ],
      },
      {
        value: 150,
        legend: 'Good (101-200)',
        data: [
          {
            x: xPoint[2],
            y: yPoint[2],
            value: 107,
            rectText: 107,
            descriptionMessage: 'air quality is seems to be very nice today',
          },
          {
            x: xPoint[0],
            y: yPoint[1],
            value: 165,
            rectText: 165,
            descriptionMessage: 'today we have a good air quality in the alaska',
          },
          {
            x: xPoint[1],
            y: yPoint[0],
            value: 162,
            rectText: 162,
            descriptionMessage: 'a sudden rise of 150 units in the ohio today',
          },
          {
            x: xPoint[2],
            y: yPoint[0],
            value: 190,
            rectText: 190,
            descriptionMessage: 'air quality seems to decrease only 15 units from yesterday',
          },
        ],
      },
      {
        value: 250,
        legend: 'Medium (201-300)',
        data: [
          {
            x: xPoint[1],
            y: yPoint[1],
            value: 284,
            rectText: 284,
            descriptionMessage: 'alaska has just reported nearly 100 units hike air quality',
          },
        ],
      },
      {
        value: 350,
        legend: 'Danger (301-400)',
        data: [
          {
            x: xPoint[1],
            y: yPoint[2],
            value: 384,
            rectText: 384,
            descriptionMessage: 'a sudden spike in the badness of the air quality',
          },
          {
            x: xPoint[2],
            y: yPoint[1],
            value: 324,
            rectText: 324,
            descriptionMessage: 'day by day situation is getting worse in the alaska',
          },
        ],
      },
      {
        value: 450,
        legend: 'Very Danger (401-500)',
        data: [],
      },
    ];
    return (
      <>
        <label htmlFor="changeWidth_Example">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          onChange={this._onWidthChange}
          id="changeWidth_Example"
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Example">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Example"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <p>Heat map explaining the Air Quality Index</p>
        <div style={rootStyle}>
          <HeatMapChart
            culture={window.navigator.language}
            chartTitle="Heat map chart piecewise scale example"
            data={HeatMapData}
            // eslint-disable-next-line react/jsx-no-bind
            yAxisStringFormatter={(point: string) => ypointMapping[point as string]}
            width={this.state.width}
            height={this.state.height}
            domainValuesForColorScale={[0, 250, 500]}
            rangeValuesForColorScale={['green', 'orange', 'red']}
          />
        </div>
      </>
    );
  }
  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
}
