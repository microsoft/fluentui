import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Listbox, Option, ListboxProps } from '../index';

export const Default = (props: Partial<ListboxProps>) => {
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const listboxId = useId('listbox-grouped');

  return (
    <>
      <label id={listboxId}>Best Pet</label>
      <Listbox aria-labelledby={listboxId} {...props}>
        <div>Test header</div>
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Listbox>
    </>
  );
};
