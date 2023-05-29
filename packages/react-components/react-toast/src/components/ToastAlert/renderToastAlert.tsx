/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';

import type { ToastAlertState, ToastAlertSlots } from './ToastAlert.types';

export const renderToastAlert_unstable = (state: ToastAlertState) => {
  assertSlots<ToastAlertSlots>(state);

  return (
    <state.root>
      {state.media && <state.media />}
      {state.root.children}
      {state.action && <state.action />}
    </state.root>
  );
};
