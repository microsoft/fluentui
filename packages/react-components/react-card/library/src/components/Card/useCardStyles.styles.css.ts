'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './Card.module.css';
import type { CardSlots, CardState } from './Card.types';

export const cardClassNames: SlotClassNames<CardSlots> = {
  root: 'fui-Card',
  floatingAction: 'fui-Card__floatingAction',
  checkbox: 'fui-Card__checkbox',
};

export const cardCSSVars = {
  cardSizeVar: '--fui-Card--size',
  cardBorderRadiusVar: '--fui-Card--border-radius',
};

export const useCardStyles_unstable = (state: CardState): CardState => {
  const isSelectableOrInteractive = !state.disabled && (state.interactive || state.selectable);

  // CSS class names match prop values exactly:
  // orientation → styles.horizontal / styles.vertical (styles[state.orientation])
  // size        → styles.small / styles.medium / styles.large (styles[state.size])
  // appearance  → styles.filled / styles['filled-alternative'] / styles.outline / styles.subtle
  // Interactive × selected combinations are compound selectors in CSS — no lookup maps needed.
  const focusedClassName = React.useMemo(() => {
    if (state.disabled) {
      return '';
    }
    if (state.selectable) {
      return state.selectFocused ? styles.selectableFocused : '';
    }
    return styles.focused;
  }, [state.disabled, state.selectFocused, state.selectable]);

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    cardClassNames.root,
    styles.root,
    styles[state.orientation as keyof typeof styles] as string | undefined,
    styles[state.size as keyof typeof styles] as string | undefined,
    styles[state.appearance as keyof typeof styles] as string | undefined,
    isSelectableOrInteractive && styles.interactive,
    state.selected && styles.selected,
    focusedClassName,
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.floatingAction) {
    // eslint-disable-next-line react-hooks/immutability
    state.floatingAction.className = clsx(
      cardClassNames.floatingAction,
      styles.floatingAction,
      state.floatingAction.className,
    );
  }

  if (state.checkbox) {
    // eslint-disable-next-line react-hooks/immutability
    state.checkbox.className = clsx(cardClassNames.checkbox, styles.hiddenCheckbox, state.checkbox.className);
  }

  return state;
};
