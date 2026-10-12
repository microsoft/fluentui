import * as React from 'react';
import type { ForwardRefComponent, JSXElement } from '@fluentui/react-components';
import { Badge, Switch, makeStyles, tokens, useId } from '@fluentui/react-components';
import { DataVizPalette, VegaDeclarativeChart, getColorFromToken } from '@fluentui/react-charts';
import type {
  VegaDataResolver,
  VegaDeclarativeChartProps,
  VegaLiteAggregate,
  VegaLiteRepeatSpec,
  VegaLiteSpec,
  VegaSchema,
} from '@fluentui/react-charts';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalXL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalS,
  },
  title: {
    margin: 0,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
  },
  description: {
    margin: 0,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalL,
  },
  surface: {
    minWidth: 0,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    overflowX: 'auto',
  },
  summary: {
    margin: 0,
    padding: tokens.spacingHorizontalM,
    borderInlineStartColor: tokens.colorBrandStroke1,
    borderInlineStartStyle: 'solid',
    borderInlineStartWidth: tokens.strokeWidthThick,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
});

type SemanticExampleProps = Pick<VegaDeclarativeChartProps, 'chartSchema' | 'dataResolver' | 'allowedDataOrigins'> & {
  title: string;
  description: string;
  summary: string;
  children: React.ReactNode;
  paused?: boolean;
};

const SemanticExample: ForwardRefComponent<SemanticExampleProps> = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const titleId = useId('semantic-example-title-');
  const descriptionId = useId('semantic-example-description-');
  const { title, description, summary, children, paused, chartSchema, dataResolver, allowedDataOrigins } = props;

  return (
    <section ref={ref} className={classes.root} aria-labelledby={titleId} aria-describedby={descriptionId}>
      <header className={classes.header}>
        <Badge appearance="tint" color="brand">
          Strict semantics · offline data
        </Badge>
        <h2 id={titleId} className={classes.title}>
          {title}
        </h2>
        <p id={descriptionId} className={classes.description}>
          {description}
        </p>
      </header>
      <div className={classes.controls}>{children}</div>
      <p className={classes.summary} role="status" aria-live="polite">
        {summary}
      </p>
      <div className={classes.surface}>
        {paused ? (
          <p className={classes.description}>
            Enable the offline resolver to read the CSV fixture. Strict mode requires an explicit resolver for
            URL-backed data; this paused state does not mount the chart or start resource resolution.
          </p>
        ) : (
          <VegaDeclarativeChart
            chartSchema={chartSchema}
            semanticMode="strict"
            dataResolver={dataResolver}
            allowedDataOrigins={allowedDataOrigins}
          />
        )}
      </div>
    </section>
  );
});
SemanticExample.displayName = 'SemanticExample';

// Author once, select by reference. Neither render nor a control mutates these specifications.
// Numeric widths/heights below describe chart geometry, not CSS spacing or typography.
const blue = getColorFromToken(DataVizPalette.color1);
const teal = getColorFromToken(DataVizPalette.color3);
const purple = getColorFromToken(DataVizPalette.color4);
const ema: VegaLiteAggregate = { exponential: 0.5 };

const aggregateLayers: VegaLiteSpec = {
  title: 'Monthly response time · mean and EMA',
  width: 640,
  height: 250,
  data: {
    values: [
      { month: 1, latency: 20 },
      { month: 1, latency: 40 },
      { month: 1, latency: 80 },
      { month: 2, latency: 30 },
      { month: 2, latency: 50 },
      { month: 2, latency: 90 },
      { month: 3, latency: 25 },
      { month: 3, latency: 35 },
      { month: 3, latency: 60 },
      { month: 4, latency: 15 },
      { month: 4, latency: 25 },
      { month: 4, latency: 45 },
    ],
  },
  encoding: { x: { field: 'month', type: 'quantitative', axis: { title: 'Month', values: [1, 2, 3, 4] } } },
  layer: [
    {
      mark: { type: 'line', point: true },
      encoding: {
        y: { field: 'latency', aggregate: 'mean', type: 'quantitative', title: 'Response time (ms)' },
        color: { value: blue },
        tooltip: [
          { field: 'month', title: 'Month' },
          { field: 'latency', aggregate: 'mean', title: 'Mean (ms)', format: '.2f' },
        ],
      },
    },
    {
      mark: { type: 'line', point: true, strokeDash: [4, 3] },
      encoding: {
        y: { field: 'latency', aggregate: ema, type: 'quantitative', title: 'Response time (ms)' },
        color: { value: teal },
        tooltip: [
          { field: 'month', title: 'Month' },
          { field: 'latency', aggregate: ema, title: 'EMA (ms)', format: '.2f' },
        ],
      },
    },
  ],
};

