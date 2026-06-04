import * as React from 'react';
import {
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  useTagPickerFilter,
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

export const Filtering = (): React.ReactNode => {
  const [query, setQuery] = React.useState<string>('');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  // disable auto focus when no query is present (e.g. opened by keyboard)
  const disableAutoFocus = query.length === 0;

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_e, data) => {
    if (data.value === 'no-matches') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
    setQuery('');
  };

  const children = useTagPickerFilter({
    query,
    options,
    noOptionsElement: (
      <TagPickerOption value="no-matches" disabled className={styles.option}>
        We couldn't find any matches
      </TagPickerOption>
    ),
    renderOption: option => (
      <TagPickerOption
        key={option}
        value={option}
        className={styles.option}
        media={<Media name={option} square />}
        secondaryContent={{ className: styles.secondaryContent, children: 'Microsoft FTE' }}
      >
        {option}
      </TagPickerOption>
    ),
    filter: option => !selectedOptions.includes(option) && option.toLowerCase().includes(query.toLowerCase()),
  });

  return (
    <div className={styles.demo}>
      <label className={styles.label} id="tag-picker-filtering-label">
        Select employees
      </label>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions} disableAutoFocus={disableAutoFocus}>
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
          <TagPickerInput
            className={styles.input}
            aria-labelledby="tag-picker-filtering-label"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </TagPickerControl>
        <TagPickerList className={styles.listbox}>{children}</TagPickerList>
      </TagPicker>
    </div>
  );
};

Filtering.parameters = {
  docs: {
    description: {
      story:
        'The `useTagPickerFilter` hook filters options by the typed query. Pass a custom `renderOption` so it ' +
        'renders the headless `Option` (its default renders the styled `TagPickerOption`).',
    },
  },
};
