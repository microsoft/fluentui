import * as React from 'react';
import { useDialogContent_unstable } from './useDialogContent';
import { renderDialogContent_unstable } from './renderDialogContent';
import { useDialogContentStyles_unstable } from './useDialogContentStyles.styles';
import type { DialogContentProps } from './DialogContent.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * The `DialogContent` is a container where the content of the dialog is rendered.
 * Apart from styling, this component does not have other behavior.
 */
export const DialogContent: ForwardRefComponent<DialogContentProps> = React.forwardRef((props, ref) => {
  const state = useDialogContent_unstable(props, ref);

  useDialogContentStyles_unstable(state);

  useCustomStyleHook_unstable('useDialogContentStyles_unstable')(state);

  return renderDialogContent_unstable(state);
});

DialogContent.displayName = 'DialogContent';
