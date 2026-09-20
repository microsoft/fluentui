'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DialogHeaderProps } from './DialogHeader.types';
import { renderDialogHeader } from './renderDialogHeader';
import { useDialogHeader } from './useDialogHeader';
import { useDialogHeaderStyles } from './useDialogHeaderStyles.styles';

/**
 * A header container for the Dialog title and supporting content.
 */
export const DialogHeader: ForwardRefComponent<DialogHeaderProps> = React.forwardRef((props, ref) => {
  const state = useDialogHeader(props, ref);

  useDialogHeaderStyles(state);

  return renderDialogHeader(state);
});

DialogHeader.displayName = 'DialogHeader';
