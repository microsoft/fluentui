import * as React from 'react';

import { useId, Label } from '@fluentui/react-components';
import { Slider } from '@fluentui/react-modern-components-preview/slider';

export const Default = (): React.ReactNode => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Basic Example</Label>
      <Slider defaultValue={20} id={id} />
    </>
  );
};

Default.parameters = {
  docs: {
    description: {
      story: 'A default slider',
    },
  },
};
