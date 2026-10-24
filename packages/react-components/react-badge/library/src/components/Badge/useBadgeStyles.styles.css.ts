import * as React from 'react';
import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as styles from './Badge.module.css';
import type { BadgeSlots, BadgeState } from './Badge.types';

export const badgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-Badge',
  icon: 'fui-Badge__icon',
};

export const useBadgeStyles_unstable = (state: BadgeState): BadgeState => {
  // CSS class names match prop values exactly — styles[propValue] replaces all lookup maps.
  // Ghost ::after, outline border-color, rounded radius for small/tiny, font-size for small/tiny,
  // icon sizes, and extra-large icon margins are all handled by CSS (compound selectors + descendants).

  state.root.className = clsx(
    badgeClassNames.root,
    styles.root,
    // size: 'medium' is the .root default; all others match CSS class names including 'extra-small'/'extra-large'
    state.size !== 'medium' && (styles[state.size as keyof typeof styles] as string | undefined),
    // shape: 'circular' is the .root default
    state.shape !== 'circular' && (styles[state.shape as keyof typeof styles] as string | undefined),
    // appearance × color: CSS class `.filled-brand`, `.ghost-danger`, etc. match `${appearance}-${color}`
    styles[`${state.appearance}-${state.color}` as keyof typeof styles] as string | undefined,
    state.root.className,
  );

  if (state.icon) {
    let iconPositionClass: string | undefined;
    if (React.Children.toArray(state.root.children).length > 0) {
      iconPositionClass = state.iconPosition === 'after' ? styles.iconAfterText : styles.iconBeforeText;
    }

    state.icon.className = clsx(badgeClassNames.icon, styles.icon, iconPositionClass, state.icon.className);
  }

  return state;
};
