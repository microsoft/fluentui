'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DialogBodyProps } from './DialogBody.types';
import { renderDialogBody } from './renderDialogBody';
import { useDialogBody } from './useDialogBody';
import { useDialogBodyStyles } from './useDialogBodyStyles.styles';

/**
 * The scrollable content area of a Dialog.
 */
export const DialogBody: ForwardRefComponent<DialogBodyProps> = React.forwardRef((props, ref) => {
  const state = useDialogBody(props, ref);

  useDialogBodyStyles(state);

  return renderDialogBody(state);
});

DialogBody.displayName = 'DialogBody';
