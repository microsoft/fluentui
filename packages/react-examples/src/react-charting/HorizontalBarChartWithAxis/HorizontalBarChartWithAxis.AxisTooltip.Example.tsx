import * as React from 'react';
import {
  HorizontalBarChartWithAxis,
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';

interface IHorizontalBarChartWithAxisState {
  selectedOption: string;
}

export class HorizontalBarChartWithAxisTooltipExample extends React.Component<{}, IHorizontalBarChartWithAxisState> {
  constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);
    this.state = {
      selectedOption: 'showTooltip',
    };
  }
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points: IHorizontalBarChartWithAxisDataPoint[] = [
      {
        x: 1000,
        y: 1000,
        color: getColorFromToken(DataVizPalette.color5),
      },
      {
        x: 2000,
        y: 5000,
        color: getColorFromToken(DataVizPalette.color6),
      },
      {
        x: 3000,
        y: 3000,
        color: getColorFromToken(DataVizPalette.color7),
      },
      {
        x: 4000,
        y: 2000,
        color: getColorFromToken(DataVizPalette.color8),
      },
    ];

    const rootStyle = { width: '650px', height: '350px' };
    return (
      <>
        <div style={rootStyle}>
          <HorizontalBarChartWithAxis
            chartTitle="Horizontal bar chart axis tooltip example "
            data={points}
            height={350}
            width={650}
            hideLegend={true}
            hideTooltip={false}
            enableReflow={true}
          />
        </div>
      </>
    );
  }
}
