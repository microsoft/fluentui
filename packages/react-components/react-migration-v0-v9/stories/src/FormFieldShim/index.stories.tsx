import * as React from 'react';

import descriptionMd from './Description.md';

import { FormField, Input, Provider, teamsTheme } from '@fluentui/react-northstar';
import { Field, makeStyles } from '@fluentui/react-components';
import { FormFieldShim } from '@fluentui/react-migration-v0-v9';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateRows: '1fr',
    width: 'fit-content',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    columnGap: '10px',
    rowGap: '10px',
  },
  componentName: {
    justifySelf: 'end',
    margin: '0 10px 0 0',
  },
});

export const Default = () => {
  const styles = useStyles();

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
