import { useId } from '@fluentui/react-utilities';
import * as React from 'react';
import { Listbox, Option, ListboxProps } from '../index';
import { OptionGroup } from '../OptionGroup';

export const GroupedOptions = (props: Partial<ListboxProps>) => {
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  const listboxId = useId('listbox-grouped');

  return (
    <>
      <label id={listboxId}>Best Pet</label>
      <Listbox aria-labelledby={listboxId} {...props}>
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
