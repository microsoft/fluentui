import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { CardCommons, CardProps, CardState } from './Card.types';
import { useFocusableGroup, UseFocusableGroupOptions } from '@fluentui/react-tabster';

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

  let groupperAttrs = {};
  if (focusable !== false) {
    const focusMap: { [key in Exclude<CardCommons['focusable'], boolean>]: UseFocusableGroupOptions['tabBehavior'] } = {
      noTab: 'limitedTrapFocus',
      tabExit: 'limited',
      tabOnly: 'unlimited',
    };

    groupperAttrs = useFocusableGroup({
      tabBehavior: focusable === true ? focusMap['noTab'] : focusMap[focusable],
    });
  }

  return {
    appearance,
    focusable,

    components: { root: 'div' },
    root: getNativeElementProps(props.as || 'div', {
      ref,
      role: 'group',
      ...groupperAttrs,
      ...props,
    }),
  };
};
