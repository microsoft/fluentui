/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { ToastFooterState, ToastFooterSlots } from './ToastFooter.types';

/**
 * Render the final JSX of ToastFooter
 */
export const renderToastFooter_unstable = (state: ToastFooterState) => {
  assertSlots<ToastFooterSlots>(state);

  return <state.root />;
};
