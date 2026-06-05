import * as React from 'react';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';

import { CheckmarkRegular, ChevronDownRegular, DismissRegular } from '@fluentui/react-icons';
import styles from './dropdown.module.css';

export const Default = (): React.ReactNode => {
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="dropdown-default">
        Best pet
      </label>
      <Dropdown
        className={styles.demoWrapper}
        button={{ className: styles.button }}
        listbox={{ className: styles.listbox }}
        id="dropdown-default"
        placeholder="Select an animal"
        clearable
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
        clearButton={{ className: styles.clearButton, children: <DismissRegular /> }}
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
