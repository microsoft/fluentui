import * as React from 'react';
import descriptionMd from './Description.md';
import { Input, Provider, teamsTheme } from '@fluentui/react-northstar';
import { Input as V9Input, Label } from '@fluentui/react-components';
import { ErrorCircleFilled } from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-components';
import { input } from '@fluentui/react-migration-v0-v9';

const useStyles = makeStyles({
  root: {
    width: 'block',
  },
  fluid: {
    ...input.fluid(),
  },
  errorIndicator: {
    ...input.errorIndicator(),
    fontSize: '16px',
  },
  field: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    gap: '2px',
  },
});

export const Fluid = () => {
  const styles = useStyles();

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

export const Error = () => {
  const styles = useStyles();

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
