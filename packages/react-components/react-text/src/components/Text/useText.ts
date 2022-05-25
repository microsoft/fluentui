import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TextProps, TextState } from './Text.types';

/**
 * Create the state required to render Text.
 *
 * The returned state can be modified with hooks such as useTextStyles_unstable,
 * before being passed to renderText_unstable.
 *
 * @param props - props from this instance of Text
 * @param ref - reference to root HTMLElement of Text
 */
export const useText_unstable = (props: TextProps, ref: React.Ref<HTMLElement>): TextState => {
  const { wrap, truncate, block, italic, underline, strikethrough, size, font, weight, align } = props;
  const as = props.as ?? 'span';

  const state: TextState = {
    align: align ?? 'none',
    block: block ?? false,
    font: font ?? 'none',
    italic: italic ?? false,
    size: size ?? 'none',
    strikethrough: strikethrough ?? false,
    truncate: truncate ?? false,
    underline: underline ?? false,
    weight: weight ?? 'none',
    wrap: wrap ?? true,

    components: { root: 'span' },

    root: getNativeElementProps(as, {
      ref,
      ...props,
      as,
    }),
  };

  return state;
};
