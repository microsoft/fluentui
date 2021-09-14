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
  const { wrap, truncate, block, italic, underline, strikethrough, size, font, weight, align } = props;
  return {
    wrap: wrap ?? true,
    truncate: truncate ?? false,
    block: block ?? false,
    italic: italic ?? false,
    underline: underline ?? false,
    strikethrough: strikethrough ?? false,
    size: size ?? 300,
    font: font ?? 'base',
    weight: weight ?? 'regular',
    align: align ?? 'start',

    components: { root: 'span' },

    root: getNativeElementProps(props.as ?? 'span', {
      ref,
      ...props,
    }),
  };
};
