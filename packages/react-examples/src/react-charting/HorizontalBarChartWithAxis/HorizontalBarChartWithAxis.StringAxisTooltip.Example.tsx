import * as React from 'react';
import {
  HorizontalBarChartWithAxis,
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisDataPoint,
} from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';

const options: IChoiceGroupOption[] = [
  { key: 'expandYAxisLabels', text: 'Expand Y Axis Ticks' },
  { key: 'showTooltip', text: 'Show Tooltip at Y Axis Ticks' },
];

interface IHorizontalBarChartWithAxisState {
  selectedCallout: string;
}

export class HorizontalBarChartWithAxisStringAxisTooltipExample extends React.Component<
  {},
  IHorizontalBarChartWithAxisState
> {
  constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);
    this.state = {
      selectedCallout: 'showTooltip',
    };
  }
  public render(): JSX.Element {
    return <div>{this._basicStringAxisExample()}</div>;
  }

  private _basicStringAxisExample(): JSX.Element {
    const points: IHorizontalBarChartWithAxisDataPoint[] = [
      {
        y: 'String One',
        x: 1000,
        color: DefaultPalette.accent,
      },
      {
        y: 'String Two',
        x: 5000,
        color: DefaultPalette.blueDark,
      },
      {
        y: 'String Three',
        x: 3000,
        color: DefaultPalette.blueMid,
      },
      {
        y: 'String Four',
        x: 2000,
        color: DefaultPalette.blue,
      },
    ];

    const rootStyle = { width: '650px', height: '350px' };
    return (
      <>
        <div>
          <ChoiceGroup
            options={options}
            defaultSelectedKey="showTooltip"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(_ev, option) => option && this.setState({ selectedCallout: option.key })}
            label="Pick one"
          />
        </div>
        <div style={rootStyle}>
          <HorizontalBarChartWithAxis
            chartTitle="Horizontal bar chart axis tooltip example "
            data={points}
            height={350}
            width={650}
            hideLegend={true}
            hideTooltip={false}
            showYAxisLablesTooltip={this.state.selectedCallout === 'showTooltip' ? true : false}
            showYAxisLables={this.state.selectedCallout === 'expandYAxisLabels' ? true : false}
            enableReflow={true}
          />
        </div>
      </>
    );
  }
}
