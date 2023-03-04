import * as React from 'react';
import { useDialogContent_unstable } from './useDialogContent';
import { renderDialogContent_unstable } from './renderDialogContent';
import { useDialogContentStyles_unstable } from './useDialogContentStyles';
import type { DialogContentProps } from './DialogContent.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * The `DialogContent` is a container where the content of the dialog is rendered.
 * Apart from styling, this component does not have other behavior.
 */
export const DialogContent: ForwardRefComponent<DialogContentProps> = React.forwardRef((props, ref) => {
  const state = useDialogContent_unstable(props, ref);

  useDialogContentStyles_unstable(state);

  const { useDialogContentStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderDialogContent_unstable(state);
});

DialogContent.displayName = 'DialogContent';
