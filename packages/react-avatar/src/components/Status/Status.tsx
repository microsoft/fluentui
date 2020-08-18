import * as React from 'react';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
import { useStatus } from './useStatus';
import { StatusProps } from './Status.types';
import * as classes from './Status.scss';

// Create a hook to resolve classnames.
export const useStatusClasses = makeClasses(classes);

export const Status = React.forwardRef((props: StatusProps, ref: React.Ref<HTMLElement>) => {
  const { render, state } = useStatus(props, ref);

  useStatusClasses(state);

  return render(state);
});

Status.displayName = 'Status';
