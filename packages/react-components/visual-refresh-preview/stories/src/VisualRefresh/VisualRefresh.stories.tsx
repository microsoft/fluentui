import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button } from '@fluentui/react-components';
import { TEAMS_VISUAL_REFRESH_TOKENS, VisualRefreshContext } from '@fluentui/visual-refresh-preview';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

const VisualRefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = TEAMS_VISUAL_REFRESH_TOKENS;
  const customProperties: Record<string, string> = {};
  for (const key of Object.keys(theme) as Array<keyof typeof theme>) {
    customProperties[`--visual-refresh-${key}`] = theme[key];
  }
  return (
    <VisualRefreshContext.Provider value={true}>
      <div style={customProperties as React.CSSProperties}>{children}</div>
    </VisualRefreshContext.Provider>
  );
};

const VisualRefreshPreview = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>{children}</div>
      <hr style={{ width: '100%' }} />
      <div>
        <h3>Visual Refresh Theme</h3>
        <VisualRefreshProvider>{children}</VisualRefreshProvider>
      </div>
    </div>
  );
};

const ButtonExamples = () => {
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      <Button>Rounded</Button>
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
