import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';

import type { CardOnSelectEvent, CardProps, CardRefElement } from './Card.types';
import { cardClassNames } from './useCardStyles';

function isTargetInSelectSlot(target: HTMLElement): boolean {
  let parent = target.parentElement;

  while (parent) {
    if (parent.classList.contains(cardClassNames.select)) {
      return true;
    }

    if (parent.classList.contains(cardClassNames.root)) {
      return false;
    }

    parent = parent.parentElement;
  }

  return false;
}

function isTargetInFocusableGroup(focusableElements: HTMLElement[], target: HTMLElement): boolean {
  return focusableElements.some(element => element.contains(target));
}

export const useCardSelectable = (props: CardProps, cardRef: React.RefObject<CardRefElement>) => {
  const { select, selected, defaultSelected, onCardSelect } = props;
  const isSelectable = Boolean(selected || defaultSelected || onCardSelect);
  const hasSelectSlot = Boolean(select);
  const { findAllFocusable } = useFocusFinders();

  const [isCardSelected, setIsCardSelected] = React.useState(() => Boolean(selected ?? defaultSelected));
  const onChangeHandler = React.useCallback(
    (event: CardOnSelectEvent) => {
      if (!onCardSelect) {
        return;
      }

      if (cardRef.current) {
        const focusableElements = findAllFocusable(cardRef.current, Boolean);
        const target = event.target as HTMLElement;

        if (isTargetInFocusableGroup(focusableElements, target) && !isTargetInSelectSlot(target)) {
          return;
        }
      }

      const newCheckedValue = !isCardSelected;

      setIsCardSelected(newCheckedValue);
      onCardSelect(event, newCheckedValue);
    },
    [onCardSelect, isCardSelected, findAllFocusable, cardRef],
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

  const selectableProps = React.useMemo(() => {
    if (!isSelectable) {
      return null;
    }

    return {
      onClick: onChangeHandler,
      onKeyDown: onKeyDownHandler,
    };
  }, [isSelectable, onChangeHandler, onKeyDownHandler]);

  const selectableSlot = React.useMemo(() => {
    if (hasSelectSlot) {
      return resolveShorthand(select);
    }

    return getNativeElementProps('div', {
      role: 'checkbox',
      'aria-checked': isCardSelected,
    });
  }, [hasSelectSlot, select, isCardSelected]);

  React.useEffect(() => setIsCardSelected(Boolean(selected)), [selected, setIsCardSelected]);

  return {
    isCardSelected,
    isSelectable,
    hasSelectSlot,
    selectableProps,
    selectableSlot,
  };
};
