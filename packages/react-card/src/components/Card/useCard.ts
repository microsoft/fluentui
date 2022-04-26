import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { CardCommons, CardProps, CardState } from './Card.types';
import { useFocusableGroup, UseFocusableGroupOptions } from '@fluentui/react-tabster';

const getFocusStrategy = (focus: CardCommons['focusable']): UseFocusableGroupOptions['tabBehavior'] => {
  const focusMap = {
    'no-tab': 'limitedTrapFocus',
    'tab-exit': 'limited',
    'tab-only': 'unlimited',
  } as const;

  if (focus === false) {
    return undefined;
  }

  if (focus === true) {
    return focusMap['no-tab'];
  }

  return focusMap[focus];
};

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
  const { appearance = 'filled', focusable = false } = props;

  const groupperAttrs = useFocusableGroup({
    tabBehavior: getFocusStrategy(focusable),
  });

  return {
    appearance,
    focusable,

    components: { root: 'div' },
    root: getNativeElementProps(props.as || 'div', {
      ref,
      role: 'group',
      tabIndex: focusable !== false ? 0 : undefined,
      ...groupperAttrs,
      ...props,
    }),
  };
};
