import * as React from 'react';

import { useId } from '@fluentui/react-components';
import { Select } from '@fluentui/react-modern-components-preview/select';

export const InitialValue = (): React.ReactNode => {
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
