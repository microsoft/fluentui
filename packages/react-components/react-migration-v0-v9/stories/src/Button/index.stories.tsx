import * as React from 'react';
import descriptionMd from './Description.md';
import { Button, Provider, teamsTheme } from '@fluentui/react-northstar';
import { makeStyles, Button as V9Button } from '@fluentui/react-components';
import { CalendarIcon } from '@fluentui/react-icons-northstar';
import * as buttonMigrationStyles from '@fluentui/react-migration-v0-v9';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  disabledCursor: {
    ...buttonMigrationStyles.v9DisabledCursor(),
  },
  v0IconStyle: {
    ...buttonMigrationStyles.v0Icon(),
  },
});

export const DisabledCursor = () => {
  const styles = useStyles();

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

export const Icon = () => {
  const styles = useStyles();

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
