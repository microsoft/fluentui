import * as React from 'react';
import { Progress } from '@fluentui/react-progress';

export const Determinate = () => {
  return <Progress value={0.5} />;
};

Determinate.parameters = {
  docs: {
    description: {
      story: `Progress can also come in a determinate form.
      The determinate form is useful for showing how much of a task has completed.`,
    },
  },
};
