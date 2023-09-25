import * as React from 'react';
import { IVSChartDataPoint, IVerticalStackedChartProps, VerticalStackedBarChart } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';

const options: IChoiceGroupOption[] = [
  { key: 'WrapTickValues', text: 'Wrap X Axis Ticks' },
  { key: 'showTooltip', text: 'Show Tooltip at X axis ticks' },
];

interface IVerticalStackedBarState {
  selectedCallout: string;
}

export class VerticalStackedBarChartTooltipExample extends React.Component<{}, IVerticalStackedBarState> {
  constructor(props: IVerticalStackedChartProps) {
    super(props);
    this.state = {
      selectedCallout: 'showTooltip',
    };
  }
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 2, color: DefaultPalette.blue },
      { legend: 'Metadata2', data: 0.5, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 0, color: DefaultPalette.blueLight },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 30, color: DefaultPalette.blue },
      { legend: 'Metadata2', data: 3, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 10, color: DefaultPalette.blue },
      { legend: 'Metadata2', data: 60, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 30, color: DefaultPalette.blueLight },
    ];

    const data: IVerticalStackedChartProps[] = [
      { chartData: firstChartPoints, xAxisPoint: 'Simple Data' },
      { chartData: secondChartPoints, xAxisPoint: 'Long text will disaply all text' },
      { chartData: thirdChartPoints, xAxisPoint: 'Data' },
      { chartData: firstChartPoints, xAxisPoint: 'Meta data' },
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
          <VerticalStackedBarChart
            chartTitle="Vertical stacked bar chart axis tooltip example"
            data={data}
            height={350}
            width={650}
            showXAxisLablesTooltip={this.state.selectedCallout === 'showTooltip' ? true : false}
            wrapXAxisLables={this.state.selectedCallout === 'WrapTickValues' ? true : false}
            enableReflow={true}
          />
        </div>
      </>
    );
  }
}
