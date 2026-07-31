import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import styles from './Example.module.css';

export const Example = (): JSXElement => {
  return <span className={styles.text}>Text using tokens</span>;
};
