import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CompoundButton } from '@fluentui/react-components';

import styles from './CompoundButtonShape.module.css';

export const Shape = (): JSXElement => {
  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content">Rounded</CompoundButton>
      <CompoundButton secondaryContent="Secondary content" shape="circular">
        Circular
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" shape="square">
        Square
      </CompoundButton>
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'A compound button can be rounded, circular, or square.',
    },
  },
};
