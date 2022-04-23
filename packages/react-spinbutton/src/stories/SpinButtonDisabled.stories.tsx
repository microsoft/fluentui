import * as React from 'react';
import { SpinButton } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';

export const Disabled = () => {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>Disabled</Label>
      <SpinButton disabled id={id} />
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `SpinButton can be disabled.`,
    },
  },
};
