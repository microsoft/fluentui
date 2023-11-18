import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';

const options: IChoiceGroupOption[] = [
  { key: 'WrapTickValues', text: 'Wrap X Axis Ticks' },
  { key: 'showTooltip', text: 'Show Tooltip at X axis ticks' },
];

interface IVerticalBarState {
  selectedCallout: string;
}

export class VerticalBarChartTooltipExample extends React.Component<{}, IVerticalBarState> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      selectedCallout: 'showTooltip',
    };
  }
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points: IVerticalBarChartDataPoint[] = [
      {
        x: 'Simple Text',
        y: 1000,
        color: DefaultPalette.accent,
      },
      {
        x: 'Showing all text here',
        y: 5000,
        color: DefaultPalette.blueDark,
      },
      {
        x: 'Large data, showing all text by tooltip',
        y: 3000,
        color: DefaultPalette.blueMid,
      },
      {
        x: 'Data',
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
          <VerticalBarChart
            chartTitle="Vertical bar chart axis tooltip example "
            data={points}
            height={350}
            width={650}
            hideLegend={true}
            hideTooltip={false}
            showXAxisLablesTooltip={this.state.selectedCallout === 'showTooltip' ? true : false}
            wrapXAxisLables={this.state.selectedCallout === 'WrapTickValues' ? true : false}
            enableReflow={true}
          />
        </div>
      </>
    );
  }
}
