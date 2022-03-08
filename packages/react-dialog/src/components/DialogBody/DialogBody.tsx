import * as React from 'react';
import { useDialogBody_unstable } from './useDialogBody';
import { renderDialogBody_unstable } from './renderDialogBody';
import { useDialogBodyStyles_unstable } from './useDialogBodyStyles';
import type { DialogBodyProps } from './DialogBody.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DialogBody component - TODO: add more docs
 */
export const DialogBody: ForwardRefComponent<DialogBodyProps> = React.forwardRef((props, ref) => {
  const state = useDialogBody_unstable(props, ref);

  useDialogBodyStyles_unstable(state);
  return renderDialogBody_unstable(state);
});

DialogBody.displayName = 'DialogBody';
