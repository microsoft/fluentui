/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DialogFooterSlots, DialogFooterState } from './DialogFooter.types';

export const renderDialogFooter = (state: DialogFooterState): JSXElement => {
  assertSlots<DialogFooterSlots>(state);
  return <state.root />;
};
