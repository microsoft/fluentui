/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type {
  TagPickerControlState,
  TagPickerControlSlots,
  TagPickerControlInternalSlots,
} from './TagPickerControl.types';

/**
 * Render the final JSX of PickerControl
 */
export const renderTagPickerControl_unstable = (state: TagPickerControlState) => {
  assertSlots<TagPickerControlSlots & TagPickerControlInternalSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.aside && (
        <state.aside>
          {state.secondaryAction && <state.secondaryAction />}
          {state.expandIcon && <state.expandIcon />}
        </state.aside>
      )}
    </state.root>
  );
};