const windowBaseline: VegaLiteSpec = {
  title: 'Release queue · cumulative work across tied priorities',
  width: 640,
  height: 250,
  data: {
    values: [
      { release: 'Atlas', priority: 1, hours: 2 },
      { release: 'Beacon', priority: 1, hours: 4 },
      { release: 'Cedar', priority: 2, hours: 8 },
      { release: 'Delta', priority: 3, hours: 6 },
    ],
  },
  transform: [
    {
      window: [
        { op: 'rank', as: 'rank' },
        { op: 'dense_rank', as: 'denseRank' },
        { op: 'sum', field: 'hours', as: 'runningHours' },
      ],
      sort: [{ field: 'priority', order: 'ascending' }],
      frame: [null, 0],
      ignorePeers: false,
    },
  ],
  mark: 'bar',
  encoding: {
    x: { field: 'release', type: 'nominal', sort: ['Atlas', 'Beacon', 'Cedar', 'Delta'] },
    y: { field: 'runningHours', type: 'quantitative', title: 'Cumulative work (hours)' },
    color: { value: purple },
    tooltip: [
      { field: 'release', title: 'Release' },
      { field: 'rank', title: 'Rank' },
      { field: 'denseRank', title: 'Dense rank' },
      { field: 'runningHours', title: 'Cumulative hours' },
    ],
  },
};

const aggregateAndWindowSchema: VegaSchema = { vegaLiteSpec: { vconcat: [aggregateLayers, windowBaseline] } };
const rowWindowSchema: VegaSchema = {
  vegaLiteSpec: {
    vconcat: [
      aggregateLayers,
      {
        ...windowBaseline,
        transform: [{ ...windowBaseline.transform![0], ignorePeers: true }],
      },
    ],
  },
};

export const AggregateAndWindowStatistics = (): JSXElement => {
  const [includePeers, setIncludePeers] = React.useState(true);
  return (
    <SemanticExample
      title="Statistics with a visible baseline"
      description="Compare a solid mean with a dashed EMA, then inspect a cumulative frame with tied priorities."
      chartSchema={includePeers ? aggregateAndWindowSchema : rowWindowSchema}
      summary={
        includePeers
          ? 'Peer-aware frame: cumulative hours are 6, 6, 14, 20. Ranks are 1, 1, 3, 4; dense ranks are 1, 1, 2, 3.'
          : 'Row-only frame: cumulative hours are 2, 6, 14, 20. Tied ranks stay unchanged; only the frame changes.'
      }
    >
      <Switch
        checked={includePeers}
        onChange={(_, data) => setIncludePeers(data.checked)}
        label="Include tied peers in the frame"
      />
    </SemanticExample>
  );
};
AggregateAndWindowStatistics.parameters = {
  docs: {
    description: {
      story:
        'The upper layers use scalar mean and the typed object aggregate `{ exponential: 0.5 }`. The parameter is retention, ' +
        'and the EMA is computed in source order **within each month**, not as a rolling transform across months. The lower ' +
        'bar view uses rank, dense_rank and sum with `frame: [null, 0]`. Switch peer expansion on or off to compare the first ' +
        'two bars. Tab to the switch and press Space; Tab into a chart and use its arrow navigation to inspect formatted tooltips.',
    },
  },
};

