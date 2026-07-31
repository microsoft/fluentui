import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ToggleButton } from '@fluentui/react-components';

import styles from './ToggleButtonSize.module.css';

export const Size = (): JSXElement => {
  return (
    <div className={styles.wrapper}>
      <ToggleButton size="small">Size: small</ToggleButton>
      <ToggleButton size="medium">Size: medium</ToggleButton>
      <ToggleButton size="large">Size: large</ToggleButton>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A toggle button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
