'use client';

import type * as React from 'react';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import { useDialogTrigger } from './useDialogTrigger';
import type { DialogTriggerProps } from './DialogTrigger.types';

/**
 * `DialogTrigger` clones its single child element and attaches click handling
 * to open or close the parent `Dialog`.
 *
 * When placed outside `DialogSurface`, it defaults to `action="open"`.
 * When placed inside `DialogSurface`, it defaults to `action="close"`.
 */
export const DialogTrigger: React.FC<DialogTriggerProps> = props => {
  const state = useDialogTrigger(props);
  return state.children;
};

DialogTrigger.displayName = 'DialogTrigger';

/**
 * Marks the DialogTrigger component as a FluentTriggerComponent by setting the isFluentTriggerComponent flag.
 * Uses type-casting to avoid exposing internal types in the public API.
 */
(DialogTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
