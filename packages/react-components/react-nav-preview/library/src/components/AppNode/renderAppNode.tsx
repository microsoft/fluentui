/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AppNodeState, AppNodeSlots } from './AppNode.types';

/**
 * Render the final JSX of AppNode
 */
export const renderAppNode_unstable = (state: AppNodeState) => {
  assertSlots<AppNodeSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
