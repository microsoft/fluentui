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
import { Tag, Avatar, Button, Field } from '@fluentui/react-components';

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

export const SecondaryAction = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const handleAllClear: React.MouseEventHandler = event => {
    setSelectedOptions([]);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl
          secondaryAction={
            <Button appearance="transparent" size="small" shape="rounded" onClick={handleAllClear}>
              All Clear
            </Button>
          }
        >
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
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0
            ? tagPickerOptions.map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))
            : 'No options available'}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};

SecondaryAction.parameters = {
  docs: {
    description: {
      story: `
\`TagPickerControl\` provides a \`secondaryAction\` slot for possible extra functionalities that may be desired. \`secondaryAction\` slot is \`absolute\` positioned on the top right corner of the control component together with \`expandIcon\` slot.
`,
    },
  },
};
