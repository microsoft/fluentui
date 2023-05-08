import * as React from 'react';
import { useDialogTitle_unstable } from './useDialogTitle';
import { renderDialogTitle_unstable } from './renderDialogTitle';
import { useDialogTitleStyles_unstable } from './useDialogTitleStyles.styles';
import type { DialogTitleProps } from './DialogTitle.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * The `DialogTitle` component expects to have a title/header
 * and when `Dialog` is `non-modal` a close (X icon) button is provided through `action` slot by default.
 */
export const DialogTitle: ForwardRefComponent<DialogTitleProps> = React.forwardRef((props, ref) => {
  const state = useDialogTitle_unstable(props, ref);

  useDialogTitleStyles_unstable(state);

  useCustomStyleHook_unstable('useDialogTitleStyles_unstable')(state);

  return renderDialogTitle_unstable(state);
});

DialogTitle.displayName = 'DialogTitle';
