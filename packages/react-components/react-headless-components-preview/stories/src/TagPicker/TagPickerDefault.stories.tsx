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
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './tag-picker.module.css';
import { Media } from './utils';

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

export const Default = (): React.ReactNode => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const availableOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <div className={styles.demo}>
      <label className={styles.label} id="tag-picker-default-label">
        Select employees
      </label>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl className={styles.control}>
          <TagPickerGroup className={styles.group} aria-label="Selected employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                value={option}
                className={styles.tag}
                media={<Media name={option} />}
                dismissIcon={{
                  className: styles.dismissIcon,
                  'aria-label': 'remove',
                  children: <DismissRegular aria-hidden />,
                }}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput className={styles.input} aria-labelledby="tag-picker-default-label" />
        </TagPickerControl>
        <TagPickerList className={styles.listbox}>
          {availableOptions.length > 0 ? (
            availableOptions.map(option => (
              <TagPickerOption
                key={option}
                value={option}
                className={styles.option}
                media={<Media name={option} square />}
                secondaryContent={{ className: styles.secondaryContent, children: 'Microsoft FTE' }}
              >
                {option}
              </TagPickerOption>
            ))
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

Default.parameters = {
  docs: {
    description: {
      story:
        'A multiselect TagPicker. Selected options render as dismissible tags in the `TagPickerGroup`, ' +
        'which uses the native `focusgroup` attribute for arrow-key navigation across the tags. ' +
        'Press ArrowLeft or Backspace at the start of an empty input to move focus into the tags.',
    },
  },
};
