/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Button } from '@fluentui/react-button';
import { makeStyles } from '@fluentui/react-platform-adapter-preview';

const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
  },
});

export const WithLongText = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Button>Short text</Button>
      <Button className={styles.longText}>Long text wraps after it hits the max width of the component</Button>
    </div>
  );
};
