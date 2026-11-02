import * as React from 'react';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';

import { ChevronDownRegular } from '@fluentui/react-icons';
import styles from './dropdown.module.css';

export const Disabled = (): React.ReactNode => {
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="dropdown-disabled">
        Best pet
      </label>
      <Dropdown
        className={styles.demoWrapper}
        button={{ className: styles.button }}
        listbox={{ className: styles.listbox }}
        id="dropdown-disabled"
        disabled
        placeholder="Select an animal"
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
        clearButton={{ className: styles.clearButton }}
      >
        {options.map(option => (
          <Option className={styles.option} key={option}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A disabled Dropdown is not interactive. The trigger button receives the native `disabled` attribute.',
    },
  },
};
