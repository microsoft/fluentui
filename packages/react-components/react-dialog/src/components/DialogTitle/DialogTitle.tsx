import * as React from 'react';
import { useDialogTitle_unstable } from './useDialogTitle';
import { renderDialogTitle_unstable } from './renderDialogTitle';
import { useDialogTitleStyles_unstable } from './useDialogTitleStyles';
import type { DialogTitleProps } from './DialogTitle.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The `DialogTitle` component will expect to have a dialog title/header
 * and will show the close (X icon) button if specified so.
 * Apart from styling and presenting `closeButton`, this component does not have other behavior.
 */
export const DialogTitle: ForwardRefComponent<DialogTitleProps> = React.forwardRef((props, ref) => {
  const state = useDialogTitle_unstable(props, ref);

  useDialogTitleStyles_unstable(state);
  return renderDialogTitle_unstable(state);
});

DialogTitle.displayName = 'DialogTitle';
