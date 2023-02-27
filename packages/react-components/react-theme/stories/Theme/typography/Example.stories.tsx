import * as React from 'react';
import { makeStyles, typographyStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  text: typographyStyles.title2,
});

export const Example = () => {
  const styles = useStyles();

  return <span className={styles.text}>Text using tokens</span>;
};
