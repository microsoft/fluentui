import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
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

  const state: TextState = {
    align: align ?? 'start',
    block: block ?? false,
    font: font ?? 'base',
    italic: italic ?? false,
    size: size ?? 300,
    strikethrough: strikethrough ?? false,
    truncate: truncate ?? false,
    underline: underline ?? false,
    weight: weight ?? 'regular',
    wrap: wrap ?? true,

    components: { root: 'span' },

    root: slot.always(
      getIntrinsicElementProps('span', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLHeadingElement & HTMLPreElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLHeadingElement & HTMLPreElement>,
        ...props,
      }),
      { elementType: 'span' },
    ),
  };

  return state;
};
