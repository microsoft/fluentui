import * as React from 'react';

import { useId } from '@fluentui/react-components';
import { Select } from '@fluentui/react-modern-components-preview/select';
import type { SelectProps } from '@fluentui/react-modern-components-preview/select';

export const Default = (props: SelectProps): React.ReactNode => {
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
