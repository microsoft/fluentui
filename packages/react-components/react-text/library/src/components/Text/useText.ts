import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import { useText } from '../../providers/TextProvider';
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
  const { align, block, font, italic, size, strikethrough, truncate, underline, weight, wrap } = props;
  const providerDefaults = useText();

  const defaultValues = {
    align: align ?? providerDefaults.align ?? 'start',
    block: block ?? providerDefaults.block ?? false,
    font: font ?? providerDefaults.font ?? 'base',
    italic: italic ?? providerDefaults.italic ?? false,
    size: size ?? providerDefaults.size ?? 300,
    strikethrough: strikethrough ?? providerDefaults.strikethrough ?? false,
    truncate: truncate ?? providerDefaults.truncate ?? false,
    underline: underline ?? providerDefaults.underline ?? false,
    weight: weight ?? providerDefaults.weight ?? 'regular',
    wrap: wrap ?? providerDefaults.wrap ?? true,
  };

  const state: TextState = {
    ...defaultValues,

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
