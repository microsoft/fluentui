'use client';

import type * as React from 'react';
import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import { useDialogTrigger } from '@fluentui/react-headless-components-preview/dialog';

import type { DialogTriggerProps } from './DialogTrigger.types';
import { useDialogTriggerStyles } from './useDialogTriggerStyles';

/**
 * A DialogTrigger wires the consumer's own element to the dialog it opens or closes. Windmod
 * DialogTrigger: the headless trigger plus the marker pair, so a consumer can compose against the
 * trigger the same way they compose against any windmod component.
 */
export const DialogTrigger: React.FC<DialogTriggerProps> = (props: DialogTriggerProps): JSXElement | null =>
  useDialogTriggerStyles(useDialogTrigger(props)).children;

DialogTrigger.displayName = 'DialogTrigger';

/** Lets trigger utilities clone props through DialogTrigger. */
(DialogTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
