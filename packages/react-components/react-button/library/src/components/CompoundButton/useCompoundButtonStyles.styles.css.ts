'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles.css';
import type { CompoundButtonSlots, CompoundButtonState } from './CompoundButton.types';
import styles from './CompoundButton.module.css';

export const compoundButtonClassNames: SlotClassNames<CompoundButtonSlots> = {
  root: 'fui-CompoundButton',
  icon: 'fui-CompoundButton__icon',
  contentContainer: 'fui-CompoundButton__contentContainer',
  secondaryContent: 'fui-CompoundButton__secondaryContent',
};

export const useCompoundButtonStyles_unstable = (state: CompoundButtonState): CompoundButtonState => {
  const { appearance, disabled, disabledFocusable, iconOnly, iconPosition, size } = state;

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    compoundButtonClassNames.root,
    styles.root,
    styles[appearance],
    styles[size],
    (disabled || disabledFocusable) && styles.disabled,
    iconOnly && styles.iconOnly,
    state.root.className,
  );
  // eslint-disable-next-line react-hooks/immutability
  state.contentContainer.className = clsx(
    compoundButtonClassNames.contentContainer,
    styles.contentContainer,
    state.contentContainer.className,
  );
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(
      compoundButtonClassNames.icon,
      styles.icon,
      state.root.children !== undefined && state.root.children !== null && styles[iconPosition],
      state.icon.className,
    );
  }
  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(
      compoundButtonClassNames.secondaryContent,
      styles.secondaryContent,
      state.secondaryContent.className,
    );
  }

  useButtonStyles_unstable(state);
  return state;
};
