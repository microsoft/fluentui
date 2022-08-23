import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';

import type { CardOnSelectEvent, CardProps } from './Card.types';

export const useCardSelectable = ({ select, selected, defaultSelected, onCardSelect }: CardProps) => {
  const isSelectable = Boolean(selected || defaultSelected || onCardSelect);
  const hasSelectSlot = Boolean(select);

  const [isCardSelected, setIsCardSelected] = React.useState(() => Boolean(selected ?? defaultSelected));
  const onChangeHandler = React.useCallback(
    (event: CardOnSelectEvent) => {
      if (!onCardSelect) {
        return;
      }

      const newCheckedValue = !isCardSelected;

      setIsCardSelected(newCheckedValue);
      onCardSelect(event, newCheckedValue);
    },
    [onCardSelect, isCardSelected],
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
      tabIndex: 0,
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
