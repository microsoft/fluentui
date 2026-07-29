import * as React from 'react';
import { Combobox, Option } from '@fluentui/react-headless-components-preview/combobox';
import { ChevronDownRegular } from '@fluentui/react-icons';
import styles from './combobox.module.css';

export const Disabled = (): React.ReactNode => {
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="combobox-disabled">
        Best pet
      </label>
      <Combobox
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        id="combobox-disabled"
        disabled
        placeholder="Select an animal"
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
      >
        {options.map(option => (
          <Option className={styles.option} key={option}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A disabled Combobox is not interactive. The input receives the native `disabled` attribute.',
    },
  },
};
