'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDialogHeader, useDialogHeader } from '@fluentui/react-headless-components-preview/dialog';

import type { DialogHeaderProps } from './DialogHeader.types';
import { useDialogHeaderStyles } from './useDialogHeaderStyles';

/**
 * A DialogHeader is the `<header>` row of the dialog — the title beside whatever close affordance
 * the consumer supplies. It has no Griffel counterpart; windmod defines its look.
 */
export const DialogHeader: ForwardRefComponent<DialogHeaderProps> = React.forwardRef(
  (props: DialogHeaderProps, ref: React.Ref<HTMLElement>) =>
    renderDialogHeader(useDialogHeaderStyles(useDialogHeader(props, ref))),
);

DialogHeader.displayName = 'DialogHeader';
