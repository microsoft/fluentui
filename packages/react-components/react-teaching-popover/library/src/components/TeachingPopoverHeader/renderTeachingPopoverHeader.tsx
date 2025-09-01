/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';
import { TeachingPopoverHeaderSlots } from './TeachingPopoverHeader.types';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Render the final JSX of TeachingPopoverHeader
 */
export const renderTeachingPopoverHeader_unstable = (state: TeachingPopoverHeaderState): JSXElement => {
  assertSlots<TeachingPopoverHeaderSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.root.children}
      {state.dismissButton && <state.dismissButton />}
    </state.root>
  );
};
