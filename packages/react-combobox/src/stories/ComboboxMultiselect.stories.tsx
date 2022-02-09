import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Combobox, ComboboxProps, Option } from '../index';

export const Multiselect = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-multi');
  const ops = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} multiselect={true} placeholder="Select an animal" {...props}>
        {ops.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </>
  );
};
