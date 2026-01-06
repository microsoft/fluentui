/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DialogContentState, DialogContentSlots } from './DialogContent.types';

/**
 * Render the final JSX of DialogContent
 */
export const renderDialogContent_unstable = (state: DialogContentState): JSXElement => {
  assertSlots<DialogContentSlots>(state);

  return <state.root />;
};
