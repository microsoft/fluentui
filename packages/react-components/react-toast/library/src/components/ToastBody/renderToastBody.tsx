/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToastBodyState, ToastBodySlots } from './ToastBody.types';

/**
 * Render the final JSX of ToastBody
 */
export const renderToastBody_unstable = (state: ToastBodyState): JSXElement => {
  assertSlots<ToastBodySlots>(state);

  return (
    <>
      <state.root />
      {state.subtitle ? <state.subtitle /> : null}
    </>
  );
};
