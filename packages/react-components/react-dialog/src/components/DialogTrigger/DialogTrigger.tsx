import * as React from 'react';
import { useDialogTrigger_unstable } from './useDialogTrigger';
import { renderDialogTrigger_unstable } from './renderDialogTrigger';
import type { DialogTriggerProps } from './DialogTrigger.types';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';

/**
 * Wraps a trigger element as an only child
 * and adds the necessary event handling to open a popup menu
 */
export const DialogTrigger: React.FC<DialogTriggerProps> & FluentTriggerComponent = props => {
  const state = useDialogTrigger_unstable(props);

  return renderDialogTrigger_unstable(state);
};

DialogTrigger.displayName = 'DialogTrigger';
DialogTrigger.isFluentTriggerComponent = true;
