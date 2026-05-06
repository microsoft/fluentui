'use client';

import type * as React from 'react';
import { useTextareaBase_unstable } from '@fluentui/react-textarea';

import type { TextareaProps, TextareaState } from './Textarea.types';

/**
 * Returns the state for a Textarea component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTextarea`.
 */
export const useTextarea = (props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>): TextareaState => {
  const state = useTextareaBase_unstable(props, ref);

  return state;
};
