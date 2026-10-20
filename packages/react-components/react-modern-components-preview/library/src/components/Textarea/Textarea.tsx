'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTextarea } from './renderTextarea';
import type { TextareaProps } from './Textarea.types';
import { useTextarea } from './useTextarea';
import { useTextareaStyles } from './useTextareaStyles.styles';

/**
 * Textarea allows users to enter and edit multiline text.
 */
export const Textarea: ForwardRefComponent<TextareaProps> = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const state = useTextarea(props, ref);
    useTextareaStyles(state);
    return renderTextarea(state);
  },
);

Textarea.displayName = 'Textarea';
