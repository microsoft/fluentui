'use client';

import * as React from 'react';
import { Button, Input, Link, Text } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

import {
  DashboardGridStory,
  type DashboardGridStoryEventReporter,
  type DashboardGridStoryItemDefinition,
  type DashboardGridStoryResponsiveOptions,
} from './DashboardGridStoryAdapter';
import { useTileStyles } from './DashboardGridStoryFixtures.styles';

export const PRIMARY_GRID_ID = 'dashboard-primary-grid';
export const PARKING_GRID_ID = 'dashboard-parking-grid';
export const NESTED_GRID_ID = 'dashboard-nested-grid';
export const SHADOW_GRID_ID = 'dashboard-shadow-grid';
export const PRINT_GRID_ID = 'dashboard-print-grid';

export const RESPONSIVE_WIDTHS = {
  wide: 1120,
  medium: 720,
  narrow: 360,
} as const;

export const DASHBOARD_RESPONSIVE_OPTIONS: DashboardGridStoryResponsiveOptions = {
  breakpoints: [
    { maxWidth: 480, columns: 1, layout: 'list' },
    { maxWidth: 840, columns: 6, layout: 'moveScale' },
  ],
  observe: 'grid',
  layout: 'moveScale',
};

export const NESTED_ITEMS: readonly DashboardGridStoryItemDefinition[] = [
  {
    id: 'nested-a',
    label: 'Nested tile A',
    column: 0,
    row: 0,
    columnSpan: 3,
    rowSpan: 1,
    component: 'nested-leaf',
    props: { title: 'Nested tile A' },
  },
  {
    id: 'nested-b',
    label: 'Nested tile B',
    column: 3,
    row: 0,
    columnSpan: 3,
    rowSpan: 1,
    component: 'nested-leaf',
    props: { title: 'Nested tile B' },
  },
];

export const DASHBOARD_ITEMS: readonly DashboardGridStoryItemDefinition[] = [
  {
    id: 'stateful',
    label: 'Stateful tile',
    column: 0,
    row: 0,
    columnSpan: 3,
    rowSpan: 2,
    minColumnSpan: 2,
    component: 'stateful',
  },
  {
    id: 'interactive',
    label: 'Interactive descendants tile',
    column: 3,
    row: 0,
    columnSpan: 3,
    rowSpan: 2,
    component: 'interactive',
  },
  {
    id: 'nested',
    label: 'Nested dashboard tile',
    column: 6,
    row: 0,
    columnSpan: 6,
    rowSpan: 4,
    component: 'nested',
    subGrid: {
      columns: 'auto',
      items: NESTED_ITEMS,
    },
  },
  {
    id: 'activity',
    label: 'Activity tile',
    column: 0,
    row: 2,
    columnSpan: 6,
    rowSpan: 2,
    component: 'activity',
  },
  {
    id: 'removable',
    label: 'Removable tile',
    column: 6,
    row: 4,
    columnSpan: 3,
    rowSpan: 2,
    component: 'removable',
  },
  {
    id: 'screen-only',
    label: 'Screen-only tile',
    column: 9,
    row: 4,
    columnSpan: 3,
    rowSpan: 2,
    component: 'print-hidden',
    print: { hide: true },
  },
];

export const PARKING_ITEMS: readonly DashboardGridStoryItemDefinition[] = [
  {
    id: 'parking',
    label: 'Cross-grid transfer target',
    column: 0,
    row: 0,
    columnSpan: 12,
    rowSpan: 1,
    component: 'parking',
    resizable: false,
  },
];

export const SHADOW_ITEMS: readonly DashboardGridStoryItemDefinition[] = [
  {
    id: 'shadow-stateful',
    label: 'Shadow DOM stateful tile',
    column: 0,
    row: 0,
    columnSpan: 6,
    rowSpan: 2,
    component: 'stateful',
  },
  {
    id: 'shadow-interactive',
    label: 'Shadow DOM interactive tile',
    column: 0,
    row: 2,
    columnSpan: 6,
    rowSpan: 2,
    component: 'interactive',
  },
];

export const PRINT_ITEMS: readonly DashboardGridStoryItemDefinition[] = [
  {
    id: 'print-summary',
    label: 'Printable summary tile',
    column: 0,
    row: 0,
    columnSpan: 5,
    rowSpan: 2,
    component: 'print-summary',
  },
  {
    id: 'print-detail',
    label: 'Printable detail tile',
    column: 5,
    row: 0,
    columnSpan: 7,
    rowSpan: 3,
    component: 'print-detail',
    print: { pageBreakBefore: true, orientation: 'landscape' },
  },
  {
    id: 'print-hidden',
    label: 'Screen-only print tile',
    column: 0,
    row: 3,
    columnSpan: 12,
    rowSpan: 1,
    component: 'print-hidden',
    print: { hide: true },
  },
];

export const createDynamicItem = (id: string, index: number): DashboardGridStoryItemDefinition => ({
  id,
  label: `Dynamic tile ${index}`,
  columnSpan: 3,
  rowSpan: 2,
  autoPosition: true,
  component: 'dynamic',
  props: { index },
});

const fixtureDefinitions = new Map(
  [...DASHBOARD_ITEMS, ...PARKING_ITEMS, ...NESTED_ITEMS, ...SHADOW_ITEMS, ...PRINT_ITEMS].map(
    item => [item.id, item] as const,
  ),
);

type TileFrameProps = Readonly<{
  itemId: string;
  title: string;
  children: React.ReactNode;
}>;

const TileFrame = ({ itemId, title, children }: TileFrameProps): JSXElement => {
  const styles = useTileStyles();

  return (
    <section className={styles.tile} data-testid={`dashboard-tile-${itemId}`}>
      <Text as="h3" weight="semibold" className={styles.tileTitle}>
        {title}
      </Text>
      <div className={styles.tileBody}>{children}</div>
    </section>
  );
};

