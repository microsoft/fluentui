import * as React from 'react';
import { useDialogHeader_unstable } from './useDialogHeader';
import { renderDialogHeader_unstable } from './renderDialogHeader';
import { useDialogHeaderStyles_unstable } from './useDialogHeaderStyles';
import type { DialogHeaderProps } from './DialogHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DialogHeader component - TODO: add more docs
 */
export const DialogHeader: ForwardRefComponent<DialogHeaderProps> = React.forwardRef((props, ref) => {
  const state = useDialogHeader_unstable(props, ref);

  useDialogHeaderStyles_unstable(state);
  return renderDialogHeader_unstable(state);
});

DialogHeader.displayName = 'DialogHeader';
