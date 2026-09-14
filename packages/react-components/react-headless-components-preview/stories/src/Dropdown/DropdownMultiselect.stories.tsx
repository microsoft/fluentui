import * as React from 'react';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';

import { CheckmarkRegular, ChevronDownRegular } from '@fluentui/react-icons';
import styles from './dropdown.module.css';

export const Multiselect = (): React.ReactNode => {
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="dropdown-multiselect">
        Best pets
      </label>
      <Dropdown
        className={styles.demoWrapper}
        button={{ className: styles.button }}
        listbox={{ className: styles.listbox }}
        id="dropdown-multiselect"
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
      </Dropdown>
    </div>
  );
};

Multiselect.parameters = {
  docs: {
    description: {
      story: 'Dropdown supports multiselect. Selected options are shown as a comma-separated list in the trigger.',
    },
  },
};
