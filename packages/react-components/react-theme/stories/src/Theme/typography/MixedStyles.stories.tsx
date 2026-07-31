import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

import styles from './MixedStyles.module.css';

export const MixedStyles = (): JSXElement => {
  return (
    <div>
      <Text as="h1" block className={styles.title}>
        Using Title 2 tokens
      </Text>

      <Text as="p" block className={styles.paragraph}>
        I'm a paragraph using Body 1 tokens and customized styles
      </Text>
    </div>
  );
};
