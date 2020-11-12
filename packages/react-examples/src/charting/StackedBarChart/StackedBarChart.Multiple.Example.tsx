import * as React from 'react';
import { StackedBarChart, IChartDataPoint, IChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

interface IStackedBarChartMultipleExample {
  showCallout: boolean;
  includeHref: boolean;
}

export class StackedBarChartMultipleExample extends React.Component<{}, IStackedBarChartMultipleExample> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      showCallout: true,
      includeHref: true,
    };
  }
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first Lorem ipsum dolor sit amet', data: 40, color: DefaultPalette.magentaDark },
      { legend: 'Winter is coming', data: 23, color: DefaultPalette.red },
      { legend: 'third Praesent era lectus, molestie vitae mauris eget', data: 35, color: DefaultPalette.blueLight },
      { legend: 'This is the fourth legend of the chart', data: 87, color: DefaultPalette.greenLight },
      { legend: 'summer branch', data: 45, placeHolder: true, color: DefaultPalette.neutralTertiaryAlt },
    ];
    const chartTitle = 'Stacked bar chart 2nd example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: points,
    };

    return (
      <>
        <Checkbox
          checked={this.state.showCallout}
          onChange={this._onCheckBoxChange}
          label={'show callout'}
          styles={{ root: { marginBottom: '20px' } }}
        />
        <Checkbox
          checked={this.state.includeHref}
          onChange={this._onHrefChange}
          label={'include href,( means it will navigate to url when clicked on bar)'}
          styles={{ root: { marginBottom: '20px' } }}
        />
        <StackedBarChart
          data={data}
          enabledLegendsWrapLines={true}
          hideTooltip={!this.state.showCallout}
          {...(this.state.includeHref && { href: 'https://google.com' })}
        />
      </>
    );
  }
  private _onCheckBoxChange = (ev?: React.FormEvent<HTMLInputElement>, checked?: boolean) => {
    this.setState({ showCallout: checked! });
  };

  private _onHrefChange = (ev?: React.FormEvent<HTMLInputElement>, checked?: boolean) => {
    this.setState({ includeHref: checked! });
  };
}
