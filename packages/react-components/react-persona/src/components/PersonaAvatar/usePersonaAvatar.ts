import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { PersonaAvatarProps, PersonaAvatarState } from './PersonaAvatar.types';

/**
 * Create the state required to render PersonaAvatar.
 *
 * The returned state can be modified with hooks such as usePersonaAvatarStyles_unstable,
 * before being passed to renderPersonaAvatar_unstable.
 *
 * @param props - props from this instance of PersonaAvatar
 * @param ref - reference to root HTMLElement of PersonaAvatar
 */
export const usePersonaAvatar_unstable = (
  props: PersonaAvatarProps,
  ref: React.Ref<HTMLElement>,
): PersonaAvatarState => {
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
