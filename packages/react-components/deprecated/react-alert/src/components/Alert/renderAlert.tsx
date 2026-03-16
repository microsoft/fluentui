/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type * as React from 'react';

import type { AlertState, AlertSlots } from './Alert.types';

/**
 * @deprecated please use the Toast or MessageBar component
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const renderAlert_unstable = (state: AlertState): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
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
