import * as React from 'react';
import { Select } from '../index';
import { useId } from '@fluentui/react-utilities';

export const Size = () => {
  const selectId = useId();

  return (
    <>
      <label htmlFor={`${selectId}-small`}>Small</label>
      <Select id={`${selectId}-small`} size="small">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>

      <label htmlFor={`${selectId}-med`}>Medium</label>
      <Select id={`${selectId}-med`} size="medium">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>

      <label htmlFor={`${selectId}-large`}>Large</label>
      <Select id={`${selectId}-large`} size="large">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A Select's size can be set to `small`, `medium` (default), or `large`.",
    },
  },
};
