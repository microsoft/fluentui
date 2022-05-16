import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Combobox, ComboboxProps, Option, OptionGroup } from '../index';

export const Grouped = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-grouped');
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  return (
    <>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
        <OptionGroup label="Land">
          {land.map(option => (
            <Option key={option} disabled={option === 'Ferret'}>
              {option}
            </Option>
          ))}
        </OptionGroup>
        <OptionGroup label="Sea">
          {water.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </OptionGroup>
      </Combobox>
    </>
  );
};

Grouped.parameters = {
  docs: {
    description: {
      story: 'Combobox options can be semantically grouped with the `OptionGroup` element, with an optional label.',
    },
  },
};
