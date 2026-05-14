/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DialogActionsSlots, DialogActionsState } from './DialogActions.types';

export const renderDialogActions = (state: DialogActionsState): JSXElement => {
  assertSlots<DialogActionsSlots>(state);
  return <state.root />;
};
