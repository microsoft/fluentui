import * as React from 'react';
import {
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
} from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerProps } from '@fluentui/react-headless-components-preview/tag-picker';

import styles from './tag-picker.module.css';
import { SelectedTag } from './utils';

export const NoPopover = (): React.ReactNode => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_e, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue) {
      setInputValue('');
      setSelectedOptions(curr => (curr.includes(inputValue) ? curr : [...curr, inputValue]));
    }
  };

  return (
    <div className={styles.demo}>
      <label className={styles.label} id="tag-picker-nopopover-label">
        Add employees
      </label>
      <TagPicker noPopover onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl className={styles.control}>
          <TagPickerGroup className={styles.group} aria-label="Selected employees">
            {selectedOptions.map(option => (
              <SelectedTag key={option} value={option} />
            ))}
          </TagPickerGroup>
          <TagPickerInput
            className={styles.input}
            aria-labelledby="tag-picker-nopopover-label"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </TagPickerControl>
      </TagPicker>
    </div>
  );
};

NoPopover.parameters = {
  docs: {
    description: {
      story:
        'Set `noPopover` to use the TagPicker without an options list — useful for free-text tag entry. ' +
        'Control the `TagPickerInput` value and add a tag on Enter.',
    },
  },
};
