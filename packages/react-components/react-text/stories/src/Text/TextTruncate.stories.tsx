import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

import styles from './TextTruncate.module.css';

export const Truncate = (): JSXElement => {
  return (
    <Text truncate wrap={false} className={styles.text}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere aliquam nisi numquam, fugit recusandae eligendi
      aspernatur odio minus? Incidunt maxime ipsam dolorem quia quas aliquam, quasi consequatur! Ea, minus eaque.
    </Text>
  );
};
