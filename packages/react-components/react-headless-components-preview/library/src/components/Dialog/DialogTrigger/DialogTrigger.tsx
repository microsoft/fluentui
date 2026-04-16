'use client';

import * as React from 'react';
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
