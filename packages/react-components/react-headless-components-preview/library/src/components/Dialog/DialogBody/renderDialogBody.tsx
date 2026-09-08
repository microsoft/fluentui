/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DialogBodySlots, DialogBodyState } from './DialogBody.types';

export const renderDialogBody = (state: DialogBodyState): JSXElement => {
  assertSlots<DialogBodySlots>(state);
  return <state.root />;
};
