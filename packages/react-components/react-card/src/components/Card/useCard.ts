import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useFocusableGroup } from '@fluentui/react-tabster';
import type { CardProps, CardRefElement, CardState } from './Card.types';

/**
 * Create the state required to render Card.
 *
 * The returned state can be modified with hooks such as useCardStyles_unstable,
 * before being passed to renderCard_unstable.
 *
 * @param props - props from this instance of Card
 * @param ref - reference to root HTMLElement of Card
 */
export const useCard_unstable = (props: CardProps, ref: React.Ref<CardRefElement>): CardState => {
  const { appearance = 'filled', focusMode = 'off', orientation = 'vertical', size = 'medium', as = 'div' } = props;

  const focusMap = {
    off: undefined,
    'no-tab': 'limited-trap-focus',
    'tab-exit': 'limited',
    'tab-only': 'unlimited',
  } as const;

  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[focusMode],
  });

  const focusAttrs = focusMode !== 'off' ? { tabIndex: 0, ...groupperAttrs } : null;

  const isInteractive = Boolean(
    ['a', 'button'].includes(as) ||
      props.onClick ||
      props.onDoubleClick ||
      props.onMouseUp ||
      props.onMouseDown ||
      props.onPointerUp ||
      props.onPointerDown ||
      props.onTouchStart ||
      props.onTouchEnd,
  );

  return {
    appearance,
    orientation,
    size,
    isInteractive,

    components: { root: as },
    root: getNativeElementProps(as, {
      ref,
      role: 'group',
      ...focusAttrs,
      ...props,
    }),
  };
};
