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
const useCardInteractive = ({ focusMode = 'off', ...props }: CardProps) => {
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

  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[interactive ? 'no-tab' : focusMode],
  });

  const interactiveFocusAttributes = {
    ...groupperAttrs,
    tabIndex: 0,
  };

  return {
    interactive,
    focusAttributes: !interactive && focusMode === 'off' ? null : interactiveFocusAttributes,
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
  const { appearance = 'filled', orientation = 'vertical', size = 'medium' } = props;

  const [referenceId, setReferenceId] = React.useState(cardContextDefaultValue.selectableA11yProps.referenceId);
  const [referenceLabel, setReferenceLabel] = React.useState(cardContextDefaultValue.selectableA11yProps.referenceId);

  const cardBaseRef = useFocusWithin<HTMLDivElement>();
  const { selectable, selected, selectableCardProps, selectFocused, checkboxSlot, floatingActionSlot } =
    useCardSelectable(props, { referenceId, referenceLabel }, cardBaseRef);

  const cardRef = useMergedRefs(cardBaseRef, ref);

  const { interactive, focusAttributes } = useCardInteractive(props);

  return {
    appearance,
    orientation,
    size,
    interactive,
    selectable,
    selectFocused,
    selected,
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
        ...(!selectable ? focusAttributes : null),
        ...props,
        ...selectableCardProps,
      }),
      { elementType: 'div' },
    ),

    floatingAction: floatingActionSlot,
    checkbox: checkboxSlot,
  };
};
