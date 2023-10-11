import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { TextStateProps, TextProps, TextState } from './Text.types';

const defaultProps: Required<Pick<TextProps, TextStateProps>> = {
  align: 'start',
  block: false,
  disableDefaultStyling: false,
  font: 'base',
  italic: false,
  size: 300,
  strikethrough: false,
  truncate: false,
  underline: false,
  weight: 'regular',
  wrap: true,
};

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
  const { align, block, disableDefaultStyling, font, italic, size, strikethrough, truncate, underline, weight, wrap } =
    props.disableDefaultStyling ? props : { ...defaultProps, ...props };
  const as = props.as ?? 'span';

  const state: TextState = {
    align,
    block,
    disableDefaultStyling,
    font,
    italic,
    size,
    strikethrough,
    truncate,
    underline,
    weight,
    wrap,

    components: { root: 'span' },

    root: slot.always(
      getNativeElementProps(as, {
        ref,
        ...props,
        as,
      }),
      { elementType: 'span' },
    ),
  };

  return state;
};
