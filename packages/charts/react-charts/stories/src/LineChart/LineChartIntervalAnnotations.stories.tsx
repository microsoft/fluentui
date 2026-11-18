import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Switch,
  isHTMLElement,
  makeStyles,
  tokens,
  useId,
} from '@fluentui/react-components';
import type {
  ChartAnnotation,
  ChartProps,
  LineChartAnnotationRenderProps,
  LineChartInteractionChange,
  LineChartPlotContext,
  LineChartPlotLayers,
  LineChartProps,
  LineChartXValue,
} from '@fluentui/react-charts';
import {
  DataVizPalette,
  LineChart,
  createLineChartAnnotationIntervalModel,
  getColorFromToken,
} from '@fluentui/react-charts';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    maxWidth: '1000px',
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  chart: {
    maxWidth: '100%',
    overflowX: 'auto',
  },
  text: {
    margin: '0',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground1,
  },
});

const pointWidth = 12;
const simulatedDelayMs = 800;
const startTime = Date.UTC(2025, 0, 1);
const hourMs = 60 * 60 * 1000;
const slots = Array.from({ length: 13 }, (_, index) => index);
const observations = [
  [0, 20],
  [1, 24],
  [2, 22],
  [3, 29],
  [4, 34],
  // Slot 5 is unavailable: there is no observation or invented numeric y value.
  [6, 31],
  [7, 38],
  [8, 33],
  [9, 40],
  [10, 37],
  [11, 42],
  [12, 39],
];
const intervalDefinitions = [
  { key: 'A', label: 'Early span', start: 1, end: 4, color: getColorFromToken(DataVizPalette.color3) },
  { key: 'B', label: 'Middle span', start: 3, end: 6, color: getColorFromToken(DataVizPalette.color6) },
  { key: 'C', label: 'Connected span', start: 5, end: 7, color: getColorFromToken(DataVizPalette.color8) },
  { key: 'D', label: 'Single instant', start: 8, end: 8, color: getColorFromToken(DataVizPalette.color10) },
  { key: 'E', label: 'Later span', start: 10, end: 11, color: getColorFromToken(DataVizPalette.color12) },
];
const intervalsByKey = new Map(intervalDefinitions.map(interval => [interval.key, interval]));
const emptyModel = createLineChartAnnotationIntervalModel([], { bounds: 'closed' });
const getSeriesKey = () => 'synthetic-signal';
const getPointKey: NonNullable<LineChartProps['getPointKey']> = point =>
  `sample-${point.x instanceof Date ? point.x.getTime() : point.x}`;
const margins = { left: 48, top: 28, right: 24, bottom: 40 };

function formatX(x: LineChartXValue): string {
  return x instanceof Date ? `${x.toISOString().slice(11, 16)} UTC` : String(x);
}

function createFamily(useTime: boolean) {
  const toX = (slot: number): number | Date => (useTime ? new Date(startTime + slot * hourMs) : slot);
  const xValues = slots.map(toX);
  const data: ChartProps = {
    chartTitle: 'Synthetic signal with optional interval annotations',
    chartDataAccessibilityData: {
      ariaLabel: 'Twelve numeric observations across thirteen inspection slots. Slot five has no observation.',
    },
    lineChartData: [
      {
        legend: 'Synthetic signal',
        color: getColorFromToken(DataVizPalette.color3),
        lineOptions: { curve: 'linear', connectGaps: false },
        gaps: [{ startIndex: 4, endIndex: 5 }],
        data: observations.map(([slot, y]) => {
          const x = xValues[slot];
          return { x, y, xAxisCalloutData: formatX(x), yAxisCalloutData: String(y) };
        }),
      },
    ],
  };
  const xAxis: NonNullable<LineChartProps['xAxis']> = {
    domain: useTime ? [new Date(startTime), new Date(startTime + 12 * hourMs)] : [0, 12],
  };
  const interactionOptions: NonNullable<LineChartProps['interactionOptions']> = {
    mode: 'nearest-x',
    xValues,
  };
  return {
    data,
    xAxis,
    interactionOptions,
    unavailableX: xValues[5],
    model: createLineChartAnnotationIntervalModel(
      intervalDefinitions.map(interval => ({ key: interval.key, start: toX(interval.start), end: toX(interval.end) })),
      { bounds: 'closed' },
    ),
    toX,
  };
}

