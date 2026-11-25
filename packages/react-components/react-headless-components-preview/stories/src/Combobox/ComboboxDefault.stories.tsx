import * as React from 'react';
import { Combobox, Option } from '@fluentui/react-headless-components-preview/combobox';
import { CheckmarkRegular, ChevronDownRegular, DismissRegular } from '@fluentui/react-icons';
import styles from './combobox.module.css';

export const Default = (): React.ReactNode => {
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="combobox-default">
        Best pet
      </label>
      <Combobox
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        id="combobox-default"
        placeholder="Select an animal"
        clearable
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
        clearIcon={{ className: styles.clearIcon, children: <DismissRegular /> }}
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
