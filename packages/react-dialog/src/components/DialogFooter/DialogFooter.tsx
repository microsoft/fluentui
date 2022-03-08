import * as React from 'react';
import { useDialogFooter_unstable } from './useDialogFooter';
import { renderDialogFooter_unstable } from './renderDialogFooter';
import { useDialogFooterStyles_unstable } from './useDialogFooterStyles';
import type { DialogFooterProps } from './DialogFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DialogFooter component - TODO: add more docs
 */
export const DialogFooter: ForwardRefComponent<DialogFooterProps> = React.forwardRef((props, ref) => {
  const state = useDialogFooter_unstable(props, ref);

  useDialogFooterStyles_unstable(state);
  return renderDialogFooter_unstable(state);
});

DialogFooter.displayName = 'DialogFooter';
