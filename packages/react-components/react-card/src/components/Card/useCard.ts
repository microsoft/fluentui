import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useFocusableGroup } from '@fluentui/react-tabster';
import type { CardProps, CardRefElement, CardState } from './Card.types';
import { useCardSelectable } from './useCardSelectable';

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

  const { isSelectable, hasSelectSlot, selectableProps, selectableSlot, isCardSelected } = useCardSelectable(props);

  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[focusMode],
  });

  const focusAttrs = focusMode !== 'off' ? { ...groupperAttrs } : null;

  const isInteractive = Boolean(
    isSelectable ||
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
    isSelectable,
    hasSelectSlot,
    isCardSelected,

    components: {
      root: as,
      select: 'div',
    },

    root: getNativeElementProps(as, {
      ref,
      role: 'group',
      tabIndex: focusMode !== 'off' ? 0 : undefined,
      ...focusAttrs,
      ...props,
      ...selectableProps,
    }),

    select: selectableSlot,
  };
};
