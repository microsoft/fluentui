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

type Option = { value: string; fixedWidth?: boolean };

const options: Option[] = [
  { value: 'John Doe' },
  { value: 'Jane Doe' },
  { value: 'Max Mustermann' },
  { value: 'Erika Mustermann' },
  { value: 'This tag has text truncation based on a fixed width of 50px', fixedWidth: true },
  {
    value:
      'This tag has text truncation based on its container width. This is a long text that will be truncated when it reaches the end of the container.',
  },
];

export const TruncatedText = (): React.ReactNode => {
  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(options);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions.map(value => options.find(o => o.value === value)!));
  };
  const availableOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <div className={styles.demo}>
      <label className={styles.label} id="tag-picker-truncated-label">
        Select employees
      </label>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions.map(option => option.value)}>
        <TagPickerControl className={styles.control}>
          <TagPickerGroup className={styles.group} aria-label="Selected employees">
            {selectedOptions.map(option => (
              <Tag
                key={option.value}
                value={option.value}
                title={option.value}
                className={styles.tag}
                media={<Media name={option.value} />}
                primaryText={{
                  className: option.fixedWidth ? `${styles.truncate} ${styles.truncateFixed}` : styles.truncate,
                }}
                dismissIcon={{
                  className: styles.dismissIcon,
                  'aria-label': 'remove',
                  children: <DismissRegular aria-hidden />,
                }}
              >
                {option.value}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput className={styles.input} aria-labelledby="tag-picker-truncated-label" />
        </TagPickerControl>
        <TagPickerList className={styles.listbox}>
          {availableOptions.length > 0 ? (
            availableOptions.map(option => (
              <TagPickerOption
                key={option.value}
                value={option.value}
                text={option.value}
                title={option.value}
                className={styles.option}
                media={<Media name={option.value} square />}
              >
                <span className={styles.truncate}>{option.value}</span>
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

TruncatedText.parameters = {
  docs: {
    description: {
      story:
        'Text truncation is not built in, but is easy to achieve with CSS. This example truncates with an ' +
        'ellipsis both by container width and by a fixed width (50px).',
    },
  },
};
