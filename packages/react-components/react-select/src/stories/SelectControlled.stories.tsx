import * as React from 'react';
import { Select } from '../index';
import { useId } from '@fluentui/react-utilities';

export const Controlled = () => {
  const selectId = useId();
  const [value, setValue] = React.useState<'red' | 'green' | 'blue'>('red');

  return (
    <>
      <label htmlFor={selectId}>Color</label>
      <Select id={selectId}>
        <option selected={value === 'red'}>Red</option>
        <option selected={value === 'green'}>Green</option>
        <option selected={value === 'blue'}>Blue</option>
      </Select>
      <button onClick={() => setValue('blue')}>Select Blue</button>
    </>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: 'The value of a Select can be controlled by updating the `selected` prop on `option` elements.',
    },
  },
};
