import * as React from 'react';
import {} from '@fluentui/react-components';
import { ToggleButton } from '@fluentui/react-modern-components-preview/toggle-button';

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
} as const;

export const Disabled = (): React.ReactNode => {
  return (
    <div style={styles.outerWrapper}>
      <div style={styles.innerWrapper}>
        <ToggleButton>Enabled state</ToggleButton>
        <ToggleButton disabled>Disabled state</ToggleButton>
        <ToggleButton disabledFocusable>Disabled focusable state</ToggleButton>
      </div>
      <div style={styles.innerWrapper}>
        <ToggleButton appearance="primary">Enabled state</ToggleButton>
        <ToggleButton appearance="primary" disabled>
          Disabled state
        </ToggleButton>
        <ToggleButton appearance="primary" disabledFocusable>
          Disabled focusable state
        </ToggleButton>
      </div>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `A toggle button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled toggle button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
