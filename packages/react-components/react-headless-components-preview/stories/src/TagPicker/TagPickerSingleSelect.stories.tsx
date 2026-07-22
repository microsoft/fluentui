import * as React from 'react';
import {
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
} from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerProps } from '@fluentui/react-headless-components-preview/tag-picker';

import styles from './tag-picker.module.css';
import { PersonOption, SelectedTag, tagPickerPositioning } from './utils';

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

export const SingleSelect = (): React.ReactNode => {
  const [selectedOption, setSelectedOption] = React.useState<string | undefined>();
  const selectedOptions = React.useMemo(() => (selectedOption ? [selectedOption] : []), [selectedOption]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_e, data) => {
    setSelectedOption(selectedOption === data.value ? undefined : data.value);
  };

  return (
    <div className={styles.demo}>
      <label className={styles.label} id="tag-picker-singleselect-label">
        Select an employee
      </label>
      <TagPicker positioning={tagPickerPositioning} onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl className={styles.control}>
          {selectedOption && (
            <TagPickerGroup className={styles.group} aria-label="Selected employee">
              <SelectedTag value={selectedOption} />
            </TagPickerGroup>
          )}
          <TagPickerInput className={styles.input} aria-labelledby="tag-picker-singleselect-label" />
        </TagPickerControl>
        <TagPickerList className={styles.listbox}>
          {options
            .filter(option => selectedOption !== option)
            .map(option => (
              <PersonOption key={option} value={option} />
            ))}
        </TagPickerList>
      </TagPicker>
    </div>
  );
};

SingleSelect.parameters = {
  docs: {
    description: {
      story:
        'The TagPicker is multiselect by default. For single selection, manage the selected-option state ' +
        'yourself and pass at most one selected option.',
    },
  },
};
