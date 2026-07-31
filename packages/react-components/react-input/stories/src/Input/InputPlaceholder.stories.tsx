import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Input, Label } from '@fluentui/react-components';

import styles from './InputPlaceholder.module.css';

export const Placeholder = (): JSXElement => {
  const inputId = useId('input-with-placeholder');

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId}>Input with a placeholder</Label>
      <Input placeholder="This is a placeholder" id={inputId} />
    </div>
  );
};

Placeholder.parameters = {
  docs: {
    description: {
      story:
        'An input can have placeholder text. If using the placeholder as a label (which is not ' +
        'recommended for usability), be sure to provide an `aria-label` for screen reader users.',
    },
  },
};
