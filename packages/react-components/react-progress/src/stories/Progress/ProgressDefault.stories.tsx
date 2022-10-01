import * as React from 'react';
import { Progress, ProgressProps } from '@fluentui/react-progress';

export const Default = (props: Partial<ProgressProps>) => {
  return <Progress {...props} percentComplete={50} />;
};

Default.parameters = {
  docs: {
    description: {
      story: `Default determinate Progress bar`,
    },
  },
};
