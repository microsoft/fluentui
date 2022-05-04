import * as React from 'react';
import { useAlert_unstable } from './useAlert';
import { renderAlert_unstable } from './renderAlert';
import { useAlertStyles_unstable } from './useAlertStyles';
import type { AlertProps } from './Alert.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Alert component - TODO: add more docs
 */
export const Alert: ForwardRefComponent<AlertProps> = React.forwardRef((props, ref) => {
  const state = useAlert_unstable(props, ref);

  useAlertStyles_unstable(state);
  return renderAlert_unstable(state);
});

Alert.displayName = 'Alert';
