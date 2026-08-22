'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTextarea, useTextarea } from '@fluentui/react-headless-components-preview/textarea';

import type { TextareaProps, TextareaState } from './Textarea.types';
import { useTextareaStyles } from './useTextareaStyles';

/**
 * A Textarea lets people enter and edit multiple lines of text. Windmod Textarea: the headless
 * textarea decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Textarea: ForwardRefComponent<TextareaProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-textarea's styled useTextarea, minus its Field-context and
  // overrides-context fallbacks, which windmod ships no counterpart for.
  const { appearance = 'outline', size = 'medium', ...rest } = props;

  const state: TextareaState = {
    ...useTextarea(rest, ref),
    appearance,
    size,
  };

  return renderTextarea(useTextareaStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<TextareaProps>;

Textarea.displayName = 'Textarea';
