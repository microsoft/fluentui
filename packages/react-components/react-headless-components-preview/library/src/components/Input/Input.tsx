'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InputProps } from './Input.types';
import { useInput } from './useInput';
import { renderInput } from './renderInput';
import { composeComponent } from '../../utils/composeComponent';

/**
 * An input component for text and other input types.
 */
export const Input: ForwardRefComponent<InputProps> = /*#__PURE__*/ composeComponent('Input', useInput, renderInput);
