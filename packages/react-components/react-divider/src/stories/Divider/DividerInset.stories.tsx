import * as React from 'react';
import { makeStyles, tokens, Divider } from '@fluentui/react-components';

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

export const Inset = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider inset />
      </div>
      <div className={styles.example}>
        <Divider inset>Text</Divider>
      </div>
      <div className={styles.example}>
        <Divider inset vertical style={{ height: '100%' }} />
      </div>
      <div className={styles.example}>
        <Divider inset vertical style={{ height: '100%' }}>
          Text
        </Divider>
      </div>
    </div>
  );
};

Inset.parameters = {
  docs: {
    description: {
      story: 'A divider can have its line inset from the edges of its container.',
    },
  },
};
