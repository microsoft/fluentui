/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DialogTitleState, DialogTitleSlots } from './DialogTitle.types';

/**
 * Render the final JSX of DialogTitle
 */
export const renderDialogTitle_unstable = (state: DialogTitleState): JSXElement => {
  assertSlots<DialogTitleSlots>(state);

  return (
    <>
      <state.root>{state.root.children}</state.root>
      {state.action && <state.action />}
    </>
  );
};
