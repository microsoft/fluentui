import * as React from 'react';
import { useTextArea_unstable } from './useTextArea';
import { renderTextArea_unstable } from './renderTextArea';
import { useTextAreaStyles_unstable } from './useTextAreaStyles';
import type { TextAreaProps } from './TextArea.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TextArea component - TODO: add more docs
 */
export const TextArea: ForwardRefComponent<TextAreaProps> = React.forwardRef((props, ref) => {
  const state = useTextArea_unstable(props, ref);

  useTextAreaStyles_unstable(state);
  return renderTextArea_unstable(state);
});

TextArea.displayName = 'TextArea';
