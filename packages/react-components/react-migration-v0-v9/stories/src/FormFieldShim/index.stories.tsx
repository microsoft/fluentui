import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import descriptionMd from './Description.md';

import { FormField, Input, Provider, teamsTheme } from '@fluentui/react-northstar';
import { Field } from '@fluentui/react-components';
import { FormFieldShim } from '@fluentui/react-migration-v0-v9';

import styles from './index.module.css';

export const Default = (): JSXElement => {
  return (
    <div className={styles.root}>
      <h3>v0</h3>
      <h3>shim</h3>
      <h3>v9</h3>
      <Provider theme={teamsTheme}>
        <FormField>
          <Input />
        </FormField>
      </Provider>
      <Provider theme={teamsTheme}>
        <FormFieldShim required>
          <Input />
        </FormFieldShim>
      </Provider>
      <Field>
        <Input />
      </Field>
    </div>
  );
};

export default {
  title: 'Migration Shims/V0/FormFieldShim',
  component: FormFieldShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
