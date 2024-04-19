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
 * This component sole purpose is to avoid opting out of the internal controlled open state of a `Dialog`
 * Besides being a trigger that opens/close a dialog through context this component doesn't do much,
 * making it basically unnecessary in cases where the trigger is outside of the `Dialog` component.
 */
export const DialogTrigger: React.FC<DialogTriggerProps> = props => {
  const state = useDialogTrigger_unstable(props);

  return renderDialogTrigger_unstable(state);
};

DialogTrigger.displayName = 'DialogTrigger';
// type casting here is required to ensure internal type FluentTriggerComponent is not leaked
(DialogTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
