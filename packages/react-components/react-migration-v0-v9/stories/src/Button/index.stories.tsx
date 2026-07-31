import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import descriptionMd from './Description.md';
import { Button, Provider, teamsTheme } from '@fluentui/react-northstar';
import { Button as V9Button } from '@fluentui/react-components';
import { CalendarIcon } from '@fluentui/react-icons-northstar';

import styles from './index.module.css';

export const DisabledCursor = (): JSXElement => {
  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Button disabled>Button</Button>
      </div>

      <div>
        <h3>V9 With mixin</h3>
        <V9Button className={styles.disabledCursor}>Button</V9Button>
      </div>
    </Provider>
  );
};

export const Icon = (): JSXElement => {
  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Button icon={<CalendarIcon />} iconPosition="before" content="Button" />
      </div>

      <div>
        <h3>V9 With mixin</h3>
        <V9Button className={styles.v0IconStyle} icon={<CalendarIcon />}>
          Button
        </V9Button>
      </div>
    </Provider>
  );
};

export default {
  title: 'Migration Shims/V0/ButtonMixins',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
