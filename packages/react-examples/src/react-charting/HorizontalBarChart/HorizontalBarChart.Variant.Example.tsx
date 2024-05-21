import * as React from 'react';
import {
  HorizontalBarChart,
  HorizontalBarChartVariant,
  IChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { ThemeContext } from '@fluentui/react';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IHBCVariantExampleState {
  hideLabels: boolean;
}

export class HorizontalBarChartVariantExample extends React.Component<{}, IHBCVariantExampleState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      hideLabels: false,
    };
  }

  public render() {
    const isDarkMode: boolean = React.useContext(ThemeContext)?.isInverted ?? false;

    const data: IChartProps[] = [
      {
        chartTitle: 'one',
        chartData: [
          {
            legend: 'one',
            horizontalBarChartdata: { x: 1543, y: 15000 },
            color: getColorFromToken(DataVizPalette.color17, isDarkMode),
          },
        ],
      },
      {
        chartTitle: 'two',
        chartData: [
          {
            legend: 'two',
            horizontalBarChartdata: { x: 800, y: 15000 },
            color: getColorFromToken(DataVizPalette.color18, isDarkMode),
          },
        ],
      },
      {
        chartTitle: 'three',
        chartData: [
          {
            legend: 'three',
            horizontalBarChartdata: { x: 8888, y: 15000 },
            color: getColorFromToken(DataVizPalette.color19, isDarkMode),
          },
        ],
      },
      {
        chartTitle: 'four',
        chartData: [
          {
            legend: 'four',
            horizontalBarChartdata: { x: 15888, y: 15000 },
            color: getColorFromToken(DataVizPalette.color20, isDarkMode),
          },
        ],
      },
      {
        chartTitle: 'five',
        chartData: [
          {
            legend: 'five',
            horizontalBarChartdata: { x: 11444, y: 15000 },
            color: getColorFromToken(DataVizPalette.color21, isDarkMode),
          },
        ],
      },
      {
        chartTitle: 'six',
        chartData: [
          {
            legend: 'six',
            horizontalBarChartdata: { x: 14000, y: 15000 },
            color: getColorFromToken(DataVizPalette.color22, isDarkMode),
          },
        ],
      },
      {
        chartTitle: 'seven',
        chartData: [
          {
            legend: 'seven',
            horizontalBarChartdata: { x: 9855, y: 15000 },
            color: getColorFromToken(DataVizPalette.color23, isDarkMode),
          },
        ],
      },
      {
        chartTitle: 'eight',
        chartData: [
          {
            legend: 'eight',
            horizontalBarChartdata: { x: 4250, y: 15000 },
            color: getColorFromToken(DataVizPalette.color24, isDarkMode),
          },
        ],
      },
    ];

    return (
      <>
        <Checkbox
          label="Hide labels"
          checked={this.state.hideLabels}
          onChange={this._onCheckChange}
          styles={{ root: { marginBottom: '20px' } }}
        />
        <div style={{ maxWidth: 600 }}>
          <HorizontalBarChart
            data={data}
            variant={HorizontalBarChartVariant.AbsoluteScale}
            hideLabels={this.state.hideLabels}
          />
        </div>
      </>
    );
  }

  private _onCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ hideLabels: checked });
  };
}
