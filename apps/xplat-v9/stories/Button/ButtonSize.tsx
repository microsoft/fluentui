/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Button } from '@fluentui/react-button';
import { makeStyles } from '@fluentui/react-platform-adapter-preview';

const useStyles = makeStyles({
  innerWrapper: {
    // alignItems: 'start',
    columnGap: '15px',
    display: 'flex',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
});

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <Button size="small">Small</Button>
      </div>
      <div className={styles.innerWrapper}>
        <Button>Medium</Button>
      </div>
      <div className={styles.innerWrapper}>
        <Button size="large">Large</Button>
      </div>
    </div>
  );
};
