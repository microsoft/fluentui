import * as React from 'react';
import {
  RendererProvider,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import { createPortal } from 'react-dom';

import {
  DashboardGridStory,
  DashboardGridStoryProvider,
  type DashboardGridStoryItemDefinition,
} from './DashboardGridStoryAdapter';
import {
  DashboardTileContent,
  SHADOW_GRID_ID,
  SHADOW_ITEMS,
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
  host: {
    display: 'block',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

type ShadowBoundaryProps = Readonly<{
  children: React.ReactNode;
}>;

const ShadowBoundary = ({ children }: ShadowBoundaryProps): JSXElement => {
  const styles = useStyles();
  const hostRef = React.useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = React.useState<ShadowRoot | null>(null);

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    setShadowRoot(host.shadowRoot ?? host.attachShadow({ mode: 'open' }));
  }, []);

  const renderer = React.useMemo(
    () => (shadowRoot ? createShadowDOMRenderer(shadowRoot) : null),
    [shadowRoot],
  );

  return (
    <>
      <div
        ref={hostRef}
        className={styles.host}
        data-testid="dashboard-shadow-host"
      />
      {shadowRoot && renderer
        ? createPortal(
            <RendererProvider renderer={renderer}>
              <div data-testid="dashboard-shadow-surface">{children}</div>
            </RendererProvider>,
            shadowRoot,
          )
        : null}
    </>
  );
};

export const ShadowDom = (): JSXElement => {
  const styles = useStyles();
  const renderItem = React.useCallback(
    (item: DashboardGridStoryItemDefinition) => (
      <DashboardTileContent item={item} />
    ),
    [],
  );

  return (
    <div className={styles.page} data-testid="dashboard-shadow-story">
      <Text as="h1" size={600} weight="semibold" className={styles.heading}>
        DashboardGrid in an open Shadow DOM
      </Text>
      <Text>
        The grid is portalled into an open shadow root so composed-path event
        handling and owner-document behavior can be validated in every browser.
      </Text>
      <ShadowBoundary>
        <DashboardGridStoryProvider>
          <DashboardGridStory
            aria-label="Shadow DOM dashboard grid"
            data-testid="dashboard-grid-shadow"
            gridId={SHADOW_GRID_ID}
            items={SHADOW_ITEMS}
            columns={12}
            renderItem={renderItem}
          />
        </DashboardGridStoryProvider>
      </ShadowBoundary>
    </div>
  );
};

ShadowDom.parameters = {
  layout: 'fullscreen',
};