const filteredMultilineSpec: VegaLiteSpec = {
  width: 640,
  height: 320,
  data: {
    values: [
      { day: 1, requests: 12, note: 'Morning release\nCache warmed successfully' },
      { day: 2, requests: 0, note: 'Planned maintenance\nZero requests is a valid observation' },
      { day: 3, requests: null, note: 'Sensor unavailable\nNot a zero' },
      { day: 4, requests: 18, note: 'Service restored\nAll regions reporting' },
      { day: 5, requests: 24, note: 'Traffic recovered\nNo intervention needed' },
    ],
  },
  transform: [{ filter: { field: 'requests', valid: true } }],
  mark: { type: 'line', point: true },
  encoding: {
    x: { field: 'day', type: 'quantitative', title: 'Day', axis: { values: [1, 2, 3, 4, 5] } },
    y: { field: 'requests', type: 'quantitative', title: 'Requests' },
    color: { value: blue },
    tooltip: [
      { field: 'day', title: 'Day' },
      { field: 'requests', title: 'Requests', format: '.0f' },
      { field: 'note', title: 'Operational note' },
    ],
  },
};
const filteredMultilineSchema: VegaSchema = { vegaLiteSpec: filteredMultilineSpec };
const filteredNoTooltipSchema: VegaSchema = {
  vegaLiteSpec: { ...filteredMultilineSpec, encoding: { ...filteredMultilineSpec.encoding, tooltip: false } },
};

export const FilteredMultilineTooltips = (): JSXElement => {
  const [showTooltips, setShowTooltips] = React.useState(true);
  return (
    <SemanticExample
      title="Missing is not zero"
      description="A valid-field filter removes the missing reading while explicit tooltips preserve multiline notes."
      chartSchema={showTooltips ? filteredMultilineSchema : filteredNoTooltipSchema}
      summary={`Four valid readings remain, including day 2 at zero. Day 3 is filtered out. Tooltips are ${
        showTooltips ? 'enabled' : 'disabled'
      }.`}
    >
      <Switch
        checked={showTooltips}
        onChange={(_, data) => setShowTooltips(data.checked)}
        label="Show operational tooltips"
      />
    </SemanticExample>
  );
};
FilteredMultilineTooltips.parameters = {
  docs: {
    description: {
      story:
        '`filter: { field: "requests", valid: true }` excludes null, not zero. Tooltip fields are explicit and the note contains ' +
        'a real newline. Disable the switch to author `tooltip: false`; data and geometry stay unchanged, and point labels remain ' +
        'available to assistive technology. Tab and Space operate the switch; focus chart points using the chart’s arrow navigation ' +
        'to compare day 2’s zero and its two-line note. The filtered chart connects the remaining observations; it does not impute day 3.',
    },
  },
};

const rangedGroupedSpec: VegaLiteSpec = {
  width: 640,
  height: 320,
  data: {
    values: [
      { region: 'North', scenario: 'Current', start: 12, end: 28, team: 'Platform' },
      { region: 'North', scenario: 'Proposed', start: 8, end: 22, team: 'Platform' },
      { region: 'South', scenario: 'Current', start: 16, end: 34, team: 'Product' },
      { region: 'South', scenario: 'Proposed', start: 10, end: 25, team: 'Product' },
      { region: 'West', scenario: 'Current', start: 14, end: 30, team: 'Platform' },
      { region: 'West', scenario: 'Proposed', start: 9, end: 24, team: 'Platform' },
    ],
  },
  mark: { type: 'bar', cornerRadiusEnd: 4 },
  encoding: {
    x: { field: 'region', type: 'nominal', sort: ['North', 'South', 'West'] },
    xOffset: { field: 'scenario', type: 'nominal', sort: ['Current', 'Proposed'] },
    y: { field: 'end', type: 'quantitative', title: 'Response-time interval (ms)', scale: { domain: [0, 40] } },
    y2: { field: 'start', type: 'quantitative' },
    color: { field: 'team', type: 'nominal', scale: { domain: ['Platform', 'Product'], range: [blue, teal] } },
    tooltip: [
      { field: 'region', title: 'Region' },
      { field: 'scenario', title: 'Scenario' },
      { field: 'team', title: 'Team' },
      { field: 'start', title: 'Start (ms)' },
      { field: 'end', title: 'End (ms)' },
    ],
  },
};
const rangedGroupedSchema: VegaSchema = { vegaLiteSpec: rangedGroupedSpec };
const reversedGroupedSchema: VegaSchema = {
  vegaLiteSpec: {
    ...rangedGroupedSpec,
    encoding: {
      ...rangedGroupedSpec.encoding,
      xOffset: { field: 'scenario', type: 'nominal', sort: ['Proposed', 'Current'] },
    },
  },
};

