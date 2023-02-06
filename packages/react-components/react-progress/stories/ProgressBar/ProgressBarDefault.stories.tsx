import * as React from 'react';
import { ProgressBar, ProgressBarProps } from '@fluentui/react-progress';

export const Default = (props: Partial<ProgressBarProps>) => {
  return <ProgressBar {...props} value={0.5} />;
};