const StatefulTile = ({ itemId }: Readonly<{ itemId: string }>): JSXElement => {
  const styles = useTileStyles();
  const [count, setCount] = React.useState(0);
  const handleIncrement = React.useCallback(() => setCount(value => value + 1), []);

  return (
    <TileFrame itemId={itemId} title="Stateful tile">
      <Text>Counter state should survive responsive layout changes and cross-grid transfer.</Text>
      <div className={styles.inlineControls}>
        <Button data-testid={`dashboard-counter-${itemId}`} onClick={handleIncrement}>
          Increment
        </Button>
        <output className={styles.metric} data-testid={`dashboard-counter-value-${itemId}`} aria-live="polite">
          {count}
        </output>
      </div>
    </TileFrame>
  );
};

const InteractiveTile = ({ itemId }: Readonly<{ itemId: string }>): JSXElement => {
  const styles = useTileStyles();
  const [message, setMessage] = React.useState('No descendant action yet.');
  const handleActivate = React.useCallback(() => setMessage('Descendant button activated.'), []);

  return (
    <TileFrame itemId={itemId} title="Interactive descendants">
      <Input aria-label="Tile note" data-testid={`dashboard-input-${itemId}`} defaultValue="Editable content" />
      <div className={styles.inlineControls}>
        <Button data-testid={`dashboard-descendant-action-${itemId}`} onClick={handleActivate}>
          Activate child
        </Button>
        <Link href="#dashboard-diagnostics">Jump to diagnostics</Link>
      </div>
      <Text className={styles.subdued} data-testid={`dashboard-descendant-status-${itemId}`}>
        {message}
      </Text>
    </TileFrame>
  );
};

type DashboardTileContentCallbacks = Readonly<{
  onEvent?: DashboardGridStoryEventReporter;
}>;

type DashboardTileContentProps = DashboardTileContentCallbacks &
  Readonly<{
    item: DashboardGridStoryItemDefinition;
  }>;

export const DashboardTileContent = ({ item, onEvent }: DashboardTileContentProps): JSXElement => {
  const styles = useTileStyles();
  const renderNestedItem = React.useCallback(
    (nestedItem: DashboardGridStoryItemDefinition) => (
      <DashboardTileContent item={nestedItem} onEvent={onEvent} />
    ),
    [onEvent],
  );
  const fixtureDefinition = fixtureDefinitions.get(item.id);
  const definition: DashboardGridStoryItemDefinition = {
    ...fixtureDefinition,
    ...item,
    component:
      item.component ?? fixtureDefinition?.component ?? (item.id.startsWith('dynamic-') ? 'dynamic' : undefined),
  };

  switch (definition.component) {
    case 'stateful':
      return <StatefulTile itemId={definition.id} />;

    case 'interactive':
      return <InteractiveTile itemId={definition.id} />;

    case 'nested': {
      const subGrid = definition.subGrid;
      return (
        <TileFrame itemId={definition.id} title="Nested dashboard">
          <Text className={styles.subdued}>The child grid uses automatic columns derived from its parent span.</Text>
          <DashboardGridStory
            aria-label="Nested dashboard grid"
            data-testid="dashboard-grid-nested"
            className={styles.nestedGrid}
            gridId={NESTED_GRID_ID}
            items={subGrid?.items ?? []}
            columns={subGrid?.columns}
            responsive={subGrid?.responsive}
            rowHeight={subGrid?.rowHeight}
            printMode={subGrid?.printMode}
            renderItem={renderNestedItem}
            onEvent={onEvent}
          />
        </TileFrame>
      );
    }

    case 'activity':
      return (
        <TileFrame itemId={definition.id} title="Activity">
          <Text>Items-change callbacks update diagnostics without controlling items.</Text>
          <Text className={styles.metric}>
            {definition.columnSpan ?? 1} × {definition.rowSpan ?? 1} cells at {definition.column ?? 0},
            {definition.row ?? 0}
          </Text>
        </TileFrame>
      );

    case 'parking':
      return (
        <TileFrame itemId={definition.id} title="Transfer target">
          <Text>Move a tile here to validate provider-wide host, state, and focus preservation.</Text>
        </TileFrame>
      );

    case 'print-summary':
      return (
        <TileFrame itemId={definition.id} title="Printable summary">
          <Text>This tile is included in flow and exact print modes.</Text>
        </TileFrame>
      );

    case 'print-detail':
      return (
        <TileFrame itemId={definition.id} title="Printable detail">
          <Text>Exact mode requests a page break and landscape orientation for this tile.</Text>
        </TileFrame>
      );

    case 'print-hidden':
      return (
        <TileFrame itemId={definition.id} title="Screen-only tile">
          <Text>This tile should not appear when print media is active.</Text>
        </TileFrame>
      );

    case 'nested-leaf':
      return (
        <TileFrame
          itemId={definition.id}
          title={typeof definition.props?.title === 'string' ? definition.props.title : `Nested tile ${definition.id}`}
        >
          <Text>Nested model item.</Text>
        </TileFrame>
      );

    case 'removable':
      return (
        <TileFrame itemId={definition.id} title="Removable tile">
          <Text>The toolbar removal command targets this tile first.</Text>
        </TileFrame>
      );

    default:
      return (
        <TileFrame itemId={definition.id} title={`Tile ${definition.id}`}>
          <Text>Auto-positioned fixture item.</Text>
          <Text className={styles.metric}>
            {definition.columnSpan ?? 1} × {definition.rowSpan ?? 1} cells
          </Text>
        </TileFrame>
      );
  }
};
