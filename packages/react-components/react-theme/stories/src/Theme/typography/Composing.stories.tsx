import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  text: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightBase600,
  },
});

export const Composing = (): JSXElement => {
  const styles = useStyles();

  return <span className={styles.text}>Custom text using only tokens</span>;
};
