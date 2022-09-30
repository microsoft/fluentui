import * as React from 'react';
import { Progress } from '@fluentui/react-progress';

export const Indeterminate = () => {
  return <Progress indeterminate={true} label="Indeterminate Progress" />;
};

Indeterminate.parameters = {
  docs: {
    description: {
      story: `Progress can also come in an indeterminate form.
      The indeterminate form is useful for showing a buffer or loading state.`,
    },
  },
};
