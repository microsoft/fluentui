import * as React from 'react';
import { Select, useId } from '@fluentui/react-components';

export const Disabled = () => {
  const selectId = useId();

  return (
    <>
      <label htmlFor={selectId}>Color</label>
      <Select disabled id={selectId}>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A Select can be disabled through the native `disabled` prop',
    },
  },
};
