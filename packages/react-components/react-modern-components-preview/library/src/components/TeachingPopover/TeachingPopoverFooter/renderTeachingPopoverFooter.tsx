/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverFooterSlots, TeachingPopoverFooterState } from './TeachingPopoverFooter.types';

export const renderTeachingPopoverFooter = (state: TeachingPopoverFooterState): JSXElement => {
  assertSlots<TeachingPopoverFooterSlots>(state);
  return (
    <state.root>
      {state.secondary && <state.secondary />}
      <state.primary />
    </state.root>
  );
};