export const RangedGroupedBars = (): JSXElement => {
  const [proposedFirst, setProposedFirst] = React.useState(false);
  return (
    <SemanticExample
      title="Position and color answer different questions"
      description="Intervals compare current and proposed scenarios; color identifies the owning team, not the group slot."
      chartSchema={proposedFirst ? reversedGroupedSchema : rangedGroupedSchema}
      summary={`${
        proposedFirst ? 'Proposed' : 'Current'
      } occupies the first slot in each region. Both North intervals keep the same Platform color and nonzero start.`}
    >
      <Switch
        checked={proposedFirst}
        onChange={(_, data) => setProposedFirst(data.checked)}
        label="Place proposed scenario first"
      />
    </SemanticExample>
  );
};
RangedGroupedBars.parameters = {
  docs: {
    description: {
      story:
        '`xOffset` groups by scenario independently of `color.field: "team"`. `y` and `y2` retain both interval endpoints instead ' +
        'of drawing from zero. Change only the offset sort with the switch; colors and bounds do not change. Tab and Space operate ' +
        'the switch. Focus an interval and use Arrow keys, Home or End to move between marks; focus or hover exposes both endpoints. ' +
        'Legend options can be selected with the keyboard to filter teams.',
    },
  },
};

const normalizedStackSpec: VegaLiteSpec = {
  width: 640,
  height: 320,
  data: {
    values: [
      { month: 'April', channel: 'Self-service', tickets: 30, priority: 2 },
      { month: 'April', channel: 'Assisted', tickets: 10, priority: 1 },
      { month: 'May', channel: 'Self-service', tickets: 45, priority: 2 },
      { month: 'May', channel: 'Assisted', tickets: 30, priority: 1 },
      { month: 'June', channel: 'Self-service', tickets: 60, priority: 2 },
      { month: 'June', channel: 'Assisted', tickets: 20, priority: 1 },
    ],
  },
  mark: 'bar',
  encoding: {
    x: { field: 'month', type: 'nominal', sort: ['April', 'May', 'June'] },
    y: {
      field: 'tickets',
      type: 'quantitative',
      stack: 'normalize',
      axis: { title: 'Share of tickets', format: '.0%' },
    },
    order: { field: 'priority', type: 'quantitative', sort: 'ascending' },
    color: { field: 'channel', type: 'nominal', scale: { domain: ['Self-service', 'Assisted'], range: [blue, teal] } },
    tooltip: [
      { field: 'month', title: 'Month' },
      { field: 'channel', title: 'Channel' },
      { field: 'tickets', title: 'Raw tickets', format: '.0f' },
    ],
  },
};
const normalizedStackSchema: VegaSchema = { vegaLiteSpec: normalizedStackSpec };
const reversedStackSchema: VegaSchema = {
  vegaLiteSpec: {
    ...normalizedStackSpec,
    encoding: {
      ...normalizedStackSpec.encoding,
      order: { field: 'priority', type: 'quantitative', sort: 'descending' },
    },
  },
};

export const NormalizedStackOrder = (): JSXElement => {
  const [selfServiceFirst, setSelfServiceFirst] = React.useState(false);
  return (
    <SemanticExample
      title="Normalize geometry, not the tooltip"
      description="Stack priority is independent of month order and the color-domain order."
      chartSchema={selfServiceFirst ? reversedStackSchema : normalizedStackSchema}
      summary={`${
        selfServiceFirst ? 'Self-service' : 'Assisted'
      } starts at the baseline. April and June are 75% self-service, but their raw totals are 40 and 80 tickets.`}
    >
      <Switch
        checked={selfServiceFirst}
        onChange={(_, data) => setSelfServiceFirst(data.checked)}
        label="Stack self-service first"
      />
    </SemanticExample>
  );
};
NormalizedStackOrder.parameters = {
  docs: {
    description: {
      story:
        '`y.stack: "normalize"` makes every full bar 100%. The `order` channel sorts by numeric priority; reversing it does not ' +
        'reverse months or the color domain. Explicit tooltips still report raw ticket counts, not normalized fractions. Use Tab ' +
        'and Space on the switch, then focus a segment using chart arrow navigation to inspect its raw amount. Legend selection ' +
        'filters channels and can therefore change the visible normalization.',
    },
  },
};

