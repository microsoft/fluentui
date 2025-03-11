import * as React from 'react';
import { DeclarativeChart, DeclarativeChartProps, IDeclarativeChart, Schema } from '@fluentui/react-charts';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: `${error.message} ${error.stack}` };
  }

  constructor(props: ErrorBoundaryProps) {
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

interface DeclarativeChartState {
  selectedChoice: string;
  selectedLegends: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

function fileSaver(url: string) {
  const saveLink = document.createElement('a');
  saveLink.href = url;
  saveLink.download = 'converted-image.png';
  document.body.appendChild(saveLink);
  saveLink.click();
  document.body.removeChild(saveLink);
}

export class DeclarativeChartBasicExample extends React.Component<{}, DeclarativeChartState> {
  private _declarativeChartRef: React.RefObject<IDeclarativeChart>;
  private _lastKnownValidLegends: string[] | undefined;

  constructor(props: DeclarativeChartProps) {
    super(props);
    const defaultselection = schemas[1].key;
    const selectedPlotlySchema = this._getSchemaByKey(defaultselection);
    const { selectedLegends } = selectedPlotlySchema;
    this.state = {
      selectedChoice: defaultselection,
      selectedLegends: JSON.stringify(selectedLegends),
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

  private _handleChartSchemaChanged = (eventData: Schema) => {
    const { selectedLegends } = eventData.plotlySchema;
    this.setState({ selectedLegends: JSON.stringify(selectedLegends) });
  };

  private _getSchemaByKey(key: string): any {
    const schema = schemas.find(x => x.key === key);
    return schema ? schema.schema : null;
  }

  private _createDeclarativeChart(): JSX.Element {
    const uniqueKey = `${this.state.selectedChoice}`;
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
        />
      </ErrorBoundary>
    );
  }
}
