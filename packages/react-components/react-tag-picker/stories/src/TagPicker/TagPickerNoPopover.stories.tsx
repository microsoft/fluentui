import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

export const NoPopover = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
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
    <Field label="Add Employees" style={{ maxWidth: 400 }}>
      <TagPicker noPopover onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map((option, index) => (
              <Tag
                key={index}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label="Add Employees"
          />
        </TagPickerControl>
      </TagPicker>
    </Field>
  );
};

NoPopover.parameters = {
  docs: {
    description: {
      story: `
You can use the \`TagPicker\` without the popover with the list of options by providing the \`noPopover\` property. This is useful when you want to allow users to input their own tags. All you have to do is control the \`TagPickerInput\` value and handle the \`onKeyDown\` event to add the tag to the \`TagPicker\` when the user presses the Enter key.
      `,
    },
  },
};
