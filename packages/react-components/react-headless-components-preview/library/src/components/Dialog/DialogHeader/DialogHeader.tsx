'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogHeader } from './useDialogHeader';
import { renderDialogHeader } from './renderDialogHeader';
import type { DialogHeaderProps } from './DialogHeader.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * `DialogHeader` is a `<header>` container for dialog title, subtitle, image,
 * and close button content.
 */
export const DialogHeader: ForwardRefComponent<DialogHeaderProps> = /*#__PURE__*/ composeComponent(
  'DialogHeader',
  useDialogHeader,
  renderDialogHeader,
);
