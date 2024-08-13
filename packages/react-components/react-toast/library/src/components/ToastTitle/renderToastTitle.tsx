/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ToastTitleState, ToastTitleSlots } from './ToastTitle.types';

/**
 * Render the final JSX of ToastTitle
 */
export const renderToastTitle_unstable = (state: ToastTitleState) => {
  assertSlots<ToastTitleSlots>(state);

  return (
    <>
      {state.media ? <state.media /> : null}
      <state.root />
      {state.action ? <state.action /> : null}
    </>
  );
};