const numericFamily = createFamily(false);
const timeFamily = createFamily(true);

function sameX(left: LineChartXValue | undefined, right: LineChartXValue | undefined): boolean {
  return left instanceof Date && right instanceof Date ? left.getTime() === right.getTime() : left === right;
}

const renderAnnotationContent = (props?: LineChartAnnotationRenderProps): JSXElement | null => {
  if (!props) {
    return null;
  }
  const intervalKeys = props.annotation.data?.intervalKeys as readonly string[] | undefined;
  const grouped = (intervalKeys?.length ?? 0) > 1;
  return (
    <span>
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        {grouped ? (
          <>
            <rect
              x="2"
              y="2"
              width="12"
              height="12"
              rx="2"
              fill={tokens.colorNeutralBackground1}
              stroke="currentColor"
            />
            <rect
              x="6"
              y="6"
              width="12"
              height="12"
              rx="2"
              fill={tokens.colorNeutralBackground1}
              stroke="currentColor"
            />
          </>
        ) : (
          <>
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 9v5M10 5.5v1" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </>
        )}
      </svg>
      <span>{props.annotation.text}</span>
    </span>
  );
};

type Availability = 'loading' | 'ready' | 'failed' | 'cleared';
interface GroupDetails {
  readonly intervalKeys: readonly string[];
  readonly useTime: boolean;
}

