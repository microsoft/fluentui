/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TagPickerOptionSlots, TagPickerOptionState } from './TagPickerOption.types';

/**
 * Render the final JSX of TagPickerOption.
 *
 * Kept local rather than re-exporting `renderTagPickerOption_unstable`: the headless option is built
 * on the headless `Option` (Dropdown primitive), so its state/slots differ from the base option.
 */
export const renderTagPickerOption = (state: TagPickerOptionState): JSXElement => {
  assertSlots<TagPickerOptionSlots>(state);

  return (
    <state.root>
      {state.media && <state.media />}
      {state.root.children}
      {state.secondaryContent && <state.secondaryContent />}
    </state.root>
  );
};
