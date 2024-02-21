/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PickerOptionState, PickerOptionSlots } from './PickerOption.types';

/**
 * Render the final JSX of PickerOption
 */
export const renderPickerOption_unstable = (state: PickerOptionState) => {
  assertSlots<PickerOptionSlots>(state);

  return (
    <state.root>
      {state.media && <state.media />}
      {state.root.children}
      {state.secondaryContent && <state.secondaryContent />}
    </state.root>
  );
};
