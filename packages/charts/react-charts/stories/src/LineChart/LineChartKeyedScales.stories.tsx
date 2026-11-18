import * as React from 'react';
import { makeStyles, Switch, tokens, useId } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DataVizPalette, getColorFromToken, LineChart } from '@fluentui/react-charts';
import type {
  ChartProps,
  LineChartBaselineFillOptions,
  LineChartDataPoint,
  LineChartPoints,
  LineChartProps,
  LineChartYScaleOptions,
} from '@fluentui/react-charts';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    maxWidth: '1120px',
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalM,
  },
  scroll: {
    maxWidth: '100%',
    overflowX: 'auto',
  },
  table: {
    borderCollapse: 'collapse',
    fontSize: tokens.fontSizeBase200,
    '& th, & td': {
      padding: tokens.spacingHorizontalS,
      textAlign: 'left',
      borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    },
    '& caption': {
      textAlign: 'left',
      paddingBottom: tokens.spacingVerticalS,
      fontWeight: tokens.fontWeightSemibold,
    },
  },
});

interface MetricSeries extends LineChartPoints {
  metricKey: string;
  scaleKey: string;
}

const samples = (values: number[], unit: string): LineChartDataPoint[] =>
  values.map((y, index) => ({
    x: index + 1,
    y,
    xAxisCalloutData: `Day ${index + 1}`,
    yAxisCalloutData: `${y} ${unit}`,
  }));

const flowColor = getColorFromToken(DataVizPalette.color6);
const flowFill: LineChartBaselineFillOptions = {
  value: 0,
  opacity: 1,
  gradient: {
    direction: 'vertical',
    stops: [
      { offset: 0, color: flowColor, opacity: 0.28 },
      { offset: 1, color: flowColor, opacity: 0.02 },
    ],
  },
};

const metrics: MetricSeries[] = [
  {
    metricKey: 'temperature',
    scaleKey: 'temperature-celsius',
    legend: 'Temperature (°C)',
    color: getColorFromToken(DataVizPalette.color1),
    data: samples([19, 20, 22, 21, 24, 26, 28, 27, 25, 26], '°C'),
    lineOptions: { curve: 'linear', strokeWidth: 3 },
  },
  {
    metricKey: 'energy',
    scaleKey: 'energy-kwh',
    legend: 'Energy (kWh)',
    color: getColorFromToken(DataVizPalette.color2),
    data: samples([850, 820, 760, 790, 700, 630, 570, 510, 400, 350], 'kWh'),
    lineOptions: { curve: 'linear', strokeWidth: 2, strokeDasharray: '8 4' },
  },
  {
    metricKey: 'flow',
    scaleKey: 'flow-litres',
    legend: 'Flow (L/min)',
    color: flowColor,
    // Days 4 and 5 have no observations. The gap cuts the edge from day 3 to day 6.
    data: [
      [1, 180],
      [2, 190],
      [3, 170],
      [6, 140],
      [7, 160],
      [8, 150],
      [9, 175],
      [10, 185],
    ].map(([x, y]) => ({ x, y, xAxisCalloutData: `Day ${x}`, yAxisCalloutData: `${y} L/min` })),
    gaps: [{ startIndex: 2, endIndex: 3 }],
    lineOptions: { curve: 'linear', strokeWidth: 3, strokeDasharray: '2 4', connectGaps: false },
    baselineFill: flowFill,
  },
  {
    metricKey: 'pressure',
    scaleKey: 'pressure-kpa',
    legend: 'Pressure (kPa)',
    color: getColorFromToken(DataVizPalette.color4),
    data: samples([94, 95, 94, 96, 95, 97, 96, 98, 97, 96], 'kPa'),
    lineOptions: { curve: 'stepAfter', strokeWidth: 2, strokeDasharray: '10 3 2 3' },
  },
];

const getSeriesKey: NonNullable<LineChartProps['getSeriesKey']> = series => (series as MetricSeries).metricKey;
const getSeriesYScaleKey: NonNullable<LineChartProps['getSeriesYScaleKey']> = series =>
  (series as MetricSeries).scaleKey;
