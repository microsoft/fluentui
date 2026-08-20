import * as React from 'react';
import {
  Button,
  Field,
  Slider,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

import {
  DashboardGridStory,
  DashboardGridStoryProvider,
  type DashboardGridStoryEventData,
  type DashboardGridStoryHandle,
  type DashboardGridStoryItemDefinition,
  type DashboardGridStorySerializedGrid,
} from './DashboardGridStoryAdapter';
import {
  DASHBOARD_ITEMS,
  DASHBOARD_RESPONSIVE_OPTIONS,
  DashboardTileContent,
  PARKING_GRID_ID,
  PARKING_ITEMS,
  PRIMARY_GRID_ID,
  RESPONSIVE_WIDTHS,
  createDynamicItem,
} from './DashboardGridStoryFixtures';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  heading: {
    marginBlock: 0,
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'end',
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  widthField: {
    flexGrow: 1,
  },
  viewport: {
    maxInlineSize: '100%',
    marginInline: 'auto',
  },
  gridFrame: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'auto',
  },
  secondaryGrid: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  diagnostics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
  },
  diagnosticPanel: {
    minInlineSize: 0,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  diagnosticTitle: {
    marginBlockStart: 0,
  },
  diagnosticValue: {
    fontFamily: tokens.fontFamilyMonospace,
    overflowWrap: 'anywhere',
  },
  code: {
    marginBlock: 0,
    fontFamily: tokens.fontFamilyMonospace,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  },
  eventList: {
    marginBlock: 0,
    paddingInlineStart: tokens.spacingHorizontalL,
    fontFamily: tokens.fontFamilyMonospace,
  },
});

type EventLogEntry = Readonly<{
  sequence: number;
  name: string;
  sourceGridId?: string;
  targetGridId?: string;
  itemId?: string;
  reason?: string;
}>;

type KeyboardDiagnostics = Readonly<{
  mode: string;
  key: string;
  target: string;
}>;

const formatUnknown = (value: unknown): string => {
  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return String(value);
  }
};

const getLayoutFromEvent = (
  data: DashboardGridStoryEventData,
): unknown => data.items ?? data.layout ?? data.current ?? data;

const getEventString = (
  data: Readonly<Record<string, unknown>>,
  key: string,
): string | undefined => {
  const value = data[key];
  return typeof value === 'string' ? value : undefined;
};

const getActiveColumns = (
  data: DashboardGridStoryEventData,
): number | undefined =>
  typeof data.columns === 'number' ? data.columns : undefined;

const getSavedItems = (
  saved:
    | DashboardGridStorySerializedGrid
    | readonly DashboardGridStoryItemDefinition[],
): readonly DashboardGridStoryItemDefinition[] =>
  Array.isArray(saved)
    ? (saved as readonly DashboardGridStoryItemDefinition[])
    : (saved as DashboardGridStorySerializedGrid).items;

