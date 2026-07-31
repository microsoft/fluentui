import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

import styles from './TextSize.module.css';

export const Size = (): JSXElement => {
  return (
    <div className={styles.container}>
      <Text size={100}>100</Text>
      <Text size={200}>200</Text>
      <Text size={300}>300</Text>
      <Text size={400}>400</Text>
      <Text size={500}>500</Text>
      <Text size={600}>600</Text>
      <Text size={700}>700</Text>
      <Text size={800}>800</Text>
      <Text size={900}>900</Text>
      <Text size={1000}>1000</Text>
    </div>
  );
};
