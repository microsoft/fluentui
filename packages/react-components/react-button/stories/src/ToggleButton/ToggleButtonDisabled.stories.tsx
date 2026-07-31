import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ToggleButton } from '@fluentui/react-components';

import styles from './ToggleButtonDisabled.module.css';

export const Disabled = (): JSXElement => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <ToggleButton>Enabled state</ToggleButton>
        <ToggleButton disabled>Disabled state</ToggleButton>
        <ToggleButton disabledFocusable>Disabled focusable state</ToggleButton>
      </div>
      <div className={styles.innerWrapper}>
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
