import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { DeclarativeChart, DeclarativeChartProps, Schema } from '@fluentui/react-charting';

interface IDeclarativeChartState {
  selectedChoice: string;
  preSelectLegends: boolean;
  selectedLegends: string;
}

const options: IDropdownOption[] = [
  { key: 'areachart', text: 'Area Chart' },
  { key: 'donutchart', text: 'Donut Chart' },
  { key: 'gaugechart', text: 'Gauge Chart' },
  { key: 'heatmapchart', text: 'Heatmap Chart' },
  { key: 'horizontalbarchart', text: 'HorizontalBar Chart' },
  { key: 'linechart', text: 'Line Chart' },
  { key: 'piechart', text: 'Pie Chart' },
  { key: 'sankeychart', text: 'Sankey Chart' },
  { key: 'verticalbarchart', text: 'VerticalBar Chart' },
  { key: 'verticalbar_histogramchart', text: 'VerticalBar Histogram Chart' },
];

const schemas: any[] = [
  { key: 'areachart', schema: require('./schema/fluent_area.json') },
  { key: 'donutchart', schema: require('./schema/fluent_donut.json') },
  { key: 'gaugechart', schema: require('./schema/fluent_gauge.json') },
  { key: 'heatmapchart', schema: require('./schema/fluent_heatmap.json') },
  { key: 'horizontalbarchart', schema: require('./schema/fluent_horizontalbar.json') },
  { key: 'linechart', schema: require('./schema/fluent_line.json') },
  { key: 'piechart', schema: require('./schema/fluent_pie.json') },
  { key: 'sankeychart', schema: require('./schema/fluent_sankey.json') },
  { key: 'verticalbarchart', schema: require('./schema/fluent_verticalbar.json') },
  { key: 'verticalbar_histogramchart', schema: require('./schema/fluent_verticalbar_histogram.json') },
];

const dropdownStyles = { dropdown: { width: 200 } };

export class DeclarativeChartBasicExample extends React.Component<{}, IDeclarativeChartState> {
  constructor(props: DeclarativeChartProps) {
    super(props);
    this.state = {
      selectedChoice: 'donutchart',
      preSelectLegends: false,
      selectedLegends: '',
    };
  }

  public render(): JSX.Element {
    return <div>{this._createDeclarativeChart()}</div>;
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IDropdownOption): void => {
    this.setState({ selectedChoice: option.key as string, selectedLegends: '' });
  };

  private _onTogglePreselectLegends = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ preSelectLegends: checked });
  };

  private _handleChartSchemaChanged = (eventData: Schema) => {
    const { selectedLegends } = eventData.plotlySchema;
    this.setState({ selectedLegends: selectedLegends.join(', ') });
  };

  private _getSchemaByKey(key: string): any {
    const schema = schemas.find(x => x.key === key);
    return schema ? schema.schema : null;
  }

  private _createDeclarativeChart(): JSX.Element {
    const selectedPlotlySchema = this._getSchemaByKey(this.state.selectedChoice);
    const uniqueKey = `${this.state.selectedChoice}_${this.state.preSelectLegends}`;
    let inputSchema: Schema = { plotlySchema: selectedPlotlySchema };

    if (this.state.preSelectLegends === false) {
      const { data, layout } = selectedPlotlySchema;
      inputSchema = { plotlySchema: { data, layout } };
    }

    return (
      <>
        <div style={{ display: 'flex' }}>
          <Dropdown
            label="Select a schema"
            options={options}
            onChange={this._onChange}
            selectedKey={this.state.selectedChoice}
            styles={dropdownStyles}
          />
          &nbsp;&nbsp;&nbsp;
          <Toggle
            label="Pre select legends"
            onText="ON"
            offText="OFF"
            onChange={this._onTogglePreselectLegends}
            checked={this.state.preSelectLegends}
          />
        </div>
        <br />
        <br />
        <DeclarativeChart key={uniqueKey} chartSchema={inputSchema} onSchemaChange={this._handleChartSchemaChanged} />
        <br />
        Legend selection changed : {this.state.selectedLegends}
      </>
    );
  }
}
