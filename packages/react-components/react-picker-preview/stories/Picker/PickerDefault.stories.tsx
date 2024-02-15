import * as React from 'react';
import { Option } from '@fluentui/react-components';
import {
  Picker,
  PickerList,
  PickerInput,
  PickerButton,
  PickerControl,
  PickerProps,
  PickerOption,
  PickerTagGroup,
} from '@fluentui/react-picker-preview';
import { TagGroup, Tag, Avatar } from '@fluentui/react-components';

const options = ['John Doe', 'Jane Doe', 'Max Mustermann', 'Erika Mustermann', 'Pierre Dupont'];

const InputExample = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: PickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <Picker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <PickerControl clearable>
          <PickerTagGroup size="small">
            {selectedOptions.map(option => (
              <Tag
                dismissible
                key={option}
                shape="rounded"
                media={<Avatar name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </PickerTagGroup>
          <PickerInput />
        </PickerControl>

        <PickerList>
          {options
            .filter(option => selectedOptions.indexOf(option) < 0)
            .map(option => (
              <PickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </PickerOption>
            ))}
        </PickerList>
      </Picker>
    </div>
  );
};

const ButtonExample = () => {
  return (
    <Picker>
      <PickerControl>
        <TagGroup onDismiss={() => null}>
          <Tag dismissible>Foo</Tag>
          <Tag dismissible>Foo</Tag>
          <Tag dismissible>Foo</Tag>
          <Tag dismissible>Foo</Tag>
        </TagGroup>
        <PickerButton placeholder="Select option" />
      </PickerControl>

      <PickerList>
        <Option>Tom</Option>
        <Option>Dick</Option>
        <Option>Harry</Option>
        <Option>Charles</Option>
      </PickerList>
    </Picker>
  );
};

export const Default = () => {
  return (
    <>
      <InputExample />
    </>
  );
};
