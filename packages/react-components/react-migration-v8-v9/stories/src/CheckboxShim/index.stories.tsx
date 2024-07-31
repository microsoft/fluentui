import * as React from 'react';

import descriptionMd from './Description.md';

import { Checkbox } from '@fluentui/react';
import { Checkbox as CheckboxV9, makeStyles } from '@fluentui/react-components';
import { CheckboxShim } from '@fluentui/react-migration-v8-v9';

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
