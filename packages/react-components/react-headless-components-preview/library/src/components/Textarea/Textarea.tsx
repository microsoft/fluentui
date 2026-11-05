'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TextareaProps } from './Textarea.types';
import { useTextarea } from './useTextarea';
import { renderTextarea } from './renderTextarea';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A textarea component for multi-line text input.
 */
export const Textarea: ForwardRefComponent<TextareaProps> = /*#__PURE__*/ composeComponent(
  'Textarea',
  useTextarea,
  renderTextarea,
);
