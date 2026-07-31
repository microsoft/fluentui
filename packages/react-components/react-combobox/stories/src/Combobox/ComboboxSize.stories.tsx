import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

import styles from './ComboboxSize.module.css';

export const Size = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combobox');

  return (
    <div className={styles.root}>
      <div>
        <label id={`${comboId}-small`}>Small</label>
        <Combobox aria-labelledby={`${comboId}-small`} placeholder="Select a color" size="small" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div>
        <label htmlFor={`${comboId}-med`}>Medium</label>
        <Combobox aria-labelledby={`${comboId}-med`} placeholder="Select a color" size="medium" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div>
        <label htmlFor={`${comboId}-large`}>Large</label>
        <Combobox aria-labelledby={`${comboId}-large`} placeholder="Select a color" size="large" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A Combobox's size can be set to `small`, `medium` (default), or `large`.",
    },
  },
};
