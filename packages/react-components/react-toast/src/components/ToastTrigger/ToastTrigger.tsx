import * as React from 'react';
import { useToastTrigger_unstable } from './useToastTrigger';
import { renderToastTrigger_unstable } from './renderToastTrigger';
import type { ToastTriggerProps } from './ToastTrigger.types';

/**
 * ToastTrigger component
 */
export const ToastTrigger: React.FC<ToastTriggerProps> = props => {
  const state = useToastTrigger_unstable(props);

  return renderToastTrigger_unstable(state);
};

ToastTrigger.displayName = 'ToastTrigger';
