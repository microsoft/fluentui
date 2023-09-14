import * as React from 'react';
import { mergeCallbacks, slot } from '@fluentui/react-utilities';
import { Enter } from '@fluentui/keyboard-keys';
import { useFocusFinders } from '@fluentui/react-tabster';

import type { CardContextValue, CardOnSelectionChangeEvent, CardProps, CardSlots } from './Card.types';

/**
 * @internal
 *
 * Create the state related to selectable cards.
 *
 * This internal hook controls all the logic for selectable cards and is
 * intended to be used alongside with useCard_unstable.
 *
 * @param props - props from this instance of Card
 * @param a11yProps - accessibility props shared between elements of the card
 * @param ref - reference to the root element of Card
 */
export const useCardSelectable = (
  props: CardProps,
  { referenceLabel, referenceId }: Pick<CardContextValue['selectableA11yProps'], 'referenceId' | 'referenceLabel'>,
  cardRef: React.RefObject<HTMLDivElement>,
) => {
  const { checkbox = {}, selected, defaultSelected, onSelectionChange, floatingAction, onClick, onKeyDown } = props;

  const { findAllFocusable } = useFocusFinders();

  const checkboxRef = React.useRef<HTMLInputElement>(null);

  const isSelectable = [selected, defaultSelected, onSelectionChange].some(prop => typeof prop !== 'undefined');

  const [isCardSelected, setIsCardSelected] = React.useState(false);
  const [isSelectFocused, setIsSelectFocused] = React.useState(false);

  const shouldRestrictTriggerAction = React.useCallback(
    (event: CardOnSelectionChangeEvent) => {
      if (!cardRef.current) {
        return false;
      }

      const focusableElements = findAllFocusable(cardRef.current);
      const target = event.target as HTMLElement;
      const isElementInFocusableGroup = focusableElements.some(element => element.contains(target));
      const isCheckboxSlot = checkboxRef?.current === target;

      return isElementInFocusableGroup && !isCheckboxSlot;
    },
    [cardRef, findAllFocusable],
  );

  const onChangeHandler = React.useCallback(
    (event: CardOnSelectionChangeEvent) => {
      if (shouldRestrictTriggerAction(event)) {
        return;
      }

      const newCheckedValue = !isCardSelected;

      setIsCardSelected(newCheckedValue);

      if (onSelectionChange) {
        onSelectionChange(event, { selected: newCheckedValue });
      }
    },
    [onSelectionChange, isCardSelected, shouldRestrictTriggerAction],
  );

  const onKeyDownHandler = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if ([Enter].includes(event.key)) {
        event.preventDefault();
        onChangeHandler(event);
      }
    },
    [onChangeHandler],
  );

  const checkboxSlot = React.useMemo(() => {
    if (!isSelectable || floatingAction) {
      return;
    }

    const selectableCheckboxProps: CardSlots['checkbox'] = {};

    if (referenceId) {
      selectableCheckboxProps['aria-labelledby'] = referenceId;
    } else if (referenceLabel) {
      selectableCheckboxProps['aria-label'] = referenceLabel;
    }

    return slot.optional(checkbox, {
      defaultProps: {
        ref: checkboxRef,
        type: 'checkbox',
        checked: isCardSelected,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(event),
        onFocus: () => setIsSelectFocused(true),
        onBlur: () => setIsSelectFocused(false),
        ...selectableCheckboxProps,
      },
      elementType: 'input',
    });
  }, [checkbox, floatingAction, isCardSelected, isSelectable, onChangeHandler, referenceId, referenceLabel]);

  const floatingActionSlot = React.useMemo(() => {
    if (!floatingAction) {
      return;
    }

    return slot.optional(floatingAction, {
      defaultProps: {
        ref: checkboxRef,
      },
      elementType: 'div',
    });
  }, [floatingAction]);

  const selectableCardProps = React.useMemo(() => {
    if (!isSelectable) {
      return null;
    }

    return {
      onClick: mergeCallbacks(onClick, onChangeHandler),
      onKeyDown: mergeCallbacks(onKeyDown, onKeyDownHandler),
    };
  }, [isSelectable, onChangeHandler, onClick, onKeyDown, onKeyDownHandler]);

  React.useEffect(
    () => setIsCardSelected(Boolean(defaultSelected ?? selected)),
    [defaultSelected, selected, setIsCardSelected],
  );

  return {
    selected: isCardSelected,
    selectable: isSelectable,
    selectFocused: isSelectFocused,
    selectableCardProps,
    checkboxSlot,
    floatingActionSlot,
  };
};
