import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { resolveShorthand, getNativeElementProps } from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';

import type { CardOnSelectionChangeEvent, CardProps } from './Card.types';

export const useCardSelectable = (props: CardProps, cardRef: React.RefObject<HTMLDivElement>) => {
  const { select, selected, defaultSelected, onSelectionChange } = props;

  const { findAllFocusable } = useFocusFinders();
  const selectableRef = React.useRef<HTMLDivElement>(null);

  const isSelectable = [selected, defaultSelected, onSelectionChange, select].some(bool => typeof bool !== 'undefined');
  const hasSelectSlot = Boolean(select);

  const [isCardSelected, setIsCardSelected] = React.useState(false);
  const [isSelectFocused, setIsSelectFocused] = React.useState(false);
  const selectableTag: 'input' | 'div' = hasSelectSlot ? 'div' : 'input';

  const shouldRestrictTriggerAction = React.useCallback(
    (event: CardOnSelectionChangeEvent) => {
      if (!cardRef.current) {
        return false;
      }

      const focusableElements = findAllFocusable(cardRef.current);
      const target = event.target as HTMLElement;
      const isTargetInFocusableGroup = focusableElements.some(element => element.contains(target));
      const isTargetInSelectableSlot = selectableRef?.current?.contains(target);

      return isTargetInFocusableGroup && !isTargetInSelectableSlot;
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
    if (!hasSelectSlot) {
      return getNativeElementProps<React.InputHTMLAttributes<HTMLInputElement>>('input', {
        ...props.selectableProps,
        ref: selectableRef,
        type: 'checkbox',
        checked: isCardSelected,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(event),
        onFocus: () => setIsSelectFocused(true),
        onBlur: () => setIsSelectFocused(false),
      });
    }

    return resolveShorthand(select, {
      defaultProps: {
        ref: selectableRef,
      },
    });
  }, [hasSelectSlot, isCardSelected, onChangeHandler, props.selectableProps, select]);

  React.useEffect(() => setIsCardSelected(Boolean(defaultSelected ?? selected)), [
    defaultSelected,
    selected,
    setIsCardSelected,
  ]);

  return {
    selected: isCardSelected,
    selectable: isSelectable,
    selectFocused: isSelectFocused,
    selectableTag,
    hasSelectSlot,
    selectableProps,
    selectableSlot,
  };
};
