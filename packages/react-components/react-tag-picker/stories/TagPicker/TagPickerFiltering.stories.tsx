import * as React from 'react';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
  useTagPickerFilter,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

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
    if (data.value === 'no-matches') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
    setQuery('');
  };

  const children = useTagPickerFilter({
    query,
    options,
    noOptionsElement: <TagPickerOption value="no-matches">We couldn't find any matches</TagPickerOption>,
    renderOption: option => (
      <TagPickerOption
        secondaryContent="Microsoft FTE"
        key={option}
        media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
        value={option}
      >
        {option}
      </TagPickerOption>
    ),
    filter: option => !selectedOptions.includes(option) && option.toLowerCase().includes(query.toLowerCase()),
  });
  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" value={query} onChange={e => setQuery(e.target.value)} />
        </TagPickerControl>

        <TagPickerList>{children}</TagPickerList>
      </TagPicker>
    </Field>
  );
};

Filtering.parameters = {
  docs: {
    description: {
      story: `
\`TagPicker\` can take advantage of the provided \`useTagPickerFilter\` hook to filter the options based on the user-typed string. It can be configured for a custom filter function, custom message, and custom render function.
`,
    },
  },
};