const getPointKey: NonNullable<LineChartProps['getPointKey']> = point => `day-${point.x}`;
const xAxis: NonNullable<LineChartProps['xAxis']> = {
  domain: [1, 10],
  tick0: 1,
  tickStep: 1,
  axis: { title: 'Observation day' },
};
const interactionOptions: NonNullable<LineChartProps['interactionOptions']> = {
  mode: 'nearest-x',
  xValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

export const LineChartKeyedScales = (): JSXElement => {
  const styles = useStyles();
  const descriptionId = useId('keyed-scales-description');
  const [showFlowAxis, setShowFlowAxis] = React.useState(false);
  const [showPressureAxis, setShowPressureAxis] = React.useState(false);
  const [connectGaps, setConnectGaps] = React.useState(false);
  const [showFill, setShowFill] = React.useState(true);
  const [narrow, setNarrow] = React.useState(false);
  const width = narrow ? 560 : 960;

  const data = React.useMemo<ChartProps>(
    () => ({
      chartTitle: 'Four raw-value metrics on independent scales',
      lineChartData: metrics.map(series =>
        series.metricKey === 'flow'
          ? {
              ...series,
              lineOptions: { ...series.lineOptions, connectGaps },
              baselineFill: showFill ? flowFill : undefined,
            }
          : series,
      ),
    }),
    [connectGaps, showFill],
  );
  const yScales = React.useMemo<LineChartYScaleOptions[]>(
    () => [
      {
        key: 'temperature-celsius',
        domain: [10, 40],
        tickValues: [10, 20, 30, 40],
        axis: { side: 'left', title: 'Temperature (°C)' },
      },
      {
        key: 'energy-kwh',
        domain: [0, 1200],
        tickValues: [0, 400, 800, 1200],
        axis: { side: 'right', title: 'Energy (kWh)' },
        grid: { visible: false },
      },
      {
        key: 'flow-litres',
        domain: [0, 240],
        tickValues: [0, 80, 160, 240],
        axis: showFlowAxis ? { side: 'left', title: 'Flow (L/min)' } : false,
        grid: { visible: false },
      },
      {
        key: 'pressure-kpa',
        domain: [90, 110],
        tickValues: [90, 95, 100, 105, 110],
        axis: showPressureAxis ? { side: 'right', title: 'Pressure (kPa)' } : false,
        grid: { visible: false },
      },
    ],
    [showFlowAxis, showPressureAxis],
  );

  return (
    <div className={styles.root}>
      <p id={descriptionId}>
        Ten days of synthetic measurements, in original units. Each line has its own exact y domain; equal heights do
        not mean equal quantities. Flow and pressure keep their scales when their axes are hidden. Hover or focus native
        chart points to inspect values; flow has no samples on days 4 and 5.
      </p>
      <div className={styles.controls}>
        <Switch label="Show flow axis" checked={showFlowAxis} onChange={(_, value) => setShowFlowAxis(value.checked)} />
        <Switch
          label="Show pressure axis"
          checked={showPressureAxis}
          onChange={(_, value) => setShowPressureAxis(value.checked)}
        />
        <Switch label="Connect flow gap" checked={connectGaps} onChange={(_, value) => setConnectGaps(value.checked)} />
        <Switch label="Flow baseline fill" checked={showFill} onChange={(_, value) => setShowFill(value.checked)} />
        <Switch label="Narrow chart (560 px)" checked={narrow} onChange={(_, value) => setNarrow(value.checked)} />
      </div>
      <div
        className={styles.scroll}
        role="group"
        aria-label="Independent metric scales"
        aria-describedby={descriptionId}
      >
        <div style={{ width }}>
          <LineChart
            data={data}
            width={width}
            height={430}
            getSeriesKey={getSeriesKey}
            getPointKey={getPointKey}
            getSeriesYScaleKey={getSeriesYScaleKey}
            yScales={yScales}
            xAxis={xAxis}
            interactionOptions={interactionOptions}
            allowMultipleShapesForPoints
          />
        </div>
      </div>
      <p role="status">
        Flow:{' '}
        {connectGaps ? 'connected across missing days (not additional observations)' : 'broken between days 3 and 6'}.{' '}
        Baseline at 0 L/min: {showFill ? 'native gradient visible' : 'hidden'}. All raw observations and scale domains
        remain unchanged.
      </p>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <caption>Scale keys, raw units and fixed domains</caption>
          <thead>
            <tr>
              <th scope="col">Metric / stroke</th>
              <th scope="col">Scale key</th>
              <th scope="col">Exact domain</th>
              <th scope="col">Axis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Temperature / solid</th>
              <td>temperature-celsius</td>
              <td>10–40 °C</td>
              <td>Left</td>
            </tr>
            <tr>
              <th scope="row">Energy / long dash</th>
              <td>energy-kwh</td>
              <td>0–1,200 kWh</td>
              <td>Right</td>
            </tr>
            <tr>
              <th scope="row">Flow / dotted, with gap</th>
              <td>flow-litres</td>
              <td>0–240 L/min</td>
              <td>{showFlowAxis ? 'Left (additional)' : 'Hidden; scale retained'}</td>
            </tr>
            <tr>
              <th scope="row">Pressure / dash-dot steps</th>
              <td>pressure-kpa</td>
              <td>90–110 kPa</td>
              <td>{showPressureAxis ? 'Right (additional)' : 'Hidden; scale retained'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

LineChartKeyedScales.parameters = {
  docs: {
    description: {
      story:
        'Four unlike raw-value metrics use stable getSeriesKey/getPointKey identities and getSeriesYScaleKey bindings ' +
        'to independent exact-domain yScales. Temperature and energy axes are visible initially; flow and pressure ' +
        'use axis: false without discarding their scales. Toggle either extra axis, compare a declared internal flow ' +
        'gap with lineOptions.connectGaps, switch the native baselineFill gradient, or use the narrow layout. ' +
        'No values are normalized or invented: flow days 4 and 5 remain absent even when connected. Explicit ' +
        'inspection slots retain those days, and native markers, legend, callouts and keyboard behavior are preserved.',
    },
  },
};