export const LineChartIntervalAnnotations = (): JSXElement => {
  const classes = useStyles();
  const descriptionId = useId('interval-description');
  const dialogDescriptionId = useId('interval-details');
  const [useTime, setUseTime] = React.useState(false);
  const [hasIntervals, setHasIntervals] = React.useState(false);
  const [availability, setAvailability] = React.useState<Availability>('loading');
  const [request, setRequest] = React.useState<{ fail: boolean } | undefined>({ fail: false });
  const [activeX, setActiveX] = React.useState<LineChartXValue>();
  const [details, setDetails] = React.useState<GroupDetails>();
  const [invocations, setInvocations] = React.useState(0);
  const [lastSource, setLastSource] = React.useState<'pointer' | 'keyboard'>();
  const loadButtonRef = React.useRef<HTMLButtonElement>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);
  const family = useTime ? timeFamily : numericFamily;
  const model = hasIntervals ? family.model : emptyModel;

  React.useEffect(() => {
    if (!request) {
      return;
    }
    let current = true;
    const timer = setTimeout(() => {
      if (current) {
        setHasIntervals(!request.fail);
        setAvailability(request.fail ? 'failed' : 'ready');
      }
    }, simulatedDelayMs);
    return () => {
      current = false;
      clearTimeout(timer);
    };
  }, [request]);

  // No chart DOM queries: capture only the actual native action's focused element.
  // Unmounting the dialog before restoring focus also removes its modal focus trap.
  React.useEffect(() => {
    if (!details && openerRef.current) {
      const opener = openerRef.current;
      openerRef.current = null;
      (opener.isConnected ? opener : loadButtonRef.current)?.focus();
    }
  }, [details]);

  const openGroup = React.useCallback(
    (intervalKeys: readonly string[], source: 'pointer' | 'keyboard') => {
      const activeElement = loadButtonRef.current?.ownerDocument.activeElement;
      openerRef.current = isHTMLElement(activeElement) ? activeElement : null;
      setDetails({ intervalKeys, useTime });
      setInvocations(count => count + 1);
      setLastSource(source);
    },
    [useTime],
  );

  const getAnnotations = React.useCallback(
    (plot: LineChartPlotContext): readonly ChartAnnotation[] =>
      model.getLayout(plot, pointWidth).groups.map(group => ({
        id: group.key,
        text: group.intervalKeys.join(' + '),
        data: { intervalKeys: group.intervalKeys },
        coordinates: {
          type: 'pixel',
          x: group.rect.x + group.rect.width / 2 - plot.plotRect.x,
          y: 8,
        },
        layout: { align: 'center', verticalAlign: 'top', clipToBounds: true },
        style: {
          backgroundColor: tokens.colorNeutralBackground1,
          borderColor: tokens.colorNeutralStroke1,
          borderWidth: 1,
          borderRadius: 4,
          padding: '4px 8px',
          className: classes.icon,
        },
        action: {
          label: `Read details for intervals ${group.intervalKeys.join(', ')}`,
          onInvoke: source => openGroup(group.intervalKeys, source),
        },
      })),
    [classes.icon, model, openGroup],
  );

  const renderPlotLayers = React.useCallback(
    (plot: LineChartPlotContext): LineChartPlotLayers => ({
      belowGrid: (
        <g aria-hidden="true" pointerEvents="none">
          {model.getLayout(plot, pointWidth).regions.map(region => (
            <rect
              key={region.key}
              x={region.rect.x}
              y={region.rect.y}
              width={region.rect.width}
              height={region.rect.height}
              fill={
                region.intervalKeys.length > 1
                  ? tokens.colorNeutralForeground3
                  : intervalsByKey.get(region.intervalKeys[0])?.color
              }
              fillOpacity={0.18}
            />
          ))}
        </g>
      ),
    }),
    [model],
  );

  const onInteractionChange = React.useCallback((change: LineChartInteractionChange) => {
    if (change.reason !== 'layout') {
      setActiveX(previous => (sameX(previous, change.state.activeX) ? previous : change.state.activeX));
    }
  }, []);

  const startLoading = (fail: boolean) => {
    setAvailability('loading');
    setRequest({ fail });
  };
  const clearAnnotations = () => {
    setRequest(undefined);
    setHasIntervals(false);
    setAvailability('cleared');
  };
  const activeKeys = activeX instanceof Date || typeof activeX === 'number' ? model.getActiveKeys(activeX) : [];
  const status = {
    loading: `Simulated loading (${simulatedDelayMs} ms). Existing annotations, if any, remain usable until completion.`,
    ready: 'Synthetic intervals available: one transitive group (A, B, C), singleton D, and later span E.',
    failed: 'Simulated loading failed. Annotations are unavailable; the original chart remains usable.',
    cleared: 'Annotations removed. Pending simulated loading is cancelled; the original chart remains usable.',
  }[availability];
  const detailsFamily = details?.useTime ? timeFamily : numericFamily;

  return (
    <div className={classes.root}>
      <p id={descriptionId} className={classes.text}>
        Synthetic closed intervals: A overlaps B, and B overlaps C; A and C never overlap directly. Colored regions show
        individual coverage, neutral regions show overlap, and each connected group has one native details action. D is
        a single instant painted {pointWidth} SVG units wide. Slot {formatX(family.unavailableX)} has no observation,
        but remains inspectable.
      </p>
      <div className={classes.controls}>
        <Button ref={loadButtonRef} onClick={() => startLoading(false)}>
          Load synthetic intervals
        </Button>
        <Button onClick={() => startLoading(true)}>Simulate delayed failure</Button>
        <Button onClick={clearAnnotations}>Clear annotations / cancel loading</Button>
        <Switch
          label="Use time x-values (fixed UTC hours)"
          checked={useTime}
          onChange={(_, data) => {
            setActiveX(undefined);
            setUseTime(data.checked);
          }}
        />
      </div>
      <p role="status" className={classes.text}>
        {status}
      </p>
      <p className={classes.text}>
        Hover across the plot, including the gap; Tab to a group action and press Enter or Space to read its details.
        Start a delayed failure and open a group before it completes to exercise focus restoration after removal.
      </p>
      <div
        className={classes.chart}
        role="group"
        aria-label="Interval annotation example"
        aria-describedby={descriptionId}
      >
        <LineChart
          data={family.data}
          width={920}
          height={400}
          margins={margins}
          yMinValue={0}
          yMaxValue={50}
          useUTC
          xAxis={family.xAxis}
          tickFormat={formatX}
          getSeriesKey={getSeriesKey}
          getPointKey={getPointKey}
          interactionOptions={family.interactionOptions}
          onInteractionChange={onInteractionChange}
          getAnnotations={getAnnotations}
          onRenderAnnotationContent={renderAnnotationContent}
          onRenderPlotLayers={renderPlotLayers}
        />
      </div>
      <p className={classes.text}>
        Inspection: {activeX === undefined ? 'none' : formatX(activeX)}.
        {activeX !== undefined &&
          (sameX(activeX, family.unavailableX) ? ' Observation unavailable.' : ' Observation available.')}
        {' Active interval IDs: '}
        {activeKeys.length ? activeKeys.join(', ') : 'none'}.
      </p>
      <p className={classes.text}>
        Native action invocations: {invocations}
        {lastSource ? ` (last: ${lastSource})` : ''}. One click, Enter, or Space activation should increment this count
        once.
      </p>
      {details ? (
        <Dialog
          open
          onOpenChange={(_, data) => {
            if (!data.open) {
              setDetails(undefined);
            }
          }}
        >
          <DialogSurface aria-describedby={dialogDescriptionId}>
            <DialogBody>
              <DialogTitle>Interval group details</DialogTitle>
              <DialogContent>
                <p id={dialogDescriptionId}>
                  Read-only synthetic interval details. This list contains every actual member of the selected connected
                  group, not just the intervals active at the inspected x-value. Both endpoints are included.
                </p>
                <ul>
                  {details.intervalKeys.map(key => {
                    const interval = intervalsByKey.get(key)!;
                    return (
                      <li key={key}>
                        {interval.key}: {interval.label} — {formatX(detailsFamily.toX(interval.start))} to{' '}
                        {formatX(detailsFamily.toX(interval.end))}
                      </li>
                    );
                  })}
                </ul>
                {!hasIntervals ? (
                  <p>Annotations are no longer available. Closing returns focus to Load synthetic intervals.</p>
                ) : null}
              </DialogContent>
              <DialogActions>
                <Button appearance="primary" onClick={() => setDetails(undefined)}>
                  Close details
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      ) : null}
    </div>
  );
};

