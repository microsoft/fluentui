import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button } from '@fluentui/react-components';
import {
  sanitizeTokenName,
  TEAMS_VISUAL_REFRESH_THEME,
  TEAMS_VISUAL_REFRESH_TOKENS,
  VisualRefreshContext,
} from '@fluentui/visual-refresh-preview';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 'min-content',
  },
});

const VisualRefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = TEAMS_VISUAL_REFRESH_TOKENS;
  const customProperties: Record<string, string> = {};
  for (const key of Object.keys(theme) as Array<keyof typeof theme>) {
    customProperties[`--visual-refresh-${key}`] = theme[key];
  }
  for (const key of Object.keys(TEAMS_VISUAL_REFRESH_THEME) as Array<keyof typeof theme>) {
    customProperties[`--${sanitizeTokenName(key)}`] = TEAMS_VISUAL_REFRESH_THEME[key];
  }
  return (
    <VisualRefreshContext.Provider value={true}>
      <div style={customProperties as React.CSSProperties}>{children}</div>
    </VisualRefreshContext.Provider>
  );
};

const VisualRefreshPreview = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
      <div>
        <h3>V9 Theme</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
      </div>
      <div>
        <h3>Visual Refresh Theme</h3>
        <VisualRefreshProvider>
          <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
        </VisualRefreshProvider>
      </div>
    </div>
  );
};

const ButtonExamples = () => {
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      <Button>Default</Button>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button shape="circular">Circular</Button>
      <Button shape="square">Square</Button>
      <Button icon={<CalendarMonthRegular />}>Default</Button>
      <Button appearance="primary" icon={<CalendarMonthRegular />}>
        Primary
      </Button>
      <Button appearance="outline" icon={<CalendarMonth />}>
        Outline
      </Button>
      <Button appearance="subtle" icon={<CalendarMonth />}>
        Subtle
      </Button>
      <Button appearance="transparent" icon={<CalendarMonth />}>
        Transparent
      </Button>
    </div>
  );
};

export const VisualRefresh = (): JSXElement => {
  return (
    <VisualRefreshPreview>
      <ButtonExamples />
    </VisualRefreshPreview>
  );
};

VisualRefresh.parameters = {
  docs: {
    description: {
      story: 'A button can be rounded, circular, or square.',
    },
  },
};
