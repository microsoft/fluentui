import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';

import type { CardOnSelectEvent, CardProps, CardRefElement } from './Card.types';

export const useCardSelectable = (props: CardProps, cardRef: React.RefObject<CardRefElement>) => {
  const { select, selected, defaultSelected, onCardSelect } = props;

  const { findAllFocusable } = useFocusFinders();
  const selectableRef = React.useRef<HTMLDivElement>(null);

  const isSelectable = [selected, defaultSelected, onCardSelect, select].some(bool => typeof bool !== 'undefined');
  const hasSelectSlot = Boolean(select);

  const [isCardSelected, setIsCardSelected] = React.useState(() => Boolean(selected ?? defaultSelected));

  const shouldRestrictTriggerAction = React.useCallback(
    (event: CardOnSelectEvent) => {
      if (cardRef.current && selectableRef.current) {
        const focusableElements = findAllFocusable(cardRef.current, Boolean);
        const target = event.target as HTMLElement;
        const isTargetInFocusableGroup = focusableElements.some(element => element.contains(target));
        const isTargetInSelectableSlot = selectableRef.current.contains(target);

        return isTargetInFocusableGroup && !isTargetInSelectableSlot;
      }

      return false;
    },
    [cardRef, findAllFocusable],
  );
  const onChangeHandler = React.useCallback(
    (event: CardOnSelectEvent) => {
      if (shouldRestrictTriggerAction(event)) {
        return;
      }

      const newCheckedValue = !isCardSelected;

      setIsCardSelected(newCheckedValue);

      if (onCardSelect) {
        onCardSelect(event, {
          selected: newCheckedValue,
        });
      }
    },
    [onCardSelect, isCardSelected, shouldRestrictTriggerAction],
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
      return resolveShorthand(select, {
        defaultProps: {
          ref: selectableRef,
        },
      });
    }

    return getNativeElementProps('div', {
      ref: selectableRef,
      role: 'checkbox',
      'aria-checked': isCardSelected,
      tabIndex: -1,
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
