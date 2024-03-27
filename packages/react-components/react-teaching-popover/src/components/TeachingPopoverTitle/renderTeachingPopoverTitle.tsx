/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import { assertSlots } from '@fluentui/react-utilities';
import { TeachingPopoverTitleSlots } from './TeachingPopoverTitle.types';

/**
 * Render the final JSX of TeachingPopoverTitle
 */
export const renderTeachingPopoverTitle_unstable = (state: TeachingPopoverTitleState) => {
  assertSlots<TeachingPopoverTitleSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.dismissButton && <state.dismissButton />}
    </state.root>
  );
};
