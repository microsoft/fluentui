import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Divider } from '../Divider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const Appearance = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider>(default)</Divider>
      </div>
      <div className={styles.example}>
        <Divider appearance="subtle">subtle</Divider>
      </div>
      <div className={styles.example}>
        <Divider appearance="brand">brand</Divider>
      </div>
      <div className={styles.example}>
        <Divider appearance="strong">strong</Divider>
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'A divider can have its line inset from the edges of its container.',
    },
  },
};
