'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogBody } from './useDialogBody';
import { renderDialogBody } from './renderDialogBody';
import type { DialogBodyProps } from './DialogBody.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * `DialogBody` is the scrollable content area of the dialog.
 * Place primary content — text, forms, lists — inside this component.
 */
export const DialogBody: ForwardRefComponent<DialogBodyProps> = /*#__PURE__*/ composeComponent(
  'DialogBody',
  useDialogBody,
  renderDialogBody,
);
