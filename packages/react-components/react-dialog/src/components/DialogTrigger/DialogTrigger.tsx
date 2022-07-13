import * as React from 'react';
import { useDialogTrigger_unstable } from './useDialogTrigger';
import { renderDialogTrigger_unstable } from './renderDialogTrigger';
import type { DialogTriggerProps } from './DialogTrigger.types';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';

/**
 * A non-visual component that wraps its child
 * and configures them to be the trigger that will open or close a `Dialog`.
 * This component should only accept one child.
 *
 * In case the trigger is used outside `Dialog` component
 * it'll still provide basic ARIA related attributes
 * to it's wrapped child, but it won't be able to alter the dialog `open` state anymore,
 * in that case the user must provide a `controlled state`
 */
export const DialogTrigger: React.FC<DialogTriggerProps> & FluentTriggerComponent = props => {
  const state = useDialogTrigger_unstable(props);

  return renderDialogTrigger_unstable(state);
};

DialogTrigger.displayName = 'DialogTrigger';
DialogTrigger.isFluentTriggerComponent = true;
