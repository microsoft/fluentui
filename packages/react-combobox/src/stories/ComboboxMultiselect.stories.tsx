import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Combobox, ComboboxProps, Option } from '../index';

export const Multiselect = (props: Partial<ComboboxProps>) => {
  const idBase = useId('listbox-default');
  const ops = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <>
      <label id="temp-combo-label">Best pet</label>
      <Combobox aria-labelledby="temp-combo-label" multiselect={true} placeholder="Select an animal" {...props}>
        {ops.map(option => (
          <Option key={option} itemKey={option} id={`${idBase}-${option}`}>
            {option}
          </Option>
        ))}
      </Combobox>
    </>
  );
};
