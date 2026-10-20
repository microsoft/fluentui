'use client';

import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import type { DialogTriggerProps } from './DialogTrigger.types';
import { useDialogTrigger } from './useDialogTrigger';

/**
 * A non-visual component that configures its child to open or close a Dialog.
 */
export const DialogTrigger = (props: DialogTriggerProps): JSXElement | null => {
  const state = useDialogTrigger(props);

  return state.children;
};

DialogTrigger.displayName = 'DialogTrigger';
(DialogTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
