import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import descriptionMd from './Description.md';
import { Loader, Provider, teamsTheme } from '@fluentui/react-northstar';
import { Spinner } from '@fluentui/react-components';

import styles from './index.module.css';

export const Inline = (): JSXElement => {
  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <div>
          <Loader inline />
          <Loader inline />
        </div>
      </div>

      <div>
        <h3>V9 With mixin</h3>
        <div>
          <Spinner className={styles.inline} />
          <Spinner className={styles.inline} />
        </div>
      </div>
    </Provider>
  );
};

export const Label = (): JSXElement => {
  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Loader label="Loading..." />
      </div>

      <div>
        <h3>V9 With mixin</h3>
        <Spinner className={styles.label} labelPosition="below" label="Loading..." />
      </div>
    </Provider>
  );
};

export default {
  title: 'Migration Shims/V0/SpinnerMixins',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
