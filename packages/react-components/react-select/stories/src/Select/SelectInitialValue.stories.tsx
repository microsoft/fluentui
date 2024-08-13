import * as React from 'react';
import { Select, useId } from '@fluentui/react-components';

export const InitialValue = () => {
  const selectId = useId();

  return (
    <>
      <label htmlFor={selectId}>Color</label>
      <Select defaultValue="Green" id={selectId}>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};

InitialValue.parameters = {
  docs: {
    description: {
      story: 'A Select can have its initial value defined by using the `defaultValue` prop.',
    },
  },
};
