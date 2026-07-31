import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, SearchBox } from '@fluentui/react-components';

import styles from './SearchBoxSize.module.css';

export const Size = (): JSXElement => {
  return (
    <div className={styles.root}>
      <Field className={styles.fieldWrapper} label="Small SearchBox">
        <SearchBox size="small" />
      </Field>

      <Field className={styles.fieldWrapper} label="Medium SearchBox">
        <SearchBox size="medium" />
      </Field>

      <Field className={styles.fieldWrapper} label="Large SearchBox">
        <SearchBox size="large" />
      </Field>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A SearchBox can have different sizes.',
    },
  },
};
