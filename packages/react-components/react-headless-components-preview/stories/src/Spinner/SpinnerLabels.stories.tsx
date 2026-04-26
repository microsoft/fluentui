import * as React from 'react';
import { Spinner } from '@fluentui/react-headless-components-preview';
import { SpinnerIosRegular } from '@fluentui/react-icons';

export const Labels = (): React.ReactNode => (
  <Spinner
    className="flex items-center gap-2"
    label="Loading..."
    spinnerTail={{
      className: 'flex animate-spin origin-center size-5 text-gray-900',
      children: <SpinnerIosRegular className="size-full" />,
    }}
  />
);
