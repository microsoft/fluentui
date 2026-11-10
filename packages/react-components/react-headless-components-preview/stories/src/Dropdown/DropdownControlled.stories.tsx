import * as React from 'react';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';
import { CheckmarkRegular, ChevronDownRegular, DismissRegular } from '@fluentui/react-icons';
import styles from './dropdown.module.css';

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
      <label className={styles.label} htmlFor="dropdown-controlled">
        Best pet
      </label>
      <Dropdown
        className={styles.demoWrapper}
        button={{ className: styles.button }}
        listbox={{ className: styles.listbox }}
        id="dropdown-controlled"
        placeholder="Select an animal"
        clearable
        value={value}
        selectedOptions={selectedOptions}
        onOptionSelect={onOptionSelect}
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
        clearButton={{ className: styles.clearButton, children: <DismissRegular /> }}
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
      </Dropdown>
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
