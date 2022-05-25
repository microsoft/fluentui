import * as React from 'react';
import { useDialog_unstable } from './useDialog';
import { renderDialog_unstable } from './renderDialog';
import { useDialogStyles_unstable } from './useDialogStyles';
import type { DialogProps } from './Dialog.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A Dialog is an elevated Card triggered by a user’s action.
 */
export const Dialog: ForwardRefComponent<DialogProps> = React.forwardRef((props, ref) => {
  const state = useDialog_unstable(props, ref);

  useDialogStyles_unstable(state);
  return renderDialog_unstable(state);
});

Dialog.displayName = 'Dialog';
