import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';

import type { CardContextValue, CardOnSelectionChangeEvent, CardProps, CardSlots } from './Card.types';

export const useCardSelectable = (
  props: CardProps,
  a11yProps: Pick<CardContextValue['selectableA11yProps'], 'referenceId' | 'referenceLabel'>,
  cardRef: React.RefObject<HTMLDivElement>,
) => {
  const { checkbox = {}, selected, defaultSelected, onSelectionChange, floatingAction } = props;
  const { referenceLabel, referenceId } = a11yProps;

  const { findAllFocusable } = useFocusFinders();

  const checkboxRef = React.useRef<HTMLInputElement>(null);
  const selectableRef = React.useRef<HTMLDivElement>(null);

  const isSelectable = [selected, defaultSelected, onSelectionChange].some(bool => typeof bool !== 'undefined');

  const hasFloatingActionSlot = Boolean(floatingAction);

  const [isCardSelected, setIsCardSelected] = React.useState(false);
  const [isSelectFocused, setIsSelectFocused] = React.useState(false);

  const shouldRestrictTriggerAction = React.useCallback(
    (event: CardOnSelectionChangeEvent) => {
      if (!cardRef.current) {
        return false;
      }

      const focusableElements = findAllFocusable(cardRef.current);
      const target = event.target as HTMLElement;
      const isTargetInFocusableGroup = focusableElements.some(element => element.contains(target));
      const isTargetInCheckboxSlot = checkboxRef?.current === target;
      const isTargetInSelectSlot = selectableRef?.current?.contains(target);

      return isTargetInFocusableGroup && !isTargetInCheckboxSlot && !isTargetInSelectSlot;
    },
    [cardRef, findAllFocusable, selectableRef],
  );

  const onChangeHandler = React.useCallback(
    (event: CardOnSelectionChangeEvent) => {
      if (shouldRestrictTriggerAction(event)) {
        return;
      }

      const newCheckedValue = !isCardSelected;

      setIsCardSelected(newCheckedValue);

      if (onSelectionChange) {
        onSelectionChange(event, {
          selected: newCheckedValue,
        });
      }
    },
    [onSelectionChange, isCardSelected, shouldRestrictTriggerAction],
  );

  const onKeyDownHandler = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if ([Enter, Space].includes(event.key)) {
        event.preventDefault();
        onChangeHandler(event);
      }
    },
    [onChangeHandler],
  );

  const checkboxSlot = React.useMemo(() => {
    if (!isSelectable || hasFloatingActionSlot) {
      return;
    }

    const selectableCheckboxProps: CardSlots['checkbox'] = {};

    if (referenceId) {
      selectableCheckboxProps['aria-describedby'] = referenceId;
    } else if (referenceLabel) {
      selectableCheckboxProps['aria-label'] = referenceLabel;
    }

    return resolveShorthand(checkbox, {
      defaultProps: {
        ref: checkboxRef,
        type: 'checkbox',
        checked: isCardSelected,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(event),
        onFocus: () => setIsSelectFocused(true),
        onBlur: () => setIsSelectFocused(false),
        ...selectableCheckboxProps,
      },
    });
  }, [isSelectable, hasFloatingActionSlot, checkbox, isCardSelected, referenceId, referenceLabel, onChangeHandler]);

  const selectableCardProps = React.useMemo(() => {
    if (!isSelectable) {
      return null;
    }

    return {
      onClick: onChangeHandler,
      onKeyDown: onKeyDownHandler,
    };
  }, [isSelectable, onChangeHandler, onKeyDownHandler]);

  React.useEffect(() => setIsCardSelected(Boolean(defaultSelected ?? selected)), [
    defaultSelected,
    selected,
    setIsCardSelected,
  ]);

  return {
    selected: isCardSelected,
    selectable: isSelectable,
    selectFocused: isSelectFocused,
    selectableCardProps,
    selectableRef,
    checkboxSlot,
  };
};
