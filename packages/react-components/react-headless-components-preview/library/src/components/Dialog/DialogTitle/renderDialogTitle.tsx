/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DialogTitleSlots, DialogTitleState } from './DialogTitle.types';

export const renderDialogTitle = (state: DialogTitleState): JSXElement => {
  assertSlots<DialogTitleSlots>(state);
  return <state.root />;
};
