import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { DeclarativeChart, DeclarativeChartProps, IDeclarativeChart, Schema } from '@fluentui/react-charting';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: string;
}

type FluentDataVizColorPaletteTypes = 'default' | 'builtin' | 'others';

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  public static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: `${error.message} ${error.stack}` };
  }

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  public render() {
    if (this.state.hasError) {
      return <h1>${this.state.error}</h1>;
    }

    return this.props.children;
  }
}

interface IDeclarativeChartState {
  selectedChoice: string;
  selectedLegends: string;
  fluentDataVizColorPalette: FluentDataVizColorPaletteTypes;
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
  { key: 'scatterchart', text: 'Scatter Chart' },
  { key: 'chart_table', text: 'Chart Table' },
  { key: 'funnelchart', text: 'Funnel Chart' },
  { key: 'ganttchart', text: 'Gantt Chart' },
];

const colorOptions: IDropdownOption[] = [
  { key: 'default', text: 'Default' },
  { key: 'builtin', text: 'Builtin' },
  { key: 'override', text: 'Override' },
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
  { key: 'scatterchart', schema: require('./schema/fluent_scatter.json') },
  { key: 'chart_table', schema: require('./schema/fluent_table.json') },
  { key: 'funnelchart', schema: require('./schema/fluent_funnel.json') },
  { key: 'ganttchart', schema: require('./schema/fluent_gantt.json') },
];

const dropdownStyles = { dropdown: { width: 200 } };

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: 300 } };

function fileSaver(url: string) {
  const saveLink = document.createElement('a');
  saveLink.href = url;
  saveLink.download = 'converted-image.png';
  document.body.appendChild(saveLink);
  saveLink.click();
  document.body.removeChild(saveLink);
}

export class DeclarativeChartBasicExample extends React.Component<{}, IDeclarativeChartState> {
  private _declarativeChartRef: React.RefObject<IDeclarativeChart>;
  private _lastKnownValidLegends: string[] | undefined;

  constructor(props: DeclarativeChartProps) {
    super(props);
    const defaultselection = 'donutchart';
    const selectedPlotlySchema = this._getSchemaByKey(defaultselection);
    const { selectedLegends } = selectedPlotlySchema;
    this.state = {
      selectedChoice: defaultselection,
      selectedLegends: JSON.stringify(selectedLegends),
      fluentDataVizColorPalette: 'default',
    };

    this._declarativeChartRef = React.createRef();
    this._lastKnownValidLegends = selectedLegends;
  }

  public componentDidMount() {
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
  }

  public render(): JSX.Element {
    return <div>{this._createDeclarativeChart()}</div>;
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IDropdownOption): void => {
    const selectedPlotlySchema = this._getSchemaByKey(option.key as string);
    const { selectedLegends } = selectedPlotlySchema;
    this.setState({ selectedChoice: option.key as string, selectedLegends: JSON.stringify(selectedLegends) });
  };

  private _onColorPaletteChange = (ev: React.FormEvent<HTMLInputElement>, option: IDropdownOption): void => {
    this.setState({ fluentDataVizColorPalette: option.key as FluentDataVizColorPaletteTypes });
  };

  private _onSelectedLegendsEdited = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string,
  ): void => {
    this.setState({ selectedLegends: newValue ?? '' });
  };

  private _handleChartSchemaChanged = (eventData: Schema) => {
    const { selectedLegends } = eventData.plotlySchema;
    this.setState({ selectedLegends: JSON.stringify(selectedLegends) });
  };

  private _getSchemaByKey(key: string): any {
    const schema = schemas.find(x => x.key === key);
    return schema ? schema.schema : null;
  }

  private _createDeclarativeChart(): JSX.Element {
    const uniqueKey = `${this.state.selectedChoice}_${this.state.fluentDataVizColorPalette}`;
    const currentPlotlySchema = this._getSchemaByKey(this.state.selectedChoice);
    const { data, layout } = currentPlotlySchema;
    if (this.state.selectedLegends === '') {
      this._lastKnownValidLegends = undefined;
    } else {
      try {
        this._lastKnownValidLegends = JSON.parse(this.state.selectedLegends);
      } catch (error) {
        // Nothing to do here
      }
    }
    const plotlySchema = { data, layout, selectedLegends: this._lastKnownValidLegends };
    const inputSchema: Schema = { plotlySchema };

    return (
      <ErrorBoundary>
        <div style={{ display: 'flex' }}>
          <Dropdown
            label="Select a schema"
            options={options}
            onChange={this._onChange}
            selectedKey={this.state.selectedChoice}
            styles={dropdownStyles}
          />
          &nbsp;&nbsp;&nbsp;
          <Dropdown
            label="Select a color palette"
            options={colorOptions}
            onChange={this._onColorPaletteChange}
            selectedKey={this.state.fluentDataVizColorPalette}
            styles={dropdownStyles}
          />
          &nbsp;&nbsp;
        </div>
        <br />
        <button
          onClick={() => {
            this._declarativeChartRef.current?.exportAsImage().then((imgData: string) => {
              fileSaver(imgData);
            });
          }}
        >
          Download
        </button>
        <br />
        <DeclarativeChart
          key={uniqueKey}
          chartSchema={inputSchema}
          onSchemaChange={this._handleChartSchemaChanged}
          componentRef={this._declarativeChartRef}
          colorwayType={this.state.fluentDataVizColorPalette}
        />
        <br />
        <TextField
          label="Current Legend selection"
          value={this.state.selectedLegends}
          onChange={this._onSelectedLegendsEdited}
          styles={textFieldStyles}
        />
      </ErrorBoundary>
    );
  }
}
