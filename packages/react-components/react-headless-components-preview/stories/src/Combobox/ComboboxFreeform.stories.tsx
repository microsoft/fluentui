import * as React from 'react';
import { Combobox, Option } from '@fluentui/react-headless-components-preview/combobox';
import { CheckmarkRegular, ChevronDownRegular } from '@fluentui/react-icons';
import styles from './combobox.module.css';

export const Freeform = (): React.ReactNode => {
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="combobox-freeform">
        Best pet
      </label>
      <Combobox
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        id="combobox-freeform"
        placeholder="Type anything…"
        freeform
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
      >
        {options.map(option => (
          <Option
            className={styles.option}
            key={option}
            checkIcon={{ className: styles.checkIcon, children: <CheckmarkRegular /> }}
          >
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

Freeform.parameters = {
  docs: {
    description: {
      story:
        'When `freeform` is set, the user can type any value — not just options from the list. ' +
        'The typed value is preserved even if it does not match any option.',
    },
  },
};
