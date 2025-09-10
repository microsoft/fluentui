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
  TagPickerOptionGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

const managers = ['John Doe', 'Jane Doe', 'Max Mustermann', 'Erika Mustermann'];
const devs = ['Pierre Dupont', 'Amelie Dupont', 'Mario Rossi', 'Maria Rossi'];

export const Grouped = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const unSelectedManagers = managers.filter(option => !selectedOptions.includes(option));
  const unSelectedDevs = devs.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
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
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {unSelectedManagers.length === 0 && unSelectedDevs.length === 0 && (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
          {unSelectedManagers.length > 0 && (
            <TagPickerOptionGroup label="Managers">
              {unSelectedManagers.map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
            </TagPickerOptionGroup>
          )}
          {unSelectedDevs.length > 0 && (
            <TagPickerOptionGroup label="Devs">
              {unSelectedDevs.map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
            </TagPickerOptionGroup>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
