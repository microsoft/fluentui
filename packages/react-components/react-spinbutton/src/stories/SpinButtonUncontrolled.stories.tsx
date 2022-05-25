import * as React from 'react';
import { SpinButton } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';

export const Uncontrolled = () => {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>Uncontrolled SpinButton</Label>
      <SpinButton defaultValue={10} id={id} />
    </>
  );
};

Uncontrolled.parameters = {
  docs: {
    description: {
      story: `An uncontrolled SpinButton`,
    },
  },
};