LineChartIntervalAnnotations.parameters = {
  docs: {
    description: {
      story:
        'Generic numeric or Date intervals use createLineChartAnnotationIntervalModel with explicit closed bounds. ' +
        'Pure belowGrid and getAnnotations callbacks share getLayout(plot, 12): disjoint full-height coverage regions ' +
        'are decorative, while each logical overlap group has one native annotation action. ' +
        'onRenderAnnotationContent adds only noninteractive visuals; core owns button semantics, pointer/Enter/Space ' +
        'activation, plot masks, and native focus reconciliation when actions disappear. ' +
        'onInteractionChange reads exact getActiveKeys(activeX), not connected-group membership. ' +
        'Explicit xValues include missing slot 5 (05:00 UTC), whose numeric observation is omitted and whose adjacent ' +
        'edge is cut by a declared gap. At slot 5 only B and C are active, although the connected group also contains A. ' +
        'The caller owns the read-only Fluent Dialog, dismissal, and focus restoration to the captured native opener ' +
        'or the Load button if that action was removed. ' +
        'Initial availability is empty, followed by clearly simulated 800 ms loading; no network API is involved. ' +
        'Load, delayed failure, and clear/cancel controls change annotation availability without replacing the chart. ' +
        'Pending timers are cancelled on replacement, clear, and unmount, with guarded stale completions. ' +
        'getAnnotations is supplied even while empty, keeping the scene renderer active throughout.',
    },
  },
};
