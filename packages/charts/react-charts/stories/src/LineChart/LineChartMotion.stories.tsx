import * as React from 'react';
import { Button, Switch, makeStyles, tokens, useId } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DataVizPalette, LineChart } from '@fluentui/react-charts';
import type {
  LineChartMarkerProps,
  LineChartMotionOptions,
  LineChartPoints,
  LineChartProps,
  LineChartXAxisLabelRow,
  LineChartXAxisLabelRowProps,
} from '@fluentui/react-charts';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    maxWidth: '900px',
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  description: {
    margin: 0,
    color: tokens.colorNeutralForeground2,
  },
  chart: {
    width: '100%',
    overflowX: 'auto',
  },
});

type KeyedSeries = LineChartPoints & { key: string };

const primaryOptions: LineChartPoints['lineOptions'] = { curve: 'natural', strokeWidth: 3 };
const comparisonOptions: LineChartPoints['lineOptions'] = {
  curve: 'natural',
  strokeWidth: 3,
  strokeDasharray: '7 4',
};

const createSeries = (primary: number[], comparison: number[]): KeyedSeries[] => [
  {
    key: 'primary',
    legend: 'Primary',
    color: DataVizPalette.color1,
    lineOptions: primaryOptions,
    baselineFill: { value: 0, opacity: 0.14 },
    data: primary.map((y, index) => ({ x: index + 1, y })),
  },
  {
    key: 'comparison',
    legend: 'Comparison',
    color: DataVizPalette.color2,
    lineOptions: comparisonOptions,
    baselineFill: { value: 0, opacity: 0.1 },
    data: comparison.map((y, index) => ({ x: index + 1, y })),
  },
];

const initialSeries = createSeries([24, 42, 33, 57, 46, 65], [36, 28, 49, 39, 59, 50]);
const updatedSeries = createSeries([44, 72, 51, 94, 68, 105], [60, 45, 81, 58, 98, 76]);
const getSeriesKey: NonNullable<LineChartProps['getSeriesKey']> = series => (series as KeyedSeries).key;
const getPointKey: NonNullable<LineChartProps['getPointKey']> = point => `sample-${point.x}`;
const xAxis: LineChartProps['xAxis'] = { domain: [1, 6], axis: { title: 'Sample' } };
const initialYAxis: LineChartProps['yAxis'] = { domain: [0, 80], tickCount: 5, axis: { title: 'Synthetic value' } };
const updatedYAxis: LineChartProps['yAxis'] = { domain: [0, 120], tickCount: 5, axis: { title: 'Synthetic value' } };
const motion: LineChartMotionOptions = {
  enter: { durationMs: 1000, easing: 'ease-in-out' },
  update: { durationMs: 1000, easing: 'ease-in-out' },
  exit: { durationMs: 1000, easing: 'ease-in-out' },
};

// Only the visual is replaced: the core owns position, reveal masking and point semantics.
const renderMarker = (props?: LineChartMarkerProps): JSXElement | null => {
  if (!props) {
    return null;
  }
  const { point, series, active, focused } = props;
  const radius = active || focused ? 7 : 5;
  return (
    <path
      d={`M ${point.position.x} ${
        point.position.y - radius
      } l ${radius} ${radius} l ${-radius} ${radius} l ${-radius} ${-radius} Z`}
      fill={series.stroke.color}
      stroke={tokens.colorNeutralBackground1}
      strokeWidth={1.5}
      pointerEvents="none"
      aria-hidden="true"
    />
  );
};

// This is a pure frame readout, not a second animation or a parent-state feedback loop.
const renderMotionReadout = ({ row, plot }: LineChartXAxisLabelRowProps): JSXElement => {
  const yScale = plot.yScales.find(scale => scale.key === 'y');
  const domain = yScale ? yScale.domain.map(value => value.toFixed(1)).join(' to ') : 'unavailable';
  return (
    <g fill={tokens.colorNeutralForeground1} fontSize={11}>
      <text x={row.rect.x} y={row.rect.y + 14}>
        {`Effective reduced motion: ${plot.reducedMotion ? 'on (immediate)' : 'off'} · displayed y domain: ${domain}`}
      </text>
      {plot.series.map((series, index) => (
        <text key={series.key} x={row.rect.x} y={row.rect.y + 34 + index * 18}>
          {`${series.key}: ${series.phase} · progress ${Math.round(
            series.transition.progress * 100,
          )}% · reveal ${Math.round(series.transition.revealProgress * 100)}%${
            series.phase === 'exit' ? ` · retained, noninteractive · captured epoch ${series.capturedLayoutEpoch}` : ''
          }`}
        </text>
      ))}
      {!plot.series.some(series => series.key === 'comparison') && (
        <text x={row.rect.x} y={row.rect.y + 52}>
          comparison: absent (no retained visual)
        </text>
      )}
    </g>
  );
};

