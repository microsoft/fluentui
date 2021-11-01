import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { CardProps, CardState } from './Card.types';
import { useFocusableGroup, FocusableGroupTabBehavior } from '@fluentui/react-tabster';

/**
 * Create the state required to render Card.
 *
 * The returned state can be modified with hooks such as useCardStyles,
 * before being passed to renderCard.
 *
 * @param props - props from this instance of Card
 * @param ref - reference to root HTMLElement of Card
 */
export const useCard = (props: CardProps, ref: React.Ref<HTMLElement>): CardState => {
  const groupperAttrs = useFocusableGroup({
    tabBehavior: FocusableGroupTabBehavior.LimitedTrapFocus,
  });

  return {
    components: { root: 'div' },

    root: getNativeElementProps(props.as || 'div', {
      ref,
      role: 'group',
      ...groupperAttrs,
      ...props,
    }),
  };
};
