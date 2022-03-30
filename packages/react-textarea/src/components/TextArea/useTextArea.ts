import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TextAreaProps, TextAreaState } from './TextArea.types';

/**
 * Create the state required to render TextArea.
 *
 * The returned state can be modified with hooks such as useTextAreaStyles_unstable,
 * before being passed to renderTextArea_unstable.
 *
 * @param props - props from this instance of TextArea
 * @param ref - reference to root HTMLElement of TextArea
 */
export const useTextArea_unstable = (props: TextAreaProps, ref: React.Ref<HTMLElement>): TextAreaState => {
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
