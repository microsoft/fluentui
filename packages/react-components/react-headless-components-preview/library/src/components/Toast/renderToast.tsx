/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToastState, ToastSlots } from './Toast.types';

/**
 * Render the final JSX of Toast
 */
export const renderToast = (state: ToastState): JSXElement => {
  assertSlots<ToastSlots>(state);

  return <state.root />;
};
