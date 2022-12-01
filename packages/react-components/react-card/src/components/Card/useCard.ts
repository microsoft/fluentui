import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
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

type UseCardFocusAttributesOptions = {
  interactive: boolean;
};

const useCardFocusAttributes = ({ focusMode = 'off' }: CardProps, { interactive }: UseCardFocusAttributesOptions) => {
  const internalFocusMode = interactive ? 'no-tab' : focusMode;

  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[internalFocusMode],
  });

  if (internalFocusMode === 'off') {
    return null;
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
 * @param ref - reference to the root element of Card
 */
export const useCard_unstable = (props: CardProps, ref: React.Ref<HTMLDivElement>): CardState => {
  const { appearance = 'filled', orientation = 'vertical', size = 'medium', floatingAction } = props;

  const [referenceId, setReferenceId] = React.useState(cardContextDefaultValue.selectableA11yProps.referenceId);
  const [referenceLabel, setReferenceLabel] = React.useState(cardContextDefaultValue.selectableA11yProps.referenceId);

  const cardBaseRef = useFocusWithin<HTMLDivElement>();
  const { selectable, selected, selectableRef, selectableCardProps, selectFocused, checkboxSlot } = useCardSelectable(
    props,
    { referenceId, referenceLabel },
    cardBaseRef,
  );

  const cardRef = useMergedRefs(cardBaseRef, ref);

  const floatingActionSlot = React.useMemo(
    () =>
      resolveShorthand(floatingAction, {
        defaultProps: {
          ref: selectableRef,
        },
      }),
    [floatingAction, selectableRef],
  );

  const interactive = Boolean(
    props.onClick ||
      props.onDoubleClick ||
      props.onMouseUp ||
      props.onMouseDown ||
      props.onPointerUp ||
      props.onPointerDown ||
      props.onTouchStart ||
      props.onTouchEnd,
  );

  const focusAttributes = useCardFocusAttributes(props, { interactive });
  const selectableA11yProps = {
    setReferenceId,
    referenceId,
    referenceLabel,
    setReferenceLabel,
  };

  return {
    appearance,
    orientation,
    size,
    interactive,
    selectable,
    selectFocused,
    selected,
    selectableA11yProps,

    components: {
      root: 'div',
      floatingAction: 'div',
      checkbox: 'input',
    },

    root: getNativeElementProps('div', {
      ref: cardRef,
      role: 'group',
      ...focusAttributes,
      ...props,
      ...selectableCardProps,
    }),

    floatingAction: floatingActionSlot,
    checkbox: checkboxSlot,
  };
};
