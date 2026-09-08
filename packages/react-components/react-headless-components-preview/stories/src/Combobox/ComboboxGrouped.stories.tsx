import * as React from 'react';
import { Combobox, Option, OptionGroup } from '@fluentui/react-headless-components-preview/combobox';
import { CheckmarkRegular, ChevronDownRegular, DismissRegular } from '@fluentui/react-icons';
import styles from './combobox.module.css';

export const Grouped = (): React.ReactNode => {
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="combobox-grouped">
        Best pet
      </label>
      <Combobox
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        id="combobox-grouped"
        placeholder="Select an animal"
        clearable
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
        clearIcon={{ className: styles.clearIcon, children: <DismissRegular /> }}
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
      </Combobox>
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
