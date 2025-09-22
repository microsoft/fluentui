/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverFooterState } from './TeachingPopoverFooter.types';
import { TeachingPopoverFooterSlots } from './TeachingPopoverFooter.types';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Render the final JSX of TeachingPopoverFooter
 */
export const renderTeachingPopoverFooter_unstable = (state: TeachingPopoverFooterState): JSXElement => {
  assertSlots<TeachingPopoverFooterSlots>(state);

  return (
    <state.root>
      <state.primary />
      {state.secondary && <state.secondary />}
    </state.root>
  );
};
