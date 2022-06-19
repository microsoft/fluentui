import * as React from 'react';
import { useDialogTitle_unstable } from './useDialogTitle';
import { renderDialogTitle_unstable } from './renderDialogTitle';
import { useDialogTitleStyles_unstable } from './useDialogTitleStyles';
import type { DialogTitleProps } from './DialogTitle.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DialogTitle component - TODO: add more docs
 */
export const DialogTitle: ForwardRefComponent<DialogTitleProps> = React.forwardRef((props, ref) => {
  const state = useDialogTitle_unstable(props, ref);

  useDialogTitleStyles_unstable(state);
  return renderDialogTitle_unstable(state);
});

DialogTitle.displayName = 'DialogTitle';
