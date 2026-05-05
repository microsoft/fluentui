'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TextareaProps } from './Textarea.types';
import { useTextarea } from './useTextarea';
import { renderTextarea } from './renderTextarea';

/**
 * A textarea component for multi-line text input.
 */
export const Textarea: ForwardRefComponent<TextareaProps> = React.forwardRef((props, ref) => {
  const state = useTextarea(props, ref);

  return renderTextarea(state);
});

Textarea.displayName = 'Textarea';
