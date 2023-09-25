/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';

import type { AlertState, AlertSlots } from './Alert.types';

export const renderAlert_unstable = (state: AlertState) => {
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
