import * as React from 'react';
import { Progress, ProgressProps } from '@fluentui/react-progress';

export const Default = (props: Partial<ProgressProps>) => {
  return <Progress {...props} value={0.5} />;
};

Default.parameters = {
  docs: {
    description: {
      story: `Determinate Progress bar`,
    },
  },
};