const labelRows: LineChartXAxisLabelRow[] = [
  { key: 'motion-readout', layout: 'reserved', height: 76, gap: 8, onRender: renderMotionReadout },
];

export const LineChartMotion = (): JSXElement => {
  const styles = useStyles();
  const descriptionId = useId('motion-description');
  const [replay, setReplay] = React.useState(0);
  const [updated, setUpdated] = React.useState(false);
  const [comparisonVisible, setComparisonVisible] = React.useState(true);
  const [forceReducedMotion, setForceReducedMotion] = React.useState(false);
  const motionOptions = React.useMemo(
    () => (forceReducedMotion ? { ...motion, reducedMotion: true } : motion),
    [forceReducedMotion],
  );
  const data = React.useMemo(
    () => ({
      chartTitle: 'Shared motion: six synthetic samples',
      lineChartData: (updated ? updatedSeries : initialSeries).filter(
        series => comparisonVisible || series.key !== 'comparison',
      ),
    }),
    [updated, comparisonVisible],
  );

  return (
    <div className={styles.root}>
      <p id={descriptionId} className={styles.description}>
        Two keyed series share a one-second timeline for native curves, axes, zero-baseline fills and diamond markers.
        Update values and the y domain to see geometry interpolate without restarting the reveal. Remove the comparison,
        then restore it before its exit completes to reverse the retained reveal from its current position.
      </p>
      <div className={styles.controls}>
        <Button onClick={() => setReplay(value => value + 1)}>Replay entrance</Button>
        <Button onClick={() => setUpdated(value => !value)}>
          {updated ? 'Restore initial values/domain' : 'Update values/domain'}
        </Button>
        <Button onClick={() => setComparisonVisible(value => !value)}>
          {comparisonVisible ? 'Remove comparison' : 'Restore comparison'}
        </Button>
        <Switch
          label="Force reduced motion"
          checked={forceReducedMotion}
          onChange={(_, value) => setForceReducedMotion(value.checked)}
        />
      </div>
      <p className={styles.description}>
        The SVG readout shows the actual current scene, including retained exit metadata. An update advances progress
        while reveal stays complete; enter and exit change reveal. With reduced motion, changes settle immediately and
        exits are not retained. Turning the switch off still respects the operating-system preference. Replay remounts
        only the chart and preserves the selected data and motion settings.
      </p>
      <div
        className={styles.chart}
        role="figure"
        aria-label="Shared motion: six synthetic samples"
        aria-describedby={descriptionId}
      >
        <LineChart
          key={replay}
          data={data}
          width={840}
          height={440}
          getSeriesKey={getSeriesKey}
          getPointKey={getPointKey}
          motion={motionOptions}
          xAxis={xAxis}
          yAxis={updated ? updatedYAxis : initialYAxis}
          xAxisLabelRows={labelRows}
          onRenderMarker={renderMarker}
          markerClipPadding={8}
          enablePerfOptimization
        />
      </div>
    </div>
  );
};

LineChartMotion.parameters = {
  docs: {
    description: {
      story:
        'Uses stable getSeriesKey/getPointKey identities and motion.enter/update/exit on one shared core timeline. ' +
        'Replay entrance remounts the chart; Update values/domain morphs existing keyed geometry and the y axis. ' +
        'Remove comparison retains a noninteractive exit; restore it within one second to reverse that same reveal, ' +
        'or after completion for a fresh entrance. Native baselineFill and custom onRenderMarker diamonds follow ' +
        'the same geometry and reveal mask. A pure reserved xAxisLabelRows renderer displays current phase, ' +
        'transition progress, reveal progress, captured exit layout epoch and effective reduced motion directly ' +
        'from plot context. Force reduced motion is additive to the OS preference and settles every control immediately.',
    },
  },
};
