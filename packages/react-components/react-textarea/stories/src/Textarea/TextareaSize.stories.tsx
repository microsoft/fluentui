import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Textarea } from '@fluentui/react-components';

import styles from './TextareaSize.module.css';

export const Size = (): JSXElement => {
  return (
    <div className={styles.base}>
      <Field size="small" label="Small Textarea">
        <Textarea />
      </Field>

      <Field size="medium" label="Medium Textarea">
        <Textarea />
      </Field>

      <Field size="large" label="Large Textarea">
        <Textarea />
      </Field>
    </div>
  );
};
