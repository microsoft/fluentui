'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogBody } from './useDialogBody';
import { renderDialogBody } from './renderDialogBody';
import type { DialogBodyProps } from './DialogBody.types';

/**
 * `DialogBody` is the scrollable content area of the dialog.
 * Place primary content — text, forms, lists — inside this component.
 */
export const DialogBody: ForwardRefComponent<DialogBodyProps> = React.forwardRef((props, ref) => {
  const state = useDialogBody(props, ref);
  return renderDialogBody(state);
});

DialogBody.displayName = 'DialogBody';
