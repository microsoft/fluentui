import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';

import styles from './ButtonWithLongText.module.css';

export const WithLongText = (): JSXElement => {
  return (
    <div className={styles.wrapper}>
      <Button>Short text</Button>
      <Button className={styles.longText}>Long text wraps after it hits the max width of the component</Button>
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
