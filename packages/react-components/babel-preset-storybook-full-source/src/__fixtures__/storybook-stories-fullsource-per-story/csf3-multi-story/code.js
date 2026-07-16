import * as React from 'react';
import { Button, makeStyles } from '@fluentui/react-button';
import { Spinner } from '@fluentui/react-menu';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: '8px',
  },
});

const meta = {
  title: 'Button',
  component: Button,
};

export default meta;

// Uses `useStyles` + `Button` — must NOT include `Spinner`.
export const Primary = {
  render: () => {
    const styles = useStyles();
    return (
      <div className={styles.root}>
        <Button appearance="primary">Primary</Button>
      </div>
    );
  },
};

// Uses `Spinner` only — must NOT include `useStyles`/`makeStyles`/`Button`.
export const Loading = {
  render: () => <Spinner label="Loading" />,
};

// Uses everything — the full slice.
export const Group = {
  render: () => {
    const styles = useStyles();
    return (
      <div className={styles.root}>
        <Button>One</Button>
        <Spinner label="Loading" />
      </div>
    );
  },
};
