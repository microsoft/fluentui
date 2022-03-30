import * as React from 'react';
import { useTextarea_unstable } from './useTextarea';
import { renderTextarea_unstable } from './renderTextarea';
import { useTextareaStyles_unstable } from './useTextareaStyles';
import type { TextareaProps } from './Textarea.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Textarea component - TODO: add more docs
 */
export const Textarea: ForwardRefComponent<TextareaProps> = React.forwardRef((props, ref) => {
  const state = useTextarea_unstable(props, ref);

  useTextareaStyles_unstable(state);
  return renderTextarea_unstable(state);
});

Textarea.displayName = 'Textarea';
