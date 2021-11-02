import * as React from 'react';
import { makeStyles } from '../index';

const useStyles = makeStyles({
  root: {
    position: 'sticky',
    top: 0,
    padding: '5px',
  },
});

/**
 * Sticky header over the entire docs page
 */
export const FluentDocsHeader = () => {
  const styles = useStyles();
  return <div className={styles.root}>{/** TODO add theme+version picker */}</div>;
};
