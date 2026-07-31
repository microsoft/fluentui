import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

import styles from './TextFont.module.css';

export const Font = (): JSXElement => {
  return (
    <div className={styles.container}>
      <Text font="base">This is the default font</Text>
      <Text font="numeric">This is numeric font</Text>
      <Text font="monospace">This is monospace font</Text>
    </div>
  );
};
