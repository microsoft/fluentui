import * as React from 'react';
import { Select } from '../index';
import { useId } from '@fluentui/react-utilities';

export const Inline = () => {
  const selectId = useId();

  return (
    <>
      Please select one of the following <span id={selectId}>colors</span>:
      <Select aria-labelledby={selectId} inline>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: 'A Select can be set to `inline`.',
    },
  },
};
