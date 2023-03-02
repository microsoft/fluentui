import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { TagProps, TagState } from './Tag.types';
import { Persona } from '@fluentui/react-persona';

/**
 * Create the state required to render Tag.
 *
 * The returned state can be modified with hooks such as useTagStyles_unstable,
 * before being passed to renderTag_unstable.
 *
 * @param props - props from this instance of Tag
 * @param ref - reference to root HTMLElement of Tag
 */
export const useTag_unstable = (props: TagProps, ref: React.Ref<HTMLElement>): TagState => {
  return {
    components: {
      root: 'div',
      content: 'span',
      persona: Persona,
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
      dismiss: 'span',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    content: resolveShorthand(props.content, { required: true }),
    persona: resolveShorthand(props.persona),
    icon: resolveShorthand(props.icon),
    primaryText: resolveShorthand(props.primaryText),
    secondaryText: resolveShorthand(props.secondaryText),
    dismiss: resolveShorthand(props.dismiss),
  };
};
