import { useId } from '@fluentui/react-utilities';
import * as React from 'react';
import { Listbox, Option, ListboxProps } from '../index';

export const Default = (props: Partial<ListboxProps>) => {
  const ops = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const idBase = useId('listbox-default');

  return (
    <>
      <Listbox {...props}>
        <div>Test header</div>
        {ops.map(option => (
          <Option key={option} itemKey={option} id={`${idBase}-${option}`}>
            {option}
          </Option>
        ))}
      </Listbox>
    </>
  );
};
