import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ToggleButton } from '@fluentui/react-components';

import styles from './ToggleButtonWithLongText.module.css';

export const WithLongText = (): JSXElement => {
  return (
    <div className={styles.wrapper}>
      <ToggleButton>Short text</ToggleButton>
      <ToggleButton className={styles.longText}>
        Long text wraps after it hits the max width of the component
      </ToggleButton>
    </div>
  );
};

WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text wraps after it hits the max width of the component.',
    },
  },
};
