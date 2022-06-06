import * as React from 'react';
import { renderTextarea_unstable } from './renderTextarea';
import { useTextarea_unstable } from './useTextarea';
import { useTextareaStyles_unstable } from './useTextareaStyles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TextareaProps } from './Textarea.types';

/**
 * The Textarea component allows the user to enter and edit text in multiple lines.
 */
export const Textarea: ForwardRefComponent<TextareaProps> = React.forwardRef((props, ref) => {
  const state = useTextarea_unstable(props, ref);

  useTextareaStyles_unstable(state);
  return renderTextarea_unstable(state);
});

Textarea.displayName = 'Textarea';
