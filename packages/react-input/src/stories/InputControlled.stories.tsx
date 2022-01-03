import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Input } from '../index';
import type { InputProps } from '../index';

const labelStyle = { display: 'block', paddingBottom: '2px' };

export const Controlled = () => {
  const inputId = useId('input');
  const [value, setValue] = React.useState('initial value');

  const onChange: InputProps['onChange'] = (ev, data) => {
    // The controlled input pattern can be used for other purposes besides validation,
    // but validation is a useful example
    if (data.value.length <= 20) {
      setValue(data.value);
    }
  };

  return (
    <>
      <Label htmlFor={inputId} style={labelStyle}>
        Controlled input limiting the value to 20 characters
      </Label>
      <Input value={value} onChange={onChange} id={inputId} />
    </>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        "An input can be controlled: the consuming component tracks the input's value in its state " +
        'and manually handles all updates.',
    },
  },
};
