'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDialogBody, useDialogBody } from '@fluentui/react-headless-components-preview/dialog';

import type { DialogBodyProps } from './DialogBody.types';
import { useDialogBodyStyles } from './useDialogBodyStyles';

/**
 * A DialogBody is the dialog's scrollable content area. Windmod DialogBody: the headless body
 * decorated with the Fluent visual contract — which is Griffel's DialogContent look, the member
 * this one corresponds to.
 */
export const DialogBody: ForwardRefComponent<DialogBodyProps> = React.forwardRef((props, ref) =>
  renderDialogBody(useDialogBodyStyles(useDialogBody(props, ref))),
);

DialogBody.displayName = 'DialogBody';
