/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TextareaState, TextareaSlots } from './Textarea.types';

/**
 * Render the final JSX of Textarea
 */
export const renderTextarea_unstable = (state: TextareaState) => {
  assertSlots<TextareaSlots>(state);

  return (
    <state.root>
      <state.textarea />
    </state.root>
  );
};
