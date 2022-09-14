import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useFocusableGroup } from '@fluentui/react-tabster';

import type { CardProps, CardRefElement, CardState } from './Card.types';
import { useCardSelectable } from './useCardSelectable';

const focusMap = {
  off: undefined,
  'no-tab': 'limited-trap-focus',
  'tab-exit': 'limited',
  'tab-only': 'unlimited',
} as const;

const useCardFocusAttributes = ({ focusMode = 'off' }: CardProps, isInteractive: boolean) => {
  const internalFocusMode: CardProps['focusMode'] = isInteractive ? 'no-tab' : focusMode;

  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[internalFocusMode],
  });

  if (internalFocusMode === 'off') {
    return {};
  }

  return {
    ...groupperAttrs,
    tabIndex: 0,
  };
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
export const useCard_unstable = (props: CardProps, ref: React.Ref<CardRefElement>): CardState => {
  const { appearance = 'filled', orientation = 'vertical', size = 'medium', as = 'div' } = props;
  const cardRef = React.useRef<CardRefElement>(null);

  const { isSelectable, hasSelectSlot, selectableProps, selectableSlot, isCardSelected } = useCardSelectable(
    props,
    cardRef,
  );

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

  const focusAttributes = useCardFocusAttributes(props, isInteractive);

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
      ref: ref || cardRef,
      role: 'group',
      ...focusAttributes,
      ...props,
      ...selectableProps,
    }),

    select: selectableSlot,
  };
};
