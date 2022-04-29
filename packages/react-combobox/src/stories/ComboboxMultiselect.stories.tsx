import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { ComboButton, Combobox, ComboboxProps, Listbox, Option } from '../index';

export const Multiselect = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-multi');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} multiselect={true} {...props}>
        <ComboButton placeholder="Select an animal" />
        <Listbox>
          {options.map(option => (
            <Option key={option} disabled={option === 'Ferret'}>
              {option}
            </Option>
          ))}
        </Listbox>
      </Combobox>
    </>
  );
};
