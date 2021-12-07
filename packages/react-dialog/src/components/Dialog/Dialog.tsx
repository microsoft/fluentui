import * as React from 'react';
import { useDialog } from './useDialog';
import { renderDialog } from './renderDialog';
import { useDialogStyles } from './useDialogStyles';
import type { DialogProps } from './Dialog.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Dialog component
 */
export const Dialog: ForwardRefComponent<DialogProps> = React.forwardRef((props, ref) => {
  const state = useDialog(props, ref);

  useDialogStyles(state);
  return renderDialog(state);
});

Dialog.displayName = 'Dialog';
