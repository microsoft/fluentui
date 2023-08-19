/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElement */

import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { ToastBodyState, ToastBodySlots } from './ToastBody.types';

/**
 * Render the final JSX of ToastBody
 */
export const renderToastBody_unstable = (state: ToastBodyState) => {
  assertSlots<ToastBodySlots>(state);

  return (
    <>
      <state.root />
      {state.subtitle ? <state.subtitle /> : null}
    </>
  );
};
