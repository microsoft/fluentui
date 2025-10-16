'use client';

import * as React from 'react';

import { renderAlert_unstable } from './renderAlert';
import { useAlert_unstable } from './useAlert';
import { useAlertStyles_unstable } from './useAlertStyles.styles';

import type { AlertProps } from './Alert.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * @deprecated please use the Toast or MessageBar component
 * An Alert component displays a brief, important message to attract a user's attention
 *  without interrupting their current task.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const Alert: ForwardRefComponent<AlertProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const state = useAlert_unstable(props, ref);

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  useAlertStyles_unstable(state);
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return renderAlert_unstable(state);
  // eslint-disable-next-line @typescript-eslint/no-deprecated
}) as ForwardRefComponent<AlertProps>;

// eslint-disable-next-line @typescript-eslint/no-deprecated
Alert.displayName = 'Alert';
