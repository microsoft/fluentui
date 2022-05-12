import * as React from 'react';
import { Combobox, ComboboxProps, Option } from '../index';
import { useId } from '@fluentui/react-utilities';

export const Size = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combobox');

  return (
    <>
      <label id={`${comboId}-small`}>Small</label>
      <Combobox aria-labelledby={`${comboId}-small`} placeholder="Select a color" size="small" {...props}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>

      <label htmlFor={`${comboId}-med`}>Medium</label>
      <Combobox aria-labelledby={`${comboId}-med`} placeholder="Select a color" size="medium" {...props}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>

      <label htmlFor={`${comboId}-large`}>Large</label>
      <Combobox aria-labelledby={`${comboId}-large`} placeholder="Select a color" size="large" {...props}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A Combobox's size can be set to `small`, `medium` (default), or `large`.",
    },
  },
};
