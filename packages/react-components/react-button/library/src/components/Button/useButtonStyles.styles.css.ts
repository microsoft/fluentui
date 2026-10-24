import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as styles from './Button.module.css';
import type { ButtonSlots, ButtonState } from './Button.types';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

export const useButtonStyles_unstable = (state: ButtonState): ButtonState => {
  const { appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size } = state;

  state.root.className = clsx(
    buttonClassNames.root,
    styles.root,
    styles[appearance],
    styles[size],
    styles[shape],
    icon && styles.withIcon,
    (disabled || disabledFocusable) && styles.disabled,
    iconOnly && styles.iconOnly,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(
      buttonClassNames.icon,
      styles.icon,
      !!state.root.children && styles[iconPosition],
      state.icon.className,
    );
  }

  return state;
};
