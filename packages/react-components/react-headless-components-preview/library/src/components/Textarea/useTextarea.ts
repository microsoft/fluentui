'use client';

import type * as React from 'react';
import { useTextareaBase_unstable } from '@fluentui/react-textarea';

import type { TextareaProps, TextareaState } from './Textarea.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a Textarea component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTextarea`.
 */
export const useTextarea = (props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>): TextareaState => {
  const state: TextareaState = useTextareaBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.textarea.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-invalid'] = stringifyDataAttribute(
    state.textarea['aria-invalid'] === true || state.textarea['aria-invalid'] === 'true',
  );
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-resize'] = state.resize;

  return state;
};
