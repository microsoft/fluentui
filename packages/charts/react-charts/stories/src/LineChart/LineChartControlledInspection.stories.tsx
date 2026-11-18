import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Field, Radio, RadioGroup, Switch, makeStyles, tokens, useId } from '@fluentui/react-components';
import type {
  ChartProps,
  LineChartInteractionChange,
  LineChartInteractionOptions,
  LineChartInteractionState,
  LineChartPointReference,
  LineChartPoints,
  LineChartProps,
} from '@fluentui/react-charts';
import { DataVizPalette, LineChart, getColorFromToken } from '@fluentui/react-charts';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
    maxWidth: '900px',
    color: tokens.colorNeutralForeground1,
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  chart: {
    width: '100%',
    maxWidth: '100%',
    overflowX: 'auto',
  },
  text: {
    margin: 0,
  },
  status: {
    display: 'grid',
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase200,
    overflowWrap: 'anywhere',
  },
});

type NamedSeries = LineChartPoints & { key: string };

const series: NamedSeries[] = [
  {
    key: 'north',
    legend: 'North',
    color: getColorFromToken(DataVizPalette.color1),
    data: [
      { x: 1, y: 28 },
      { x: 2, y: 42 },
      { x: 4, y: 66 },
      { x: 5, y: 54 },
    ],
    gaps: [{ startIndex: 1, endIndex: 2 }],
    lineOptions: { curve: 'linear', connectGaps: true, mode: 'lines+markers' },
  },
  {
    key: 'south',
    legend: 'South',
    color: getColorFromToken(DataVizPalette.color2),
    data: [
      { x: 1, y: 68 },
      { x: 2, y: 60 },
      { x: 4, y: 36 },
      { x: 5, y: 44 },
    ],
    gaps: [{ startIndex: 1, endIndex: 2 }],
    lineOptions: { curve: 'linear', connectGaps: true, mode: 'lines+markers' },
  },
];

const data: ChartProps = {
  chartTitle: 'Controlled inspection of two synthetic observation series',
  chartTitleAccessibilityData: {
    ariaLabel: 'North and South observations at x 1, 2, 4 and 5. No observations at x 3; lines connect across the gap.',
  },
  lineChartData: series,
};
const xValues = [1, 2, 3, 4, 5];
const xAxis: LineChartProps['xAxis'] = { domain: [1, 5], axis: { title: 'Observation slot' } };
const yAxis: LineChartProps['yAxis'] = { domain: [0, 80], axis: { title: 'Synthetic value' } };
const getSeriesKey: NonNullable<LineChartProps['getSeriesKey']> = item => (item as NamedSeries).key;
const getPointKey: NonNullable<LineChartProps['getPointKey']> = point => `sample-${point.x}`;
const emptyState: LineChartInteractionState = {};
const northPoint: LineChartInteractionState = {
  activeX: 2,
  activePoint: { seriesKey: 'north', pointKey: 'sample-2' },
};
const missingSlot: LineChartInteractionState = { activeX: 3 };

function formatPoint(point: LineChartPointReference | undefined): string {
  return point ? `${point.seriesKey} / ${point.pointKey}` : 'none';
}

