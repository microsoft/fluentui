/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TextareaBaseState, TextareaSlots } from './Textarea.types';

/**
 * Render the final JSX of Textarea
 */
export const renderTextarea_unstable = (state: TextareaBaseState): JSXElement => {
  assertSlots<TextareaSlots>(state);

  return (
    <state.root>
      <state.textarea />
    </state.root>
  );
};
