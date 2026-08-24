import * as React from 'react';
import { Button, Text, makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

import {
  DashboardGridStory,
  DashboardGridStoryProvider,
  type DashboardGridStoryItemDefinition,
} from './DashboardGridStoryAdapter';
import { DashboardTileContent, PRINT_GRID_ID, PRINT_ITEMS } from './DashboardGridStoryFixtures';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  heading: {
    marginBlock: 0,
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    '@media print': {
      display: 'none',
    },
  },
  mode: {
    fontFamily: tokens.fontFamilyMonospace,
  },
});

export const Print = (): JSXElement => {
  const styles = useStyles();
  const [printMode, setPrintMode] = React.useState<'flow' | 'exact'>('exact');
  const renderItem = React.useCallback(
    (item: DashboardGridStoryItemDefinition) => <DashboardTileContent item={item} />,
    [],
  );

  return (
    <main className={styles.page} data-testid="dashboard-print-story">
      <Text as="h1" size={600} weight="semibold" className={styles.heading}>
        DashboardGrid print validation
      </Text>
      <div className={styles.controls} data-testid="dashboard-print-controls">
        <Text>Print mode:</Text>
        <Button
          appearance={printMode === 'flow' ? 'primary' : 'secondary'}
          data-testid="dashboard-print-flow"
          onClick={() => setPrintMode('flow')}
        >
          Flow
        </Button>
        <Button
          appearance={printMode === 'exact' ? 'primary' : 'secondary'}
          data-testid="dashboard-print-exact"
          onClick={() => setPrintMode('exact')}
        >
          Exact
        </Button>
        <output className={styles.mode} data-testid="dashboard-print-mode">
          {printMode}
        </output>
      </div>

      <DashboardGridStoryProvider>
        <DashboardGridStory
          aria-label="Printable dashboard grid"
          data-testid="dashboard-grid-print"
          gridId={PRINT_GRID_ID}
          items={PRINT_ITEMS}
          columns={12}
          printMode={printMode}
          renderItem={renderItem}
        />
      </DashboardGridStoryProvider>
    </main>
  );
};

Print.parameters = {
  layout: 'fullscreen',
};
