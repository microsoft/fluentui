import * as React from 'react';
import { useDialogActions_unstable } from './useDialogActions';
import { renderDialogActions_unstable } from './renderDialogActions';
import { useDialogActionsStyles_unstable } from './useDialogActionsStyles.styles';
import type { DialogActionsProps } from './DialogActions.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * `DialogActions` is a container for the actions of the dialog.
 * Apart from styling, this component does not have other behavior.
 */
export const DialogActions: ForwardRefComponent<DialogActionsProps> = React.forwardRef((props, ref) => {
  const state = useDialogActions_unstable(props, ref);

  useDialogActionsStyles_unstable(state);

  useCustomStyleHook_unstable('useDialogActionsStyles_unstable')(state);

  return renderDialogActions_unstable(state);
});

DialogActions.displayName = 'DialogActions';
