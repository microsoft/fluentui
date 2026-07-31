import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Input, Label } from '@fluentui/react-components';

import styles from './InputAppearance.module.css';

export const Appearance = (): JSXElement => {
  const idPrefix = 'input-appearance-story';
  const inputIds = {
    default: useId(idPrefix),
    underline: useId(idPrefix),
    filledLighter: useId(idPrefix),
    filledDarker: useId(idPrefix),
  };

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Label htmlFor={inputIds.default}>Outline appearance (default)</Label>
        <Input appearance="outline" id={inputIds.default} />
      </div>
      <div className={styles.field}>
        <Label htmlFor={inputIds.underline}>Underline appearance</Label>
        <Input appearance="underline" id={inputIds.underline} />
      </div>
      <div className={`${styles.field} ${styles.filledLighter}`}>
        <Label htmlFor={inputIds.filledLighter}>Filled lighter appearance</Label>
        <Input appearance="filled-lighter" id={inputIds.filledLighter} />
      </div>
      <div className={`${styles.field} ${styles.filledDarker}`}>
        <Label htmlFor={inputIds.filledDarker}>Filled darker appearance</Label>
        <Input appearance="filled-darker" id={inputIds.filledDarker} />
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'An input can have different appearances.\n' +
        `The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with
      filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
      surrounding color to pass accessibility requirements.`,
    },
  },
};
