import * as React from 'react';
import { Dropdown, Option, OptionGroup } from '@fluentui/react-headless-components-preview/dropdown';

import { CheckmarkRegular, ChevronDownRegular, DismissRegular } from '@fluentui/react-icons';
import styles from './dropdown.module.css';

export const Grouped = (): React.ReactNode => {
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="dropdown-grouped">
        Best pet
      </label>
      <Dropdown
        className={styles.demoWrapper}
        button={{ className: styles.button }}
        listbox={{ className: styles.listbox }}
        id="dropdown-grouped"
        placeholder="Select an animal"
        clearable
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
        clearButton={{ className: styles.clearButton, children: <DismissRegular /> }}
      >
        <OptionGroup className={styles.optionGroup} label={{ className: styles.groupLabel, children: 'Land' }}>
          {land.map(option => (
            <Option
              className={styles.option}
              key={option}
              checkIcon={{ className: styles.checkIcon, children: <CheckmarkRegular /> }}
              disabled={option === 'Ferret'}
            >
              {option}
            </Option>
          ))}
        </OptionGroup>
        <OptionGroup className={styles.optionGroup} label={{ className: styles.groupLabel, children: 'Sea' }}>
          {water.map(option => (
            <Option
              className={styles.option}
              key={option}
              checkIcon={{ className: styles.checkIcon, children: <CheckmarkRegular /> }}
            >
              {option}
            </Option>
          ))}
        </OptionGroup>
      </Dropdown>
    </div>
  );
};

Grouped.parameters = {
  docs: {
    description: {
      story: 'Options can be semantically grouped with `OptionGroup`, with an optional group label.',
    },
  },
};
