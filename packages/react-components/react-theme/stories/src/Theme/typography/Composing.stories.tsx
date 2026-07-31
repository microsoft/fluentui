import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import styles from './Composing.module.css';

export const Composing = (): JSXElement => {
  return <span className={styles.text}>Custom text using only tokens</span>;
};
