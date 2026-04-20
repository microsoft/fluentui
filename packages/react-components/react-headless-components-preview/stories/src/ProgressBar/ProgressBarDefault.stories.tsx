import * as React from 'react';
import { ProgressBar } from '@fluentui/react-headless-components-preview';

export const Default = (): React.ReactNode => {
  return (
    <ProgressBar
      className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200"
      bar={{ className: 'h-full rounded-full bg-gray-900 transition-all duration-500 ease-out' }}
      value={0.5}
    />
  );
};
