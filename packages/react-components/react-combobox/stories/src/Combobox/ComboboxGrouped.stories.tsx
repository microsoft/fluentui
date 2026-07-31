import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, Option, OptionGroup, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

import styles from './ComboboxGrouped.module.css';

export const Grouped = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-grouped');
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
        <OptionGroup label="Land">
          {land.map(option => (
            <Option key={option} disabled={option === 'Ferret'}>
              {option}
            </Option>
          ))}
        </OptionGroup>
        <OptionGroup label="Sea">
          {water.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </OptionGroup>
      </Combobox>
    </div>
  );
};

Grouped.parameters = {
  docs: {
    description: {
      story: 'Combobox options can be semantically grouped with the `OptionGroup` element, with an optional label.',
    },
  },
};
