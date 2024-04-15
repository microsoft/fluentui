import * as React from 'react';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
  TagPickerOptionGroup,
} from '@fluentui/react-tag-picker-preview';
import { Tag, Avatar } from '@fluentui/react-components';

const managers = ['John Doe', 'Jane Doe', 'Max Mustermann', 'Erika Mustermann'];
const devs = ['Pierre Dupont', 'Amelie Dupont', 'Mario Rossi', 'Maria Rossi'];

export const Grouped = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const unSelectedManagers = managers.filter(option => !selectedOptions.includes(option));
  const unSelectedDevs = devs.filter(option => !selectedOptions.includes(option));

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
          <TagPickerInput />
        </TagPickerControl>
        <TagPickerList>
          {unSelectedManagers.length > 0 && (
            <TagPickerOptionGroup label="Managers">
              {unSelectedManagers.map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar name={option} color="colorful" />}
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
                  media={<Avatar name={option} color="colorful" />}
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
    </div>
  );
};
