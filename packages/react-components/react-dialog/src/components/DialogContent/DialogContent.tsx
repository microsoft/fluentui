import * as React from 'react';
import { useDialogContent_unstable } from './useDialogContent';
import { renderDialogContent_unstable } from './renderDialogContent';
import { useDialogContentStyles_unstable } from './useDialogContentStyles';
import type { DialogContentProps } from './DialogContent.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogContextValues_unstable } from './useDialogContentContextValues';

/**
 * DialogContent component represents the visual part of a `Dialog` as a whole,
 * it contains everything that should be visible.
 */
export const DialogContent: ForwardRefComponent<DialogContentProps> = React.forwardRef((props, ref) => {
  const state = useDialogContent_unstable(props, ref);

  useDialogContentStyles_unstable(state);
  const contextValues = useDialogContextValues_unstable(state);
  return renderDialogContent_unstable(state, contextValues);
});

DialogContent.displayName = 'DialogContent';
