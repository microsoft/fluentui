import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, SearchBox } from '@fluentui/react-components';

import styles from './SearchBoxAppearance.module.css';

export const Appearance = (): JSXElement => {
  return (
    <div className={styles.base}>
      <Field className={styles.fieldWrapper} label="Outline appearance (default)">
        <SearchBox appearance="outline" />
      </Field>

      <Field className={styles.fieldWrapper} label="Underline appearance">
        <SearchBox appearance="underline" />
      </Field>

      <Field
        className={`${styles.fieldWrapper} ${styles.filledLighter}`}
        label={{ children: 'Filled lighter appearance', className: styles.filledLighterLabel }}
      >
        <SearchBox appearance="filled-lighter" />
      </Field>

      <Field
        className={`${styles.fieldWrapper} ${styles.filledDarker}`}
        label={{ children: 'Filled darker appearance', className: styles.filledDarkerLabel }}
      >
        <SearchBox appearance="filled-darker" />
      </Field>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A SearchBox can have different appearances.\n' +
        `The colors adjacent to the SearchBox should have a sufficient contrast. Particularly, the color of SearchBox with
      filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
      surrounding color to pass accessibility requirements.`,
    },
  },
};
