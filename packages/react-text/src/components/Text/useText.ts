import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TextProps, TextState } from './Text.types';

/**
 * Create the state required to render Text.
 *
 * The returned state can be modified with hooks such as useTextStyles,
 * before being passed to renderText.
 *
 * @param props - props from this instance of Text
 * @param ref - reference to root HTMLElement of Text
 */
export const useText = (props: TextProps, ref: React.Ref<HTMLElement>): TextState => {
  return {
    wrap: true,
    truncate: false,
    block: false,
    italic: false,
    underline: false,
    strikethrough: false,
    size: 300,
    font: 'base',
    weight: 'regular',
    align: 'start',

    components: { root: 'span' },

    ...props,

    root: getNativeElementProps(props.as || 'span', {
      ref,
      ...props,
    }),
  };
};
