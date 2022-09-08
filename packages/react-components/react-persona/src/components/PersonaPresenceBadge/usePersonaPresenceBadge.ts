import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { PersonaPresenceBadgeProps, PersonaPresenceBadgeState } from './PersonaPresenceBadge.types';

/**
 * Create the state required to render PersonaPresenceBadge.
 *
 * The returned state can be modified with hooks such as usePersonaPresenceBadgeStyles_unstable,
 * before being passed to renderPersonaPresenceBadge_unstable.
 *
 * @param props - props from this instance of PersonaPresenceBadge
 * @param ref - reference to root HTMLElement of PersonaPresenceBadge
 */
export const usePersonaPresenceBadge_unstable = (
  props: PersonaPresenceBadgeProps,
  ref: React.Ref<HTMLElement>,
): PersonaPresenceBadgeState => {
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
