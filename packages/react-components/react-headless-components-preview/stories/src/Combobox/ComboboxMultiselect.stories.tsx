import * as React from 'react';
import { Combobox, Option } from '@fluentui/react-headless-components-preview/combobox';
import { CheckmarkRegular, ChevronDownRegular } from '@fluentui/react-icons';
import styles from './combobox.module.css';

export const Multiselect = (): React.ReactNode => {
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="combobox-multiselect">
        Best pets
      </label>
      <Combobox
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        id="combobox-multiselect"
        multiselect
        placeholder="Select animals"
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
      >
        {options.map(option => (
          <Option
            className={styles.option}
            key={option}
            checkIcon={{ className: styles.checkIcon, children: <CheckmarkRegular /> }}
            disabled={option === 'Ferret'}
          >
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

Multiselect.parameters = {
  docs: {
    description: {
      story: 'Combobox supports multiselect. Selected options are shown as a comma-separated list in the input.',
    },
  },
};
