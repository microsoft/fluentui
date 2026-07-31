import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CompoundButton } from '@fluentui/react-components';

import styles from './CompoundButtonWithLongText.module.css';

export const WithLongText = (): JSXElement => {
  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content">Short text</CompoundButton>
      <CompoundButton className={styles.longText} secondaryContent="Secondary content">
        Long text wraps after it hits the max width of the component
      </CompoundButton>
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
