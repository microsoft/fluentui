import * as React from 'react';
import { renderTextArea_unstable } from './renderTextArea';
import { useTextArea_unstable } from './useTextArea';
import { useTextAreaStyles_unstable } from './useTextAreaStyles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TextAreaProps } from './TextArea.types';

/**
 * The TextArea component allows the user to enter and edit text in multiple lines.
 */
export const TextArea: ForwardRefComponent<TextAreaProps> = React.forwardRef((props, ref) => {
  const state = useTextArea_unstable(props, ref);

  useTextAreaStyles_unstable(state);
  return renderTextArea_unstable(state);
});

TextArea.displayName = 'TextArea';
