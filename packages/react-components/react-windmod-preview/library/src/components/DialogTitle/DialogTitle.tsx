'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDialogTitle, useDialogTitle } from '@fluentui/react-headless-components-preview/dialog';

import type { DialogTitleProps } from './DialogTitle.types';
import { useDialogTitleStyles } from './useDialogTitleStyles';

/**
 * A DialogTitle is the dialog's heading, and the target of the surface's `aria-labelledby`.
 * Windmod DialogTitle: the headless title decorated with the Fluent visual contract.
 */
export const DialogTitle: ForwardRefComponent<DialogTitleProps> = React.forwardRef(
  (props: DialogTitleProps, ref: React.Ref<HTMLHeadingElement>) =>
    renderDialogTitle(useDialogTitleStyles(useDialogTitle(props, ref))),
);

DialogTitle.displayName = 'DialogTitle';
