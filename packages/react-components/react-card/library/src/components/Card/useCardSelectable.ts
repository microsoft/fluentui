import * as React from 'react';
import { mergeCallbacks, slot, useControllableState } from '@fluentui/react-utilities';
import { Enter } from '@fluentui/keyboard-keys';
import { useFocusFinders } from '@fluentui/react-tabster';

import type { CardContextValue, CardOnSelectionChangeEvent, CardProps, CardSlots, CardState } from './Card.types';

type SelectableA11yProps = Pick<CardContextValue['selectableA11yProps'], 'referenceId' | 'referenceLabel'>;

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
 * @param cardRef - reference to the root element of Card
 */
export const useCardSelectable = (
  props: CardProps,
  { referenceLabel, referenceId }: SelectableA11yProps,
  cardRef: React.RefObject<HTMLDivElement | null>,
): {
  selected: boolean;
  selectable: boolean;
  selectFocused: boolean;
  selectableCardProps: {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  } | null;
  checkboxSlot: CardState['checkbox'];
  floatingActionSlot: CardState['floatingAction'];
} => {
  const { checkbox = {}, onSelectionChange, floatingAction, onClick, onKeyDown, disabled } = props;

  const { findAllFocusable } = useFocusFinders();
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useControllableState({
    state: props.selected,
    defaultState: props.defaultSelected,
    initialState: false,
  });
  const selectable = [props.selected, props.defaultSelected, onSelectionChange].some(
    prop => typeof prop !== 'undefined',
  );

  const [selectFocused, setSelectFocused] = React.useState(false);

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
      if (disabled || shouldRestrictTriggerAction(event)) {
        return;
      }

      const newCheckedValue = !selected;

      setSelected(newCheckedValue);

      if (onSelectionChange) {
        onSelectionChange(event, { selected: newCheckedValue });
      }
    },
    [disabled, onSelectionChange, selected, setSelected, shouldRestrictTriggerAction],
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
    if (!selectable || floatingAction) {
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
        checked: selected,
        disabled,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(event),
        onFocus: () => setSelectFocused(true),
        onBlur: () => setSelectFocused(false),
        ...selectableCheckboxProps,
      },
      elementType: 'input',
    });
  }, [checkbox, disabled, floatingAction, selected, selectable, onChangeHandler, referenceId, referenceLabel]);

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
    if (!selectable) {
      return null;
    }

    return {
      onClick: mergeCallbacks(onClick, onChangeHandler),
      onKeyDown: mergeCallbacks(onKeyDown, onKeyDownHandler),
    };
  }, [selectable, onChangeHandler, onClick, onKeyDown, onKeyDownHandler]);

  return {
    selected,
    selectable,
    selectFocused,
    selectableCardProps,
    checkboxSlot,
    floatingActionSlot,
  };
};
