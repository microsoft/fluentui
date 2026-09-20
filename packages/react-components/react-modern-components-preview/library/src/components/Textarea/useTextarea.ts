'use client';

import type * as React from 'react';
import { useTextarea as useTextareaBase } from '@fluentui/react-headless-components-preview/textarea';
import type { TextareaProps, TextareaState } from './Textarea.types';

/**
 * Create the state required to render Textarea.
 */
export const useTextarea = (props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>): TextareaState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useTextareaBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-size': size,
    },
    appearance,
    size,
  };
};