export const LineChartControlledInspection = (): JSXElement => {
  const styles = useStyles();
  const instructionsId = useId('inspection-instructions');
  const [interactionState, setInteractionState] = React.useState<LineChartInteractionState>(emptyState);
  const [acceptPointer, setAcceptPointer] = React.useState(true);
  const [mode, setMode] = React.useState<'nearest-x' | 'nearest-series'>('nearest-series');
  const [lastChange, setLastChange] = React.useState<LineChartInteractionChange>();
  const [lastAction, setLastAction] = React.useState('No interaction yet.');
  const lastSelection = React.useRef<LineChartInteractionState>(emptyState);
  const interactionOptions = React.useMemo<LineChartInteractionOptions>(
    () => ({ mode, xValues, hitRadius: 12 }),
    [mode],
  );

  const onInteractionChange = React.useCallback(
    (change: LineChartInteractionChange) => {
      // Declining pointer proposals leaves keyboard inspection and physical focus independent.
      const accepted = acceptPointer || (change.reason !== 'pointer' && change.reason !== 'leave');
      if (accepted) {
        setInteractionState(change.state);
        if (change.state.activeX !== undefined || (change.reason !== 'pointer' && change.reason !== 'leave')) {
          lastSelection.current = change.state;
        }
      }
      setLastChange(change);
      setLastAction(`${change.reason} proposal ${accepted ? 'accepted' : 'declined'}.`);
    },
    [acceptPointer],
  );

  const selectInspection = (state: LineChartInteractionState, message: string): void => {
    // Changing logical inspection never calls focus; the activating control keeps focus.
    setInteractionState(state);
    lastSelection.current = state;
    setLastAction(message);
  };
  const hit = lastChange?.inspection.hit;
  const focusedPoint = lastChange?.inspection.focusedPoint;

  return (
    <section className={styles.root} aria-label="Controlled line chart inspection">
      <p className={styles.text}>
        Two synthetic series have observations at x = 1, 2, 4 and 5. The declared gap from 2 to 4 is connected, but x =
        3 has no point or numeric y value. Hover near x = 3 to see a curve segment hit without a point key.
      </p>
      <div className={styles.controls}>
        <Switch
          label="Accept pointer proposals (off freezes pointer inspection)"
          checked={acceptPointer}
          onChange={(_, next) => {
            setAcceptPointer(next.checked);
            if (!next.checked) {
              // The pointer leaves the SVG before this control can be activated.
              setInteractionState(lastSelection.current);
            }
            setLastAction(
              next.checked ? 'Pointer proposals enabled.' : 'Latest selection frozen; pointer proposals declined.',
            );
          }}
        />
        <Field label="Pointer inspection policy">
          <RadioGroup
            layout="horizontal"
            value={mode}
            onChange={(_, next) => {
              if (next.value === 'nearest-x' || next.value === 'nearest-series') {
                setMode(next.value);
                setLastAction(`Pointer policy changed to ${next.value}.`);
              }
            }}
          >
            <Radio value="nearest-x" label="Nearest x" />
            <Radio value="nearest-series" label="Nearest series" />
          </RadioGroup>
        </Field>
      </div>
      <div className={styles.controls}>
        <Button onClick={() => selectInspection(northPoint, 'Selected North at x = 2; focus stays on this button.')}>
          Inspect North at x = 2
        </Button>
        <Button
          onClick={() => selectInspection(missingSlot, 'Selected missing x = 3; no point or y value was created.')}
        >
          Inspect missing x = 3
        </Button>
        <Button onClick={() => selectInspection(emptyState, 'Controlled inspection cleared; focus was not moved.')}>
          Clear inspection
        </Button>
      </div>
      <p className={styles.text} id={instructionsId}>
        Keyboard: Tab past these controls and the legend into the native chart. Left/Right moves between real
        observations; Up/Down changes series; Home/End moves to the first/last observation. Missing x = 3 is not a focus
        target. Escape clears inspection while the native point keeps physical focus. Tab leaves normally. The external
        inspection buttons never move focus into the chart. Turning pointer acceptance off still accepts keyboard focus
        proposals.
      </p>
      <div className={styles.chart} role="group" aria-label="Observation chart" aria-describedby={instructionsId}>
        <LineChart
          data={data}
          width={780}
          height={340}
          getSeriesKey={getSeriesKey}
          getPointKey={getPointKey}
          xAxis={xAxis}
          yAxis={yAxis}
          tickValues={xValues}
          interactionOptions={interactionOptions}
          interactionState={interactionState}
          onInteractionChange={onInteractionChange}
        />
      </div>
      <div className={styles.status} role="region" aria-label="Inspection state readout">
        <div>
          <strong>Controlled logical state:</strong> x = {String(interactionState.activeX ?? 'none')}; point ={' '}
          {formatPoint(interactionState.activePoint)}.
          {interactionState.activeX === 3 && ' Unavailable slot: no observed y values.'}
        </div>
        <div>
          <strong>Physical focused observation (last callback):</strong> {formatPoint(focusedPoint)}. This is
          independent of logical selection.
        </div>
        <div>
          <strong>Curve hit (last callback):</strong>{' '}
          {hit
            ? `${hit.seriesKey}; segment = ${hit.segmentKey ?? 'none'}; point = ${hit.pointKey ?? 'none'}; ` +
              `distance = ${hit.distance.toFixed(1)} SVG units; within radius = ${hit.withinRadius ? 'yes' : 'no'}.`
            : 'none.'}
        </div>
        <div>
          <strong>Latest chart proposal:</strong>{' '}
          {lastChange
            ? `x = ${lastChange.state.activeX ?? 'none'}; point = ${formatPoint(lastChange.state.activePoint)}.`
            : 'none.'}{' '}
          {lastAction}
        </div>
      </div>
    </section>
  );
};

LineChartControlledInspection.parameters = {
  docs: {
    description: {
      story:
        'Controls interactionState through onInteractionChange with stable getSeriesKey/getPointKey accessors. ' +
        'Toggle pointer acceptance to decline pointer and leave proposals while native keyboard focus remains active. ' +
        'Choose a real point, choose unavailable x = 3 from explicit interactionOptions.xValues, or clear with {}. ' +
        'Nearest-series inspects rendered curves; connectGaps preserves a segment hit at x = 3 without inventing a point. ' +
        'The live readout separates logical selection, callback proposals, physical focusedPoint and curve-hit metadata. ' +
        'Use Tab, arrow keys, Home/End and Escape with native chart semantics; external selection never calls focus.',
    },
  },
};