export const ParityPlayground = (): JSXElement => {
  const styles = useStyles();
  const imperativeRef = React.useRef<DashboardGridStoryHandle>(null);
  const savedLayoutRef = React.useRef<
    | DashboardGridStorySerializedGrid
    | readonly DashboardGridStoryItemDefinition[]
  >();
  const savedLastAddedItem = React.useRef<string>();
  const nextDynamicItem = React.useRef(1);
  const lastAddedItem = React.useRef<string>();
  const eventSequence = React.useRef(1);

  const [containerWidth, setContainerWidth] = React.useState(
    RESPONSIVE_WIDTHS.wide,
  );
  const [activeColumns, setActiveColumns] = React.useState(12);
  const [layoutJson, setLayoutJson] = React.useState(() =>
    formatUnknown(DASHBOARD_ITEMS),
  );
  const [eventLog, setEventLog] = React.useState<readonly EventLogEntry[]>([
    {
      sequence: 0,
      name: 'fixture-ready',
      sourceGridId: PRIMARY_GRID_ID,
    },
  ]);
  const [keyboardDiagnostics, setKeyboardDiagnostics] =
    React.useState<KeyboardDiagnostics>({
      mode: 'idle',
      key: 'None',
      target: 'None',
    });

  const appendEvent = React.useCallback(
    (
      name: string,
      data: Readonly<Record<string, unknown>> = {},
    ): void => {
      const entry: EventLogEntry = {
        sequence: eventSequence.current++,
        name,
        sourceGridId:
          getEventString(data, 'sourceGridId') ??
          getEventString(data, 'gridId'),
        targetGridId: getEventString(data, 'targetGridId'),
        itemId:
          getEventString(data, 'itemId') ??
          getEventString(data, 'id'),
        reason:
          getEventString(data, 'reason') ??
          getEventString(data, 'rejectedReason') ??
          getEventString(data, 'rejectionReason'),
      };

      setEventLog(current => [...current.slice(-11), entry]);
    },
    [],
  );

  const handleGridEvent = React.useCallback(
    (name: string, data: DashboardGridStoryEventData): void => {
      appendEvent(name, data);

      if (name === 'items-change') {
        setLayoutJson(formatUnknown(getLayoutFromEvent(data)));
      }

      if (name === 'columns-change') {
        const reportedColumns = getActiveColumns(data);
        if (reportedColumns !== undefined) {
          setActiveColumns(reportedColumns);
        }
      }

      if (name === 'arrange-mode-change') {
        setKeyboardDiagnostics(current => ({
          ...current,
          mode: data.active ? 'arranging' : 'idle',
          target:
            getEventString(data, 'itemId') ??
            getEventString(data, 'id') ??
            current.target,
        }));
      }
    },
    [appendEvent],
  );

  const renderItem = React.useCallback(
    (item: DashboardGridStoryItemDefinition) => (
      <DashboardTileContent item={item} onEvent={handleGridEvent} />
    ),
    [handleGridEvent],
  );

  const setResponsiveWidth = React.useCallback(
    (width: number, columns: number): void => {
      setContainerWidth(width);
      setActiveColumns(columns);
      appendEvent('container-width', {
        gridId: PRIMARY_GRID_ID,
        columns,
        width,
      });
    },
    [appendEvent],
  );

  const getHandle = React.useCallback((): DashboardGridStoryHandle | null => {
    const handle = imperativeRef.current;
    if (!handle) {
      appendEvent('handle-unavailable', { gridId: PRIMARY_GRID_ID });
    }
    return handle;
  }, [appendEvent]);

  const addItem = React.useCallback((): void => {
    const handle = getHandle();
    if (!handle) {
      return;
    }

    const index = nextDynamicItem.current++;
    const id = `dynamic-${index}`;
    const item = createDynamicItem(id, index);
    handle.addItem(item);
    lastAddedItem.current = id;
    appendEvent('toolbar-add', { gridId: PRIMARY_GRID_ID, itemId: id });
  }, [appendEvent, getHandle]);

  const removeItem = React.useCallback((): void => {
    const handle = getHandle();
    if (!handle) {
      return;
    }

    const id = lastAddedItem.current ?? 'removable';
    handle.removeItem(id);
    appendEvent('toolbar-remove', { gridId: PRIMARY_GRID_ID, itemId: id });
  }, [appendEvent, getHandle]);

  const saveLayout = React.useCallback((): void => {
    const handle = getHandle();
    if (!handle) {
      return;
    }

    const savedLayout = handle.save();
    savedLayoutRef.current = savedLayout;
    savedLastAddedItem.current = lastAddedItem.current;
    setLayoutJson(formatUnknown(savedLayout));
    appendEvent('toolbar-save', { gridId: PRIMARY_GRID_ID });
  }, [appendEvent, getHandle]);

  const restoreLayout = React.useCallback((): void => {
    const handle = getHandle();
    if (!handle || savedLayoutRef.current === undefined) {
      appendEvent('toolbar-restore-missing', { gridId: PRIMARY_GRID_ID });
      return;
    }

    handle.load(getSavedItems(savedLayoutRef.current), {
      addMissing: true,
      removeMissing: true,
    });
    lastAddedItem.current = savedLastAddedItem.current;
    appendEvent('toolbar-restore', { gridId: PRIMARY_GRID_ID });
  }, [appendEvent, getHandle]);

  const resetLayout = React.useCallback((): void => {
    const handle = getHandle();
    if (!handle) {
      return;
    }

    handle.load(DASHBOARD_ITEMS, {
      addMissing: true,
      removeMissing: true,
      sourceColumns: 12,
    });
    lastAddedItem.current = undefined;
    setLayoutJson(formatUnknown(DASHBOARD_ITEMS));
    appendEvent('toolbar-reset', { gridId: PRIMARY_GRID_ID });
  }, [appendEvent, getHandle]);

  const handleKeyDownCapture = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      const element = event.target as HTMLElement;
      const testElement = element.closest<HTMLElement>('[data-testid]');
      const target =
        testElement?.getAttribute('data-testid') ??
        element.getAttribute('data-dashboard-grid-item') ??
        element.tagName.toLowerCase();

      let mode: string | undefined;
      if (event.key === 'F2' || event.key === 'Enter' || event.key === ' ') {
        mode = 'arrange requested';
      } else if (event.key === 'Escape') {
        mode = 'cancel requested';
      } else if (event.key.startsWith('Arrow')) {
        mode = event.shiftKey ? 'resize requested' : 'move requested';
      }

      if (mode) {
        setKeyboardDiagnostics({ mode, key: event.key, target });
      }
    },
    [],
  );

  const handleProviderError = React.useCallback(
    (error: unknown): void =>
      appendEvent('provider-error', {
        gridId: 'dashboard-provider',
        reason: error instanceof Error ? error.message : String(error),
      }),
    [appendEvent],
  );

  return (
    <div
      className={styles.page}
      data-testid="dashboard-parity-playground"
      onKeyDownCapture={handleKeyDownCapture}
    >
      <div>
        <Text as="h1" size={600} weight="semibold" className={styles.heading}>
          DashboardGrid parity playground
        </Text>
        <Text>
          Uncontrolled items, imperative commands, nested and cross-grid
          composition, interactive descendants, and responsive 12 → 6 → 1 →
          12 diagnostics.
        </Text>
      </div>

      <div className={styles.toolbar} role="group" aria-label="Dashboard controls">
        <Field
          className={styles.widthField}
          label={`Container width: ${containerWidth}px`}
        >
          <Slider
            min={RESPONSIVE_WIDTHS.narrow}
            max={RESPONSIVE_WIDTHS.wide}
            step={40}
            value={containerWidth}
            data-testid="dashboard-width-slider"
            onChange={(_event, data) => {
              const width = data.value;
              const columns = width <= 480 ? 1 : width <= 840 ? 6 : 12;
              setResponsiveWidth(width, columns);
            }}
          />
        </Field>
        <Button
          data-testid="dashboard-width-wide"
          onClick={() => setResponsiveWidth(RESPONSIVE_WIDTHS.wide, 12)}
        >
          12 columns
        </Button>
        <Button
          data-testid="dashboard-width-medium"
          onClick={() => setResponsiveWidth(RESPONSIVE_WIDTHS.medium, 6)}
        >
          6 columns
        </Button>
        <Button
          data-testid="dashboard-width-narrow"
          onClick={() => setResponsiveWidth(RESPONSIVE_WIDTHS.narrow, 1)}
        >
          1 column
        </Button>
        <Button
          appearance="primary"
          data-testid="dashboard-add-item"
          onClick={addItem}
        >
          Add item
        </Button>
        <Button data-testid="dashboard-remove-item" onClick={removeItem}>
          Remove item
        </Button>
        <Button data-testid="dashboard-save-layout" onClick={saveLayout}>
          Save
        </Button>
        <Button data-testid="dashboard-restore-layout" onClick={restoreLayout}>
          Restore
        </Button>
        <Button data-testid="dashboard-reset-layout" onClick={resetLayout}>
          Reset
        </Button>
      </div>

      <output
        className={styles.diagnosticValue}
        data-testid="dashboard-active-columns"
        aria-live="polite"
      >
        {activeColumns}
      </output>

      <DashboardGridStoryProvider onError={handleProviderError}>
        <div
          className={styles.viewport}
          style={{ width: `${containerWidth}px` }}
          data-testid="dashboard-grid-viewport"
        >
          <div className={styles.gridFrame}>
            <DashboardGridStory
              aria-label="Primary dashboard grid"
              data-testid="dashboard-grid-primary"
              gridId={PRIMARY_GRID_ID}
              items={DASHBOARD_ITEMS}
              columns={12}
              responsive={DASHBOARD_RESPONSIVE_OPTIONS}
              imperativeRef={imperativeRef}
              renderItem={renderItem}
              onEvent={handleGridEvent}
            />
          </div>
        </div>

        <section className={styles.secondaryGrid}>
          <Text as="h2" size={500} weight="semibold" className={styles.heading}>
            Cross-grid transfer target
          </Text>
          <DashboardGridStory
            aria-label="Parking dashboard grid"
            data-testid="dashboard-grid-parking"
            gridId={PARKING_GRID_ID}
            items={PARKING_ITEMS}
            columns={12}
            renderItem={renderItem}
            onEvent={handleGridEvent}
          />
        </section>
      </DashboardGridStoryProvider>

      <section
        id="dashboard-diagnostics"
        className={styles.diagnostics}
        data-testid="dashboard-diagnostics"
      >
        <div className={styles.diagnosticPanel}>
          <Text
            as="h2"
            size={400}
            weight="semibold"
            className={styles.diagnosticTitle}
          >
            Keyboard Arrange mode
          </Text>
          <Text>
            Focus a tile, then use Space, Enter, or F2. Arrow keys move,
            Shift+Arrow resizes, and Escape restores the snapshot.
          </Text>
          <dl
            className={styles.diagnosticValue}
            data-testid="dashboard-arrange-diagnostics"
          >
            <dt>Mode</dt>
            <dd>{keyboardDiagnostics.mode}</dd>
            <dt>Last key</dt>
            <dd>{keyboardDiagnostics.key}</dd>
            <dt>Target</dt>
            <dd>{keyboardDiagnostics.target}</dd>
          </dl>
        </div>

        <div className={styles.diagnosticPanel}>
          <Text
            as="h2"
            size={400}
            weight="semibold"
            className={styles.diagnosticTitle}
          >
            Layout / saved state JSON
          </Text>
          <pre className={styles.code} data-testid="dashboard-layout-json">
            {layoutJson}
          </pre>
        </div>

        <div className={styles.diagnosticPanel}>
          <Text
            as="h2"
            size={400}
            weight="semibold"
            className={styles.diagnosticTitle}
          >
            Event log
          </Text>
          <ol className={styles.eventList} data-testid="dashboard-event-log">
            {eventLog.map(entry => (
              <li key={entry.sequence}>
                #{entry.sequence} {entry.name}
                {entry.sourceGridId ? ` source=${entry.sourceGridId}` : ''}
                {entry.targetGridId ? ` target=${entry.targetGridId}` : ''}
                {entry.itemId ? ` item=${entry.itemId}` : ''}
                {entry.reason ? ` reason=${entry.reason}` : ''}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

ParityPlayground.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'A shared parity fixture for manual exploration and browser smoke coverage. Items-change callbacks update diagnostics while the grid remains uncontrolled.',
    },
  },
};
