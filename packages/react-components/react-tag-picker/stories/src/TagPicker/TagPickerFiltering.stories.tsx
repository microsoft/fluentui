import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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

export const Filtering = (): JSXElement => {
  const [query, setQuery] = React.useState<string>('');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  // disable auto focus when no query is present (e.g. opened by keyboard)
  // enable auto focus when query is present (e.g. opened by typing)
  const disableAutoFocus = query.length === 0;
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
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions} disableAutoFocus={disableAutoFocus}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
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

\`disableAutoFocus\` is used here to control whether the first option is automatically focused when the popover opens. When the user opens the popover via keyboard (no query), auto focus is disabled to avoid jumping to the first option. When the user types a query, auto focus is enabled so the first matching option is highlighted.
`,
    },
  },
};
