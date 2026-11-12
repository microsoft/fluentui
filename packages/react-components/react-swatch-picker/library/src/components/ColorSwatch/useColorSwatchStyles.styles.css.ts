import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';
import styles from './ColorSwatch.module.css';

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
  icon: 'fui-ColorSwatch__icon',
  disabledIcon: 'fui-ColorSwatch__disabledIcon',
};

export const useColorSwatchStyles_unstable = (state: ColorSwatchState): ColorSwatchState => {
  state.root.className = clsx(
    colorSwatchClassNames.root,
    styles.root,
    styles[state.size ?? 'medium'],
    styles[state.shape ?? 'square'],
    state.selected && styles.selected,
    state.disabled && styles.disabled,
    state.root.className,
  );
  if (state.disabled && state.disabledIcon) {
    state.disabledIcon.className = clsx(styles.icon, styles.disabledIcon, state.disabledIcon.className);
  }
  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }
  return state;
};
