import * as React from 'react';
import {
  DashboardGrid,
  DashboardGridDragSource,
  DashboardGridDropZone,
  DashboardGridProvider,
} from '@fluentui/react-dashboard-grid-preview';
import { Text, makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalL,
  },
  grid: {
    inlineSize: '480px',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  scrollViewport: {
    inlineSize: '480px',
    blockSize: '220px',
    overflowY: 'auto',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  transformHost: {
    inlineSize: '480px',
    transform: 'scale(0.8)',
    transformOrigin: 'top left',
  },
  dropZone: {
    minInlineSize: '160px',
    minBlockSize: '80px',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    border: `${tokens.strokeWidthThick} dashed ${tokens.colorNeutralStroke2}`,
  },
  source: {
    display: 'inline-flex',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  tile: {
    boxSizing: 'border-box',
    blockSize: '100%',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
});

const BrowserTile = (props: { id: string }): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.tile} data-testid={`browser-tile-${props.id}`}>
      {props.id}
    </div>
  );
};

export const BrowserInteractions = (): JSXElement => {
  const styles = useStyles();
  const renderTile = React.useCallback((item: { id: string }) => <BrowserTile id={item.id} />, []);

  return (
    <div className={styles.page} data-testid="dashboard-browser-coverage">
      <DashboardGridProvider>
        <div className={styles.row}>
          <DashboardGridDragSource
            id="browser-external-source"
            className={styles.source}
            label="Add external tile"
            descriptor={{ id: 'external', columnSpan: 1, rowSpan: 1 }}
            preview={<span>External tile preview</span>}
          >
            Add external tile
          </DashboardGridDragSource>
          <DashboardGridDropZone
            id="browser-trash"
            kind="remove"
            className={styles.dropZone}
            label="Remove tile"
            data-testid="dashboard-browser-trash"
          >
            Trash
          </DashboardGridDropZone>
        </div>

        <div className={styles.row}>
          <DashboardGrid
            aria-label="Pointer source grid"
            className={styles.grid}
            data-testid="dashboard-browser-source-grid"
            gridId="browser-source"
            columns={4}
            rowHeight={80}
            minRows={4}
            resize={{ handles: 'all', handleVisibility: 'always' }}
            defaultItems={[
              { id: 'pointer', label: 'Pointer tile', column: 0, row: 0 },
              { id: 'pen', label: 'Pen tile', column: 2, row: 0 },
              { id: 'cross', label: 'Cross-grid tile', column: 0, row: 2 },
              { id: 'trash', label: 'Trash tile', column: 2, row: 2 },
            ]}
            renderItem={renderTile}
          />
          <DashboardGrid
            aria-label="Pointer target grid"
            className={styles.grid}
            data-testid="dashboard-browser-target-grid"
            gridId="browser-target"
            columns={4}
            rowHeight={80}
            minRows={2}
            acceptExternal
            defaultItems={[]}
            renderItem={renderTile}
          />
        </div>

        <Text weight="semibold">Transformed geometry</Text>
        <div className={styles.transformHost} data-testid="dashboard-browser-transform-host">
          <DashboardGrid
            aria-label="Transformed grid"
            className={styles.grid}
            data-testid="dashboard-browser-transformed-grid"
            gridId="browser-transformed"
            columns={4}
            rowHeight={80}
            minRows={2}
            defaultItems={[{ id: 'transformed', label: 'Transformed tile', column: 0, row: 0 }]}
            renderItem={renderTile}
          />
        </div>

        <Text weight="semibold">Scrollable grid</Text>
        <div className={styles.scrollViewport} data-testid="dashboard-browser-scroll-viewport">
          <DashboardGrid
            aria-label="Scrollable grid"
            data-testid="dashboard-browser-scroll-grid"
            gridId="browser-scroll"
            columns={4}
            rowHeight={80}
            minRows={12}
            float
            defaultItems={[
              { id: 'scroll', label: 'Autoscroll tile', column: 0, row: 0 },
              { id: 'scroll-spacer', label: 'Scroll spacer', column: 3, row: 10 },
            ]}
            renderItem={renderTile}
          />
        </div>

        <Text weight="semibold">RTL grid</Text>
        <DashboardGrid
          aria-label="RTL grid"
          className={styles.grid}
          data-testid="dashboard-browser-rtl-grid"
          gridId="browser-rtl"
          direction="rtl"
          columns={4}
          rowHeight={80}
          minRows={2}
          defaultItems={[{ id: 'rtl', label: 'RTL tile', column: 0, row: 0 }]}
          renderItem={renderTile}
        />
      </DashboardGridProvider>
    </div>
  );
};

BrowserInteractions.parameters = {
  layout: 'fullscreen',
};
