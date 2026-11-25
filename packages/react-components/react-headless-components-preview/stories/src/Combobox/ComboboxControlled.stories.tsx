import * as React from 'react';
import { Combobox, Option } from '@fluentui/react-headless-components-preview/combobox';
import { CheckmarkRegular, ChevronDownRegular, DismissRegular } from '@fluentui/react-icons';
import styles from './combobox.module.css';

export const Controlled = (): React.ReactNode => {
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Dog', 'Fish', 'Hamster'];

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(['Dog']);
  const [value, setValue] = React.useState('Dog');

  const onOptionSelect = React.useCallback((_: unknown, data: { selectedOptions: string[]; optionText?: string }) => {
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? '');
  }, []);

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="combobox-controlled">
        Best pet
      </label>
      <Combobox
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        id="combobox-controlled"
        placeholder="Select an animal"
        clearable
        value={value}
        selectedOptions={selectedOptions}
        onOptionSelect={onOptionSelect}
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
        clearIcon={{ className: styles.clearIcon, children: <DismissRegular /> }}
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

Controlled.parameters = {
  docs: {
    description: {
      story:
        'Selection and displayed value can be fully controlled via `value`, `selectedOptions`, and `onOptionSelect`. ' +
        'When using controlled selection, `value` must be kept in sync with the selected option text.',
    },
  },
};
