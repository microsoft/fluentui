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

export const Default = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <Field label={'Select User'} validationState={'error'} validationMessage={'User must be selected'}>
        <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
          <TagPickerControl>
            <TagPickerGroup>
              {selectedOptions.map(option => (
                <Tag key={option} shape="rounded" media={<Avatar name={option} color="colorful" />} value={option}>
                  {option}
                </Tag>
              ))}
            </TagPickerGroup>
            <TagPickerInput />
          </TagPickerControl>
          <TagPickerList>
            {options
              .filter(option => !selectedOptions.includes(option))
              .map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
          </TagPickerList>
        </TagPicker>
      </Field>
    </div>
  );
};
