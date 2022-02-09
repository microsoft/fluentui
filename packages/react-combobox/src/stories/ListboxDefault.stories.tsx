import * as React from 'react';
import { Listbox, Option, ListboxProps } from '../index';

export const Default = (props: Partial<ListboxProps>) => {
  const ops = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

  return (
    <>
      <Listbox {...props}>
        <div>Test header</div>
        {ops.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Listbox>
    </>
  );
};
