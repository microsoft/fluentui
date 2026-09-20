import * as React from 'react';

import { CompoundButton } from '@fluentui/react-modern-components-preview/compound-button';

const styles = {
  innerWrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
} satisfies Record<string, React.CSSProperties>;

export const Disabled = (): React.ReactNode => (
  <div style={styles.outerWrapper}>
    <div style={styles.innerWrapper}>
      <CompoundButton secondaryContent="Secondary content">Enabled state</CompoundButton>
      <CompoundButton disabled secondaryContent="Secondary content">
        Disabled state
      </CompoundButton>
      <CompoundButton disabledFocusable secondaryContent="Secondary content">
        Disabled focusable state
      </CompoundButton>
    </div>
    <div style={styles.innerWrapper}>
      <CompoundButton appearance="primary" secondaryContent="Secondary content">
        Enabled state
      </CompoundButton>
      <CompoundButton appearance="primary" disabled secondaryContent="Secondary content">
        Disabled state
      </CompoundButton>
      <CompoundButton appearance="primary" disabledFocusable secondaryContent="Secondary content">
        Disabled focusable state
      </CompoundButton>
    </div>
  </div>
);

Disabled.parameters = {
  docs: {
    description: {
      story: `A compound button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled compound button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