const centeredAreaSpec: VegaLiteSpec = {
  width: 640,
  height: 340,
  data: {
    values: [
      { week: 1, service: 'Search', load: 12 },
      { week: 1, service: 'Storage', load: 8 },
      { week: 2, service: 'Search', load: 16 },
      { week: 2, service: 'Storage', load: 12 },
      { week: 3, service: 'Search', load: 10 },
      { week: 3, service: 'Storage', load: 18 },
      { week: 4, service: 'Search', load: 18 },
      { week: 4, service: 'Storage', load: 14 },
      { week: 5, service: 'Search', load: 14 },
      { week: 5, service: 'Storage', load: 10 },
    ],
  },
  mark: 'area',
  encoding: {
    x: { field: 'week', type: 'quantitative', axis: { title: 'Week', values: [1, 2, 3, 4, 5] } },
    y: { field: 'load', type: 'quantitative', stack: 'center', title: 'Centered load (requests/s)' },
    color: { field: 'service', type: 'nominal', scale: { domain: ['Search', 'Storage'], range: [blue, teal] } },
    tooltip: [
      { field: 'week', title: 'Week' },
      { field: 'service', title: 'Service' },
      { field: 'load', title: 'Raw load (requests/s)' },
    ],
  },
};
const centeredAreaSchema: VegaSchema = { vegaLiteSpec: centeredAreaSpec };
const searchOnlySchema: VegaSchema = {
  vegaLiteSpec: { ...centeredAreaSpec, transform: [{ filter: { field: 'service', equal: 'Search' } }] },
};

export const CenteredArea = (): JSXElement => {
  const [includeStorage, setIncludeStorage] = React.useState(true);
  return (
    <SemanticExample
      title="Maximum-total centered areas"
      description="Each week's stack is centered within the maximum total across all weeks, not around zero; tooltips retain raw load."
      chartSchema={includeStorage ? centeredAreaSchema : searchOnlySchema}
      summary={
        includeStorage
          ? 'The maximum weekly total is 32 requests/s. Week 1 totals 20, starts at (32 − 20) / 2 = 6, and spans 6 to 26. Search reports its raw load of 12.'
          : 'Search only: the maximum weekly total is 18 requests/s. Week 1 totals 12, starts at (18 − 12) / 2 = 3, and spans 3 to 15; raw Search load remains 12.'
      }
    >
      <Switch
        checked={includeStorage}
        onChange={(_, data) => setIncludeStorage(data.checked)}
        label="Include Storage load"
      />
    </SemanticExample>
  );
};
CenteredArea.parameters = {
  docs: {
    description: {
      story:
        '`y.stack: "center"` stacks absolute contributions, starting each group at `(maximum absolute group total − group total) / 2`. ' +
        'The maximum is computed across all x positions; this is not independent zero-centering. Toggle the service field filter ' +
        'to compare one service with both; all weekly totals and the global maximum are recomputed while tooltips retain raw load. ' +
        'Tab and Space operate the switch. Focus area sample points and use ' +
        'Arrow keys, Home or End to inspect raw values; Escape dismisses the tooltip.',
    },
  },
};

const facetMissingSpec: VegaLiteSpec = {
  data: {
    values: [
      { quarter: 'Q1', week: 1, incidents: 3 },
      { region: 'North', quarter: 'Q1', week: 1, incidents: 4 },
      { region: 'North', quarter: 'Q1', week: 2, incidents: 2 },
      { region: 'South', quarter: 'Q2', week: 1, incidents: 6 },
      { region: 'South', quarter: 'Q2', week: 2, incidents: 3 },
    ],
  },
  facet: {
    row: { field: 'region', type: 'nominal', sort: 'ascending', header: { title: 'Region' } },
    column: { field: 'quarter', type: 'nominal', sort: ['Q1', 'Q2'], header: { title: 'Quarter' } },
  },
  spec: {
    width: 300,
    height: 200,
    mark: 'point',
    encoding: {
      x: { field: 'week', type: 'quantitative', title: 'Week', scale: { domain: [0, 3] } },
      y: { field: 'incidents', type: 'quantitative', title: 'Incidents', scale: { domain: [0, 8] } },
      color: { value: teal },
      tooltip: [
        { field: 'week', title: 'Week' },
        { field: 'incidents', title: 'Incidents' },
      ],
    },
  },
};
const facetMissingSchema: VegaSchema = { vegaLiteSpec: facetMissingSpec };
const facetKnownSchema: VegaSchema = {
  vegaLiteSpec: { ...facetMissingSpec, transform: [{ filter: { field: 'region', valid: true } }] },
};

