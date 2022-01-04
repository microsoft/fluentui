import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Input } from '../index';
import type { InputProps } from '../index';

const labelStyle = { display: 'block', paddingBottom: '2px' };

const onChange: InputProps['onChange'] = (ev, data) => {
  // Uncontrolled inputs can be notified of changes to the value
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = () => {
  const inputId = useId('input');
  return (
    <>
      <Label htmlFor={inputId} style={labelStyle}>
        Uncontrolled input with default value
      </Label>
      <Input defaultValue="default value" onChange={onChange} id={inputId} />
    </>
  );
};

Uncontrolled.parameters = {
  docs: {
    description: {
      story: "An input can be uncontrolled: it's passed a default value and handles updates internally.",
    },
  },
};
