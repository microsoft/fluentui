import * as React from 'react';
import {
  HorizontalBarChartWithAxis,
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisDataPoint,
} from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';

const options: IChoiceGroupOption[] = [
  { key: 'WrapTickValues', text: 'Wrap X Axis Ticks' },
  { key: 'showTooltip', text: 'Show Tooltip at X axis ticks' },
];

interface IVerticalBarState {
  selectedCallout: string;
}

export class HorizontalBarChartWithAxisTooltipExample extends React.Component<{}, IVerticalBarState> {
  constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);
    this.state = {
      selectedCallout: 'showTooltip',
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
        color: DefaultPalette.accent,
      },
      {
        x: 2000,
        y: 5000,
        color: DefaultPalette.blueDark,
      },
      {
        x: 3000,
        y: 3000,
        color: DefaultPalette.blueMid,
      },
      {
        x: 4000,
        y: 2000,
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
            showXAxisLablesTooltip={this.state.selectedCallout === 'showTooltip' ? true : false}
            wrapXAxisLables={this.state.selectedCallout === 'WrapTickValues' ? true : false}
          />
        </div>
      </>
    );
  }
}
