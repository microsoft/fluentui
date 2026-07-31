import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

import styles from './ComboboxDefault.module.css';

export const Default = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};
