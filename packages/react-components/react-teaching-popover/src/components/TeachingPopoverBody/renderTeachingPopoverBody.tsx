/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverBodyState } from './TeachingPopoverBody.types';
import { TeachingPopoverBodySlots } from './TeachingPopoverBody.types';
import { assertSlots } from '@fluentui/react-utilities';

/**
 * Render the final JSX of TeachingPopoverBody
 */
export const renderTeachingPopoverBody_unstable = (state: TeachingPopoverBodyState) => {
  assertSlots<TeachingPopoverBodySlots>(state);

  return (
    <state.root>
      {state.media && <state.media />}
      {state.root.children}
    </state.root>
  );
};
