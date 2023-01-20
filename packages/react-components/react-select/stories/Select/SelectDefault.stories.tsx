import * as React from 'react';
import { Select } from '@fluentui/react-select';
import { useId } from '@fluentui/react-components';
import type { SelectProps } from '@fluentui/react-select';

export const Default = (props: SelectProps) => {
  const selectId = useId();

  return (
    <>
      <label htmlFor={selectId}>Color</label>
      <Select id={selectId} {...props}>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};
