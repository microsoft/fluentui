import * as React from 'react';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useFocusableGroup, useFocusWithin } from '@fluentui/react-tabster';

import type { CardProps, CardState } from './Card.types';
import { useCardSelectable } from './useCardSelectable';
import { cardContextDefaultValue } from './CardContext';

const focusMap = {
  off: undefined,
  'no-tab': 'limited-trap-focus',
  'tab-exit': 'limited',
  'tab-only': 'unlimited',
} as const;

/**
 * Create the state for interactive cards.
 *
 * This internal hook defines if the card is interactive
 * and control focus properties based on that.
 *
 * @param props - props from this instance of Card
 */
const useCardInteractive = ({ focusMode: initialFocusMode, disabled = false, ...props }: CardProps) => {
  const interactive = (
    [
      'onClick',
      'onDoubleClick',
      'onMouseUp',
      'onMouseDown',
      'onPointerUp',
      'onPointerDown',
      'onTouchStart',
      'onTouchEnd',
      'onDragStart',
      'onDragEnd',
    ] as (keyof React.HTMLAttributes<HTMLElement>)[]
  ).some(prop => props[prop]);

  // default focusMode to tab-only when interactive, and off when not
  const focusMode = initialFocusMode ?? (interactive ? 'no-tab' : 'off');

  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[focusMode],
  });

  if (disabled) {
    return {
      interactive: false,
      focusAttributes: null,
    };
  }

  if (focusMode === 'off') {
    return {
      interactive,
      focusAttributes: null,
    };
  }

  return {
    interactive,
    focusAttributes: {
      ...groupperAttrs,
      tabIndex: 0,
    },
  };
};

/**
 * Create the state required to render Card.
 *
 * The returned state can be modified with hooks such as useCardStyles_unstable,
 * before being passed to renderCard_unstable.
 *
 * @param props - props from this instance of Card
 * @param ref - reference to the root element of Card
 */
export const useCard_unstable = (props: CardProps, ref: React.Ref<HTMLDivElement>): CardState => {
  const { appearance = 'filled', orientation = 'vertical', size = 'medium', disabled = false, ...restProps } = props;

  const [referenceId, setReferenceId] = React.useState(cardContextDefaultValue.selectableA11yProps.referenceId);
  const [referenceLabel, setReferenceLabel] = React.useState(cardContextDefaultValue.selectableA11yProps.referenceId);

  const cardBaseRef = useFocusWithin<HTMLDivElement>();
  const { selectable, selected, selectableCardProps, selectFocused, checkboxSlot, floatingActionSlot } =
    useCardSelectable(props, { referenceId, referenceLabel }, cardBaseRef);

  const cardRef = useMergedRefs(cardBaseRef, ref);

  const { interactive, focusAttributes } = useCardInteractive(props);

  let cardRootProps = {
    ...(!selectable ? focusAttributes : null),
    ...restProps,
    ...selectableCardProps,
  };

  if (disabled) {
    cardRootProps = {
      ...restProps,
      'aria-disabled': true,
      onClick: undefined,
    };
  }

  return {
    appearance,
    orientation,
    size,
    interactive,
    selectable,
    selectFocused,
    selected,
    disabled,
    selectableA11yProps: {
      setReferenceId,
      referenceId,
      referenceLabel,
      setReferenceLabel,
    },

    components: {
      root: 'div',
      floatingAction: 'div',
      checkbox: 'input',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: cardRef,
        role: 'group',
        ...cardRootProps,
      }),
      { elementType: 'div' },
    ),

    floatingAction: floatingActionSlot,
    checkbox: checkboxSlot,
  };
};
