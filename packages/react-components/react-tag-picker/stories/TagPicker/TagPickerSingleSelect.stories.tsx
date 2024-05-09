import * as React from 'react';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
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

export const SingleSelect = () => {
  const [selectedOption, setSelectedOption] = React.useState<string | undefined>();
  const selectedOptions = React.useMemo(() => (selectedOption ? [selectedOption] : []), [selectedOption]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOption(selectedOption === data.value ? undefined : data.value);
  };

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          {selectedOption && (
            <TagPickerGroup>
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
By default, the \`TagPicker\` allows you to have multiple tags selected . To enable single selection, you can manage the selected options state yourself and pass only one selected option to the \`TagPicker\` component.
      `,
    },
  },
};
