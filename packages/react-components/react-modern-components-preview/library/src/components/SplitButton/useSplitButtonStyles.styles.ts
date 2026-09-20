import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitButtonSlots, SplitButtonState } from './SplitButton.types';
import styles from './SplitButton.module.css';

export const splitButtonClassNames: SlotClassNames<SplitButtonSlots> = {
  root: 'fui-SplitButton',
  menuButton: 'fui-SplitButton__menuButton',
  primaryActionButton: 'fui-SplitButton__primaryActionButton',
};

export const useSplitButtonStyles = (state: SplitButtonState): SplitButtonState => {
  state.root.className = clsx(splitButtonClassNames.root, styles.root, state.root.className);

  if (state.menuButton) {
    state.menuButton.className = clsx(splitButtonClassNames.menuButton, styles.menuButton, state.menuButton.className);
  }

  if (state.primaryActionButton) {
    state.primaryActionButton.className = clsx(
      splitButtonClassNames.primaryActionButton,
      styles.primaryActionButton,
      state.primaryActionButton.className,
    );
  }

  return state;
};
