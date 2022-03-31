import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TextareaProps, TextareaState } from './Textarea.types';

/**
 * Create the state required to render Textarea.
 *
 * The returned state can be modified with hooks such as useTextareaStyles_unstable,
 * before being passed to renderTextarea_unstable.
 *
 * @param props - props from this instance of Textarea
 * @param ref - reference to root HTMLElement of Textarea
 */
export const useTextarea_unstable = (props: TextareaProps, ref: React.Ref<HTMLElement>): TextareaState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
