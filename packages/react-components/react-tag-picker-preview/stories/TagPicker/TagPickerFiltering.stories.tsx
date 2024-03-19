import * as React from 'react';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-tag-picker-preview';
import { Tag, Avatar, useComboboxFilter } from '@fluentui/react-components';

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

export const Filtering = () => {
  const [query, setQuery] = React.useState<string>('');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
    setQuery('');
  };

  const children = useComboboxFilter(
    query,
    options.map(option => ({ children: option, value: option })),
    {
      // TODO add renderer for noOptionsMessage
      noOptionsMessage: "We couldn't find any matches",
      renderOption: option => (
        <TagPickerOption
          secondaryContent="Microsoft FTE"
          key={option.value}
          media={<Avatar name={option.children} color="colorful" />}
          value={option.value}
        >
          {option.children}
        </TagPickerOption>
      ),
      filter(optionText, queryText) {
        // TODO make this filter provide value too
        // In this example optionText is the same as value
        return !selectedOptions.includes(optionText) && optionText.toLowerCase().includes(queryText.toLowerCase());
      },
    },
  );
  return (
    <div style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <Tag key={option} shape="rounded" media={<Avatar name={option} color="colorful" />} value={option}>
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput value={query} onChange={e => setQuery(e.target.value)} />
        </TagPickerControl>

        <TagPickerList>{children}</TagPickerList>
      </TagPicker>
    </div>
  );
};
