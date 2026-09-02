'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTextarea, useTextarea } from '@fluentui/react-headless-components-preview/textarea';
import { useFieldContext } from '@fluentui/react-headless-components-preview/field';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { TextareaProps } from './Textarea.types';
import { useTextareaStyles } from './useTextareaStyles';

/**
 * A Textarea lets people enter and edit multiple lines of text. Windmod Textarea: the headless
 * textarea decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Textarea: ForwardRefComponent<TextareaProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-textarea's styled useTextarea, including its Field-context
  // size fallback: `size = fieldContext?.size ?? 'medium'` (react-textarea useTextarea.ts:20, 23).
  // Only the look half of FieldContext is read here — its aria half is already applied by the
  // headless base hook via useFieldControlProps.
  // The overrides-context appearance fallback stays out: windmod ships no counterpart for it.
  const {
    appearance = 'outline',
    size = 'medium',
    ...rest
  } = mergeContextProps({ size: useFieldContext()?.size }, props);

  return renderTextarea(
    useTextareaStyles({
      ...useTextarea(rest, ref),
      appearance,
      size,
    }),
  );
});

Textarea.displayName = 'Textarea';
