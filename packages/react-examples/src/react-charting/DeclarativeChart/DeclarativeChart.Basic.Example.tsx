import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { DeclarativeChart, DeclarativeChartProps } from '@fluentui/react-charting';
import { areaSchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_area';
import { donutSchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_donut';
import { gaugeSchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_gauge';
import { heatmapSchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_heatmap';
import { hbcSchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_horizontalbar';
import { lineSchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_line';
import { pieSchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_pie';
import { sankeySchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_sankey';
import { vbcHistogramSchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_verticalbar_histogram';
import { vbcSchema } from '@fluentui/react-examples/src/react-charting/DeclarativeChart/schema/fluent_verticalbar';

interface IDeclarativeChartState {
  selectedChoice: string;
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
  { key: 'areachart', schema: areaSchema },
  { key: 'donutchart', schema: donutSchema },
  { key: 'gaugechart', schema: gaugeSchema },
  { key: 'heatmapchart', schema: heatmapSchema },
  { key: 'horizontalbarchart', schema: hbcSchema },
  { key: 'linechart', schema: lineSchema },
  { key: 'piechart', schema: pieSchema },
  { key: 'sankeychart', schema: sankeySchema },
  { key: 'verticalbarchart', schema: vbcHistogramSchema },
  { key: 'verticalbar_histogramchart', schema: vbcSchema },
];

const dropdownStyles = { dropdown: { width: 200 } };

export class DeclarativeChartBasicExample extends React.Component<{}, IDeclarativeChartState> {
  constructor(props: DeclarativeChartProps) {
    super(props);
    this.state = {
      selectedChoice: 'donutchart',
    };
  }

  public render(): JSX.Element {
    return <div>{this._createDeclarativeChart()}</div>;
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IDropdownOption): void => {
    this.setState({ selectedChoice: option.key as string });
  };

  private _getSchemaByKey(key: string): any {
    const schema = schemas.find(x => x.key === key);
    return schema ? schema.schema : null;
  }

  private _createDeclarativeChart(): JSX.Element {
    const selectedSchema = this._getSchemaByKey(this.state.selectedChoice);

    return (
      <>
        <Dropdown
          label="Select a schema"
          options={options}
          onChange={this._onChange}
          selectedKey={this.state.selectedChoice}
          styles={dropdownStyles}
        />
        <br />
        <br />
        <DeclarativeChart chartSchema={selectedSchema} />
      </>
    );
  }
}
