import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import descriptionMd from './Description.md';
import { Input, Provider, teamsTheme } from '@fluentui/react-northstar';
import { Input as V9Input, Label } from '@fluentui/react-components';
import { ErrorCircleFilled } from '@fluentui/react-icons';

import styles from './index.module.css';

export const Fluid = (): JSXElement => {
  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Input label="Name" fluid />
      </div>

      <div>
        <h3>With Mixin</h3>
        <div className={styles.field}>
          <Label htmlFor="name">Name</Label>
          <V9Input id="name" className={styles.fluid} />
        </div>
      </div>
    </Provider>
  );
};

export const Error = (): JSXElement => {
  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Input label="Surname" error />
      </div>

      <div>
        <h3>With Mixin</h3>
        <div className={styles.field}>
          <Label htmlFor="surname">Surname</Label>
          <V9Input
            id="surname"
            contentAfter={<ErrorCircleFilled className={styles.errorIndicator} />}
            aria-invalid={true}
          />
        </div>
      </div>
    </Provider>
  );
};

export default {
  title: 'Migration Shims/V0/InputMixins',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
