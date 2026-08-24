import * as React from 'react';
import {
  DashboardGrid,
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
  grid: {
    inlineSize: 'min(480px, 100%)',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  portal: {
    minBlockSize: tokens.spacingVerticalXXL,
    border: `${tokens.strokeWidthThick} dashed ${tokens.colorNeutralStroke2}`,
  },
  tile: {
    boxSizing: 'border-box',
    blockSize: '100%',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
});

const PreviewTile = (props: { id: string }): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.tile} data-testid={`dashboard-preview-tile-${props.id}`}>
      {props.id}
    </div>
  );
};

export const DragPreviews = (): JSXElement => {
  const styles = useStyles();
  const [customPortal, setCustomPortal] =
    React.useState<HTMLDivElement | null>(null);
  const renderTile = React.useCallback(
    (item: { id: string }) => <PreviewTile id={item.id} />,
    [],
  );

  return (
    <div className={styles.page} data-testid="dashboard-drag-previews">
      <DashboardGridProvider>
        <Text weight="semibold">Original item preview</Text>
        <DashboardGrid
          aria-label="Original item preview grid"
          className={styles.grid}
          data-testid="dashboard-preview-original-grid"
          gridId="preview-original"
          columns={4}
          rowHeight={80}
          minRows={2}
          drag={{ preview: 'item', portal: 'body' }}
          defaultItems={[
            {
              id: 'preview-original',
              label: 'Original preview tile',
              column: 0,
              row: 0,
            },
          ]}
          renderItem={renderTile}
        />

        <Text weight="semibold">Clone preview in the item parent</Text>
        <DashboardGrid
          aria-label="Clone preview grid"
          className={styles.grid}
          data-testid="dashboard-preview-clone-grid"
          gridId="preview-clone"
          columns={4}
          rowHeight={80}
          minRows={2}
          drag={{ preview: 'clone', portal: 'parent' }}
          defaultItems={[
            {
              id: 'preview-clone',
              label: 'Clone preview tile',
              column: 0,
              row: 0,
            },
          ]}
          renderItem={renderTile}
        />

        <Text weight="semibold">Custom preview in an explicit portal</Text>
        <div
          ref={setCustomPortal}
          className={styles.portal}
          data-testid="dashboard-preview-custom-portal"
        />
        {customPortal ? (
          <DashboardGrid
            aria-label="Custom preview grid"
            className={styles.grid}
            data-testid="dashboard-preview-custom-grid"
            gridId="preview-custom"
            columns={4}
            rowHeight={80}
            minRows={2}
            drag={{
              preview: item => (
                <div data-testid="dashboard-custom-drag-preview">
                  Custom preview for {item.id}
                </div>
              ),
              portal: customPortal,
            }}
            defaultItems={[
              {
                id: 'preview-custom',
                label: 'Custom preview tile',
                column: 0,
                row: 0,
              },
            ]}
            renderItem={renderTile}
          />
        ) : null}
      </DashboardGridProvider>
    </div>
  );
};

DragPreviews.parameters = {
  layout: 'fullscreen',
};
