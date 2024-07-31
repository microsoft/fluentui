import * as React from 'react';
import descriptionMd from './Description.md';
import { Loader, Provider, teamsTheme } from '@fluentui/react-northstar';
import { makeStyles, Spinner } from '@fluentui/react-components';
import { spinner } from '@fluentui/react-migration-v0-v9';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  inline: {
    ...spinner.v0Inline(),
  },
  label: {
    ...spinner.v0SpinnerLabelStyle(),
  },
});

export const Inline = () => {
  const styles = useStyles();

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

export const Label = () => {
  const styles = useStyles();

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
