import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Combobox, ComboboxInput, ComboboxProps, Listbox, Option } from '../index';

export const Editable = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} {...props}>
        <ComboboxInput placeholder="Select an animal" />
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
