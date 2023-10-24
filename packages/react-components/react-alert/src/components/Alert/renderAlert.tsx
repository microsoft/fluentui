/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';

import type { AlertState, AlertSlots } from './Alert.types';

/**
 * @deprecated please use the Toast or MessageBar component
 */
// eslint-disable-next-line deprecation/deprecation
export const renderAlert_unstable = (state: AlertState) => {
  // eslint-disable-next-line deprecation/deprecation
  assertSlots<AlertSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.avatar && <state.avatar />}
      {state.root.children}
      {state.action && <state.action />}
    </state.root>
  );
};
