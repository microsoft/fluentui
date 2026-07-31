import * as React from 'react';
import { Combobox, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

import styles from './PositioningFallbackPositions.module.css';

export const FallbackPositions = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox
        positioning={{ fallbackPositions: ['below'] }}
        aria-labelledby={comboId}
        placeholder="Select an animal"
        {...props}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

FallbackPositions.parameters = {
  docs: {
    description: {
      story: [
        "When there's no enough space the `listbox` is opened from the right or left side.",
        'This behavior can be changed by using `fallbackPositions` prop.',
      ].join('\n'),
    },
  },
};