export const FacetMissingCells = (): JSXElement => {
  const [includeMissing, setIncludeMissing] = React.useState(true);
  return (
    <SemanticExample
      title="Empty cells are information"
      description="Row and column facets preserve observed domains, missing-field groups and unobserved combinations."
      chartSchema={includeMissing ? facetMissingSchema : facetKnownSchema}
      summary={
        includeMissing
          ? 'Three region groups × two quarters = six cells. Three contain data; three say “No data”. The missing region is a real group.'
          : 'Known regions only: two groups × two quarters = four cells. North/Q2 and South/Q1 remain empty, not zero.'
      }
    >
      <Switch
        checked={includeMissing}
        onChange={(_, data) => setIncludeMissing(data.checked)}
        label="Include records with a missing region"
      />
    </SemanticExample>
  );
};
FacetMissingCells.parameters = {
  docs: {
    description: {
      story:
        'The parent `facet` owns row/column grouping and the nested `spec` owns mark and encoding. The full observed-domain ' +
        'Cartesian matrix includes missing-field groups and accessible “No data” regions; an absent combination is not an ' +
        'invented zero. A parent valid-field filter removes only the missing region. Use Tab and Space on the switch, screen-reader ' +
        'heading/region navigation to discover empty cells, and chart arrow navigation to inspect points in populated cells.',
    },
  },
};

const repeatTemplate: VegaLiteRepeatSpec = {
  width: 300,
  height: 230,
  mark: 'point',
  encoding: {
    x: { field: { repeat: 'column' }, type: 'quantitative' },
    y: { field: { repeat: 'row' }, type: 'quantitative' },
    color: { value: purple },
    tooltip: [
      { field: 'service', title: 'Service' },
      { field: 'latency', title: 'Latency (ms)' },
      { field: 'throughput', title: 'Throughput (requests/s)' },
    ],
  },
};
const repeatMatrixSpec: VegaLiteSpec = {
  data: {
    values: [
      { service: 'Search', latency: 24, throughput: 80 },
      { service: 'Storage', latency: 36, throughput: 60 },
      { service: 'Identity', latency: 18, throughput: 100 },
      { service: 'Messaging', latency: 42, throughput: 45 },
    ],
  },
  repeat: { row: ['latency', 'throughput'], column: ['latency', 'throughput'] },
  spec: repeatTemplate,
  resolve: { scale: { x: 'independent', y: 'independent' } },
};
const repeatMatrixSchema: VegaSchema = { vegaLiteSpec: repeatMatrixSpec };
const reversedRepeatSchema: VegaSchema = {
  vegaLiteSpec: { ...repeatMatrixSpec, repeat: { row: ['throughput', 'latency'], column: ['latency', 'throughput'] } },
};

export const RepeatMatrix = (): JSXElement => {
  const [throughputFirst, setThroughputFirst] = React.useState(false);
  return (
    <SemanticExample
      title="One typed template, four comparisons"
      description="Repeat references bind independently to each cell; different units use independent axis scales."
      chartSchema={throughputFirst ? reversedRepeatSchema : repeatMatrixSchema}
      summary={`${
        throughputFirst ? 'Throughput' : 'Latency'
      } is the first row. All four cells show the same four services; diagonal cells compare a metric with itself.`}
    >
      <Switch
        checked={throughputFirst}
        onChange={(_, data) => setThroughputFirst(data.checked)}
        label="Place throughput in the first row"
      />
    </SemanticExample>
  );
};
RepeatMatrix.parameters = {
  docs: {
    description: {
      story:
        'A `VegaLiteSpec` parent supplies data and the repeat matrix. Its nested `spec` is explicitly typed `VegaLiteRepeatSpec`, ' +
        'so `{ repeat: "row" }` and `{ repeat: "column" }` field references need no cast or weakening of ordinary field types. ' +
        'Independent x/y scales avoid mixing milliseconds and requests/s. Tab and Space swap row order; use heading navigation ' +
        'to identify a cell and the chart’s arrow navigation to inspect its points. Swapping rows does not change the source data.',
    },
  },
};

