import * as React from 'react';
import { FunnelChart, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { Stack, StackItem, Toggle, ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';

interface IFunnelChartBasicState {
  width: number;
  height: number;
  hideLegend: boolean;
  orientation: 'horizontal' | 'vertical';
  legendMultiSelect: boolean;
}

export class FunnelChartBasicExample extends React.Component<{}, IFunnelChartBasicState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 400,
      height: 300,
      hideLegend: false,
      orientation: 'horizontal',
      legendMultiSelect: false,
    };
  }

  public render(): React.ReactNode {
    const { width, height, hideLegend, orientation, legendMultiSelect } = this.state;

    // Basic funnel chart data
    const basicData = [
      { stage: 'Visitors', value: 1000, color: getColorFromToken(DataVizPalette.color5) },
      { stage: 'Signups', value: 600, color: getColorFromToken(DataVizPalette.color6) },
      { stage: 'Trials', value: 300, color: getColorFromToken(DataVizPalette.color7) },
      { stage: 'Customers', value: 150, color: getColorFromToken(DataVizPalette.color10) },
    ];

    // Stacked funnel chart data
    const stackedData = [
      {
        stage: 'Visit',
        subValues: [
          { category: 'A', value: 100, color: getColorFromToken(DataVizPalette.color5) },
          { category: 'B', value: 80, color: getColorFromToken(DataVizPalette.color6) },
        ],
      },
      {
        stage: 'Sign-Up',
        subValues: [
          { category: 'A', value: 60, color: getColorFromToken(DataVizPalette.color5) },
          { category: 'B', value: 40, color: getColorFromToken(DataVizPalette.color6) },
        ],
      },
      {
        stage: 'Purchase',
        subValues: [
          { category: 'A', value: 30, color: getColorFromToken(DataVizPalette.color5) },
          { category: 'B', value: 20, color: getColorFromToken(DataVizPalette.color6) },
        ],
      },
    ];

    const orientationOptions: IChoiceGroupOption[] = [
      { key: 'horizontal', text: 'Horizontal' },
      { key: 'vertical', text: 'Vertical' },
    ];

    return (
      <Stack tokens={{ childrenGap: 20 }}>
        <StackItem>
          <h3>Funnel Chart Examples</h3>
          <p>This example demonstrates both basic and stacked funnel charts with different orientations.</p>
        </StackItem>

        <StackItem>
          <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
            <Toggle
              label="Hide Legend"
              onText="ON"
              offText="OFF"
              checked={hideLegend}
              onChange={this._onToggleHideLegend}
            />
            <Toggle
              label="Multiple Legend Selection"
              onText="ON"
              offText="OFF"
              checked={legendMultiSelect}
              onChange={this._onToggleLegendMultiSelect}
            />
          </Stack>
        </StackItem>

        <StackItem>
          <ChoiceGroup
            label="Orientation"
            selectedKey={orientation}
            options={orientationOptions}
            onChange={this._onOrientationChange}
          />
        </StackItem>

        <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
          <StackItem>
            <h4>Basic Funnel Chart</h4>
            <div style={{ width: `${width}px`, height: `${height}px` }}>
              <FunnelChart
                data={basicData}
                chartTitle="Basic Funnel Chart"
                width={width}
                height={height}
                hideLegend={hideLegend}
                orientation={orientation}
                legendProps={{
                  canSelectMultipleLegends: legendMultiSelect,
                }}
              />
            </div>
          </StackItem>

          <StackItem>
            <h4>Stacked Funnel Chart</h4>
            <div style={{ width: `${width}px`, height: `${height}px` }}>
              <FunnelChart
                data={stackedData}
                chartTitle="Stacked Funnel Chart"
                width={width}
                height={height}
                hideLegend={hideLegend}
                orientation={orientation}
                legendProps={{
                  canSelectMultipleLegends: legendMultiSelect,
                }}
              />
            </div>
          </StackItem>
        </Stack>
      </Stack>
    );
  }

  private _onToggleHideLegend = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ hideLegend: checked! });
  };

  private _onToggleLegendMultiSelect = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ legendMultiSelect: checked! });
  };

  private _onOrientationChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption,
  ): void => {
    if (option) {
      this.setState({ orientation: option.key as 'horizontal' | 'vertical' });
    }
  };
}
