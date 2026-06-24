import * as React from 'react';
import {
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
} from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerProps } from '@fluentui/react-headless-components-preview/tag-picker';

import styles from './tag-picker.module.css';
import { PersonOption, SelectedTag } from './utils';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const SecondaryAction = (): React.ReactNode => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const availableOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <div className={styles.demo}>
      <label className={styles.label} id="tag-picker-secondaryaction-label">
        Select employees
      </label>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl
          className={styles.control}
          secondaryAction={{
            children: (
              <button type="button" className={styles.secondaryAction} onClick={() => setSelectedOptions([])}>
                All Clear
              </button>
            ),
          }}
        >
          <TagPickerGroup className={styles.group} aria-label="Selected employees">
            {selectedOptions.map(option => (
              <SelectedTag key={option} value={option} />
            ))}
          </TagPickerGroup>
          <TagPickerInput className={styles.input} aria-labelledby="tag-picker-secondaryaction-label" />
        </TagPickerControl>
        <TagPickerList className={styles.listbox}>
          {availableOptions.length > 0 ? (
            availableOptions.map(option => <PersonOption key={option} value={option} />)
          ) : (
            <TagPickerOption value="no-options" disabled className={styles.option}>
              No options available
            </TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </div>
  );
};

SecondaryAction.parameters = {
  docs: {
    description: {
      story:
        '`TagPickerControl` provides a `secondaryAction` slot for extra functionality (here, an "All Clear" ' +
        'button). It is rendered alongside the expand icon in the control aside.',
    },
  },
};