const resourceUrl = 'https://fixtures.example.test/stories/service-load.csv';
const resourceOrigins: readonly string[] = ['https://fixtures.example.test'];
const offlineCsv = 'day,requests\n2026-01-01,12\n2026-01-02,0\n2026-01-03,18\n2026-01-04,24\n';
const resourceSchema: VegaSchema = {
  vegaLiteSpec: {
    width: 640,
    height: 320,
    data: { url: resourceUrl, format: { type: 'csv', parse: { day: "utc:'%Y-%m-%d'", requests: 'number' } } },
    mark: { type: 'line', point: true },
    encoding: {
      x: { field: 'day', type: 'temporal', scale: { type: 'utc' }, axis: { title: 'Day (UTC)', format: '%b %d' } },
      y: { field: 'requests', type: 'quantitative', title: 'Requests' },
      color: { value: blue },
      tooltip: [
        { field: 'day', type: 'temporal', title: 'Day', format: '%Y-%m-%d', formatType: 'utc' },
        { field: 'requests', title: 'Requests', format: '.0f' },
      ],
    },
  },
};

// The URL is an allowlisted fixture identifier, never a fetch destination. Both callbacks are stable.
const offlineResolver: VegaDataResolver = async ({ url, signal }) => {
  if (signal.aborted) {
    const error = new Error('Offline CSV resolution cancelled');
    error.name = 'AbortError';
    throw error;
  }
  if (url !== resourceUrl) {
    throw new Error('No offline fixture is registered for this URL');
  }
  return offlineCsv;
};
const failingResolver: VegaDataResolver = async () => {
  throw new Error('The offline host rejected this fixture. Turn off “Simulate host failure” to retry.');
};

export const ManagedDataResource = (): JSXElement => {
  const [resolverEnabled, setResolverEnabled] = React.useState(true);
  const [simulateFailure, setSimulateFailure] = React.useState(false);
  return (
    <SemanticExample
      title="The host owns data access"
      description="A statically returned CSV demonstrates parsing, cancellation-aware resolution and visible host errors without networking."
      chartSchema={resourceSchema}
      dataResolver={simulateFailure ? failingResolver : offlineResolver}
      allowedDataOrigins={resourceOrigins}
      paused={!resolverEnabled}
      summary={
        !resolverEnabled
          ? 'Resolver disabled: the chart is paused and no resource callback runs.'
          : simulateFailure
          ? 'Host failure selected: the chart presents a visible alert. Turn off the failure switch to reload the offline fixture.'
          : 'Offline CSV selected: dates parse as UTC and requests as numbers. January 2 remains a real zero. No network request is made.'
      }
    >
      <Switch
        checked={resolverEnabled}
        onChange={(_, data) => setResolverEnabled(data.checked)}
        label="Enable offline resolver"
      />
      <Switch
        checked={simulateFailure}
        disabled={!resolverEnabled}
        onChange={(_, data) => setSimulateFailure(data.checked)}
        label="Simulate host failure"
      />
    </SemanticExample>
  );
};
ManagedDataResource.parameters = {
  docs: {
    description: {
      story:
        '`dataResolver` is a module-stable, host-owned callback returning a literal CSV string for one exact allowlisted HTTP/S ' +
        'fixture identifier. Neither callback performs fetch or any other network I/O. `format.parse` converts dates to UTC and ' +
        'request counts to numbers before chart preparation. Simulated rejection uses the public chart’s visible alert; clearing ' +
        'the failure switches back to the successful resolver. Without a resolver, a URL-backed strict spec fails preflight, so ' +
        'the disabled state deliberately unmounts it instead of allowing an uncaught render error. Tab and Space operate both ' +
        'switches; chart arrow navigation inspects parsed values. Unmounting cancels resolution; re-enabling starts a fresh offline read.',
    },
  },
};
