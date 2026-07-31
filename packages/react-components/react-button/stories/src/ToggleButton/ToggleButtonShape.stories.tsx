import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ToggleButton } from '@fluentui/react-components';

import styles from './ToggleButtonShape.module.css';

export const Shape = (): JSXElement => {
  return (
    <div className={styles.wrapper}>
      <ToggleButton>Rounded</ToggleButton>
      <ToggleButton shape="circular">Circular</ToggleButton>
      <ToggleButton shape="square">Square</ToggleButton>
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'A toggle button can be rounded, circular, or square.',
    },
  },
};
