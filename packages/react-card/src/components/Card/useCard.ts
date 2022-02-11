import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { CardProps, CardState, CardRender } from './Card.types';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { renderCard_unstable } from './renderCard';

/**
 * Create the state required to render Card.
 *
 * The returned state can be modified with hooks such as useCardStyles_unstable,
 * before being passed to renderCard_unstable.
 *
 * @param props - props from this instance of Card
 * @param ref - reference to root HTMLElement of Card
 */
export const useCard_unstable = (props: CardProps, ref: React.Ref<HTMLElement>): [CardState, CardRender] => {
  const groupperAttrs = useFocusableGroup({
    tabBehavior: 'limitedTrapFocus',
  });

  const state: CardState = {
    components: { root: 'div' },

    root: getNativeElementProps(props.as || 'div', {
      ref,
      role: 'group',
      ...groupperAttrs,
      ...props,
    }),
  };

  return [state, renderCard_unstable];
};
