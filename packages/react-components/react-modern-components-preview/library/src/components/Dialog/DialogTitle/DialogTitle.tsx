'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DialogTitleProps } from './DialogTitle.types';
import { renderDialogTitle } from './renderDialogTitle';
import { useDialogTitle } from './useDialogTitle';
import { useDialogTitleStyles } from './useDialogTitleStyles.styles';

/**
 * The heading that provides the accessible name for a Dialog.
 */
export const DialogTitle: ForwardRefComponent<DialogTitleProps> = React.forwardRef((props, ref) => {
  const state = useDialogTitle(props, ref);

  useDialogTitleStyles(state);

  return renderDialogTitle(state);
});

DialogTitle.displayName = 'DialogTitle';
