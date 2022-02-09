import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Combobox, ComboboxProps, Option } from '../index';

export const Default = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const ops = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
        {ops.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </>
  );
};
