import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwitchSlots, SwitchState } from './Switch.types';
import styles from './Switch.module.css';

export const switchClassNames: SlotClassNames<SwitchSlots> = {
  root: 'fui-Switch',
  indicator: 'fui-Switch__indicator',
  input: 'fui-Switch__input',
  label: 'fui-Switch__label',
};

/**
 * @deprecated Use `switchClassNames.root` instead.
 */
export const switchClassName = switchClassNames.root;

/**
 * Apply styling to the Switch slots based on the state.
 */
export const useSwitchStyles = (state: SwitchState): SwitchState => {
  state.root.className = clsx(switchClassNames.root, styles.root, state.root.className);
  state.indicator.className = clsx(switchClassNames.indicator, styles.indicator, state.indicator.className);
  state.input.className = clsx(switchClassNames.input, styles.input, state.input.className);

  if (state.label) {
    state.label.className = clsx(switchClassNames.label, styles.label, state.label.className);
  }

  return state;
};
