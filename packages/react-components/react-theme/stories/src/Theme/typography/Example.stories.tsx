import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, typographyStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  text: typographyStyles.title2,
});

export const Example = (): JSXElement => {
  const styles = useStyles();

  return <span className={styles.text}>Text using tokens</span>;
};
