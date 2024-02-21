import * as React from 'react';
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
import { Tag, Avatar, useComboboxFilter } from '@fluentui/react-components';

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

const InputExample = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: PickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <Picker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <PickerControl clearable>
          <PickerTagGroup>
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
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: PickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <Picker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <PickerControl clearable>
          <PickerTagGroup>
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
          <PickerButton />
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

const FilteringExample = () => {
  const [query, setQuery] = React.useState<string>('');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: PickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const children = useComboboxFilter(
    query,
    options.map(option => ({ children: option, value: option })),
    {
      // TODO add renderer for noOptionsMessage
      noOptionsMessage: "We couldn't find any matches",
      renderOption: option => (
        <PickerOption
          secondaryContent="Microsoft FTE"
          key={option.value}
          media={<Avatar name={option.children} color="colorful" />}
          value={option.value}
        >
          {option.children}
        </PickerOption>
      ),
      filter(optionText, queryText) {
        // TODO make this filter provide value too
        // In this example optionText is the same as value
        return selectedOptions.indexOf(optionText) < 0 && optionText.toLowerCase().includes(queryText.toLowerCase());
      },
    },
  );

  return (
    <div style={{ maxWidth: 400 }}>
      <Picker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <PickerControl clearable>
          <PickerTagGroup>
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
          <PickerInput value={query} onChange={e => setQuery(e.target.value)} />
        </PickerControl>

        <PickerList>{children}</PickerList>
      </Picker>
    </div>
  );
};

export const Default = () => {
  return (
    <>
      <InputExample />
      <ButtonExample />
      <FilteringExample />
    </>
  );
};
