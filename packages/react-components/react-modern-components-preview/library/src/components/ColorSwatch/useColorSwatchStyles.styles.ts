import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSwatchSlots, ColorSwatchState } from './ColorSwatch.types';
import styles from './ColorSwatch.module.css';

export const colorSwatchClassNames: SlotClassNames<ColorSwatchSlots> = {
  root: 'fui-ColorSwatch',
  icon: 'fui-ColorSwatch__icon',
  disabledIcon: 'fui-ColorSwatch__disabledIcon',
};

export const useColorSwatchStyles = (state: ColorSwatchState): ColorSwatchState => {
  state.root.className = clsx(colorSwatchClassNames.root, styles.root, state.root.className);
  if (state.icon) {
    state.icon.className = clsx(colorSwatchClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.disabledIcon) {
    state.disabledIcon.className = clsx(
      colorSwatchClassNames.disabledIcon,
      styles.icon,
      styles.disabledIcon,
      state.disabledIcon.className,
    );
  }
  return state;
};
