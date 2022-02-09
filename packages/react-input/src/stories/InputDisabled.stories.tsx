import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Input } from '../index';

const labelStyle = { display: 'block', paddingBottom: '2px' };

export const Disabled = () => {
  const inputId = useId('input');
  return (
    <>
      <Label disabled htmlFor={inputId} style={labelStyle}>
        Disabled input
      </Label>
      <Input disabled id={inputId} defaultValue="disabled value" />
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'An input can be disabled.',
    },
  },
};
