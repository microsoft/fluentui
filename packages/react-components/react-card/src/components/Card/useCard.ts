import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { CardProps, CardState } from './Card.types';
import { useFocusableGroup } from '@fluentui/react-tabster';

/**
 * Create the state required to render Card.
 *
 * The returned state can be modified with hooks such as useCardStyles_unstable,
 * before being passed to renderCard_unstable.
 *
 * @param props - props from this instance of Card
 * @param ref - reference to root HTMLElement of Card
 */
export const useCard_unstable = (props: CardProps, ref: React.Ref<HTMLElement>): CardState => {
  const { appearance = 'filled', focusMode = 'off' } = props;

  const focusMap = {
    off: undefined,
    'no-tab': 'limitedTrapFocus',
    'tab-exit': 'limited',
    'tab-only': 'unlimited',
  } as const;

  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[focusMode],
  });

  const focusAttrs = focusMode !== 'off' ? { tabIndex: 0, ...groupperAttrs } : null;

  return {
    appearance,

    components: { root: 'div' },
    root: getNativeElementProps(props.as || 'div', {
      ref,
      role: 'group',
      ...focusAttrs,
      ...props,
    }),
  };
};
