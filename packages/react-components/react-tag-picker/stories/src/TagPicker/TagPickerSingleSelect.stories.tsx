import * as React from 'react';
import type { JSXElement, TagPickerProps } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerOption,
  TagPickerGroup,
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

export const SingleSelect = (): JSXElement => {
  const [selectedOption, setSelectedOption] = React.useState<string | undefined>();
  const selectedOptions = React.useMemo(() => (selectedOption ? [selectedOption] : []), [selectedOption]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
    setSelectedOption(data.selectedOptions[0]);
  };

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker selectionMode="single" onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          {selectedOption && (
            <TagPickerGroup aria-label="Selected Employees">
              <Tag
                key={selectedOption}
                shape="rounded"
                media={<Avatar aria-hidden name={selectedOption} color="colorful" />}
                value={selectedOption}
              >
                {selectedOption}
              </Tag>
            </TagPickerGroup>
          )}
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {options
            .filter(option => selectedOption !== option)
            .map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};

SingleSelect.parameters = {
  docs: {
    description: {
      story: `
By default, the \`TagPicker\` allows multiple selected tags. Set \`selectionMode="single"\` to replace the selected tag when another option is chosen.
      `,
    },
  },
};
