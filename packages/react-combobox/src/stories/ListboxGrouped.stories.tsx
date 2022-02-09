import { useId } from '@fluentui/react-utilities';
import * as React from 'react';
import { Listbox, Option, ListboxProps } from '../index';
import { OptionGroup } from '../OptionGroup';

export const GroupedOptions = (props: Partial<ListboxProps>) => {
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  const idBase = useId('listbox-grouped');

  return (
    <>
      <label id={idBase}>Best Pet</label>
      <Listbox aria-labelledby={idBase} {...props}>
        <OptionGroup label="Land animals">
          {land.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </OptionGroup>
        <OptionGroup label="Sea animals">
          {water.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </OptionGroup>
      </Listbox>
    </>
  );
};
