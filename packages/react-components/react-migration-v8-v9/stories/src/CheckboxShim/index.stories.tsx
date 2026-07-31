import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import descriptionMd from './Description.md';

import { Checkbox } from '@fluentui/react';
import { Checkbox as CheckboxV9 } from '@fluentui/react-components';
import { CheckboxShim } from '@fluentui/react-migration-v8-v9';

import styles from './index.module.css';

export const Default = (): JSXElement => {
  return (
    <div className={styles.root}>
      <h3>v8</h3>
      <h3>shim</h3>
      <h3>v9</h3>
      <Checkbox label="checkbox" required={true} />
      <CheckboxShim label="checkbox" required={true} />
      <CheckboxV9 label="checkbox" required={true} />
    </div>
  );
};

export default {
  title: 'Migration Shims/V8/CheckboxShim',
  component: CheckboxShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
