import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CompoundButton } from '@fluentui/react-components';

import styles from './CompoundButtonDisabled.module.css';

export const Disabled = (): JSXElement => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <CompoundButton secondaryContent="Secondary content">Enabled state</CompoundButton>
        <CompoundButton disabled secondaryContent="Secondary content">
          Disabled state
        </CompoundButton>
        <CompoundButton disabledFocusable secondaryContent="Secondary content">
          Disabled focusable state
        </CompoundButton>
      </div>
      <div className={styles.innerWrapper}>
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
};

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
