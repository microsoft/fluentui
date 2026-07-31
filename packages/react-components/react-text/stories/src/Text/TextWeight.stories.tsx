import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

import styles from './TextWeight.module.css';

export const Weight = (): JSXElement => {
  return (
    <div className={styles.container}>
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  );
};
