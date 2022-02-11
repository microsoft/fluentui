import * as React from 'react';
import { useDialog_unstable } from './useDialog';
import type { DialogProps } from './Dialog.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A Dialog is an elevated Card triggered by a user’s action.
 */
export const Dialog: ForwardRefComponent<DialogProps> = React.forwardRef((props, ref) => {
  const [state, render] = useDialog_unstable(props, ref);
  return render(state);
});

Dialog.displayName = 'Dialog';
