import * as React from 'react';

import { renderAlert_unstable } from './renderAlert';
import { useAlert_unstable } from './useAlert';
import { useAlertStyles_unstable } from './useAlertStyles';

import type { AlertProps } from './Alert.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * An Alert component displays a brief, important message to attract a user's attention
 *  without interrupting their current task.
 */
export const Alert: ForwardRefComponent<AlertProps> = React.forwardRef((props, ref) => {
  const state = useAlert_unstable(props, ref);

  useAlertStyles_unstable(state);
  return renderAlert_unstable(state);
}) as ForwardRefComponent<AlertProps>;

Alert.displayName = 'Alert';
