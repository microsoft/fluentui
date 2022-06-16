import * as React from 'react';
import { useDialog_unstable } from './useDialog';
import { renderDialog_unstable } from './renderDialog';
import { useDialogStyles_unstable } from './useDialogStyles';
import type { DialogProps } from './Dialog.types';
import { useDialogContextValues_unstable } from './useDialogContextValues';
import { ForwardRefComponent } from '@fluentui/react-utilities';

export const Dialog: ForwardRefComponent<DialogProps> = React.forwardRef((props, ref) => {
  const state = useDialog_unstable(props, ref);
  const contextValues = useDialogContextValues_unstable(state);

  useDialogStyles_unstable(state);
  return renderDialog_unstable(state, contextValues);
});

Dialog.displayName = 'Dialog';
