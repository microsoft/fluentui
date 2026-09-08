/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DialogHeaderSlots, DialogHeaderState } from './DialogHeader.types';

export const renderDialogHeader = (state: DialogHeaderState): JSXElement => {
  assertSlots<DialogHeaderSlots>(state);
  return <state.root />;
};
