import * as React from 'react';
import { useDialogContent_unstable } from './useDialogContent';
import { renderDialogContent_unstable } from './renderDialogContent';
import { useDialogContentStyles_unstable } from './useDialogContentStyles';
import type { DialogContentProps } from './DialogContent.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DialogContent component - TODO: add more docs
 */
export const DialogContent: ForwardRefComponent<DialogContentProps> = React.forwardRef((props, ref) => {
  const state = useDialogContent_unstable(props, ref);

  useDialogContentStyles_unstable(state);
  return renderDialogContent_unstable(state);
});

DialogContent.displayName = 'DialogContent';
